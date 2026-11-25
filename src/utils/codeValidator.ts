import type { Lesson, ValidationCheck } from '../types/lesson';

export interface ValidationResult {
  passed: boolean;
  headline: string;
  details: string[];
}

function stripHtmlComments(code: string): string {
  return code.replace(/<!--[\s\S]*?-->/g, '');
}

function stripCssComments(code: string): string {
  return code.replace(/\/\*[\s\S]*?\*\//g, '');
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function checkHtmlRule(
  rawCode: string,
  doc: Document,
  rule: Extract<ValidationCheck, { type: 'html-tag' }>
): string | null {
  const cleanCode = stripHtmlComments(rawCode);
  const tagLower = rule.tag.toLowerCase();

  // Structural tags like html/head/body are synthesized by DOMParser even when absent,
  // so verify explicit source presence for those document-level tags.
  if (tagLower === 'html' || tagLower === 'head' || tagLower === 'body') {
    const openRegex = new RegExp(`<${tagLower}(\\s|>)`, 'i');
    const closeRegex = new RegExp(`</${tagLower}>`, 'i');
    if (!openRegex.test(cleanCode) || !closeRegex.test(cleanCode)) {
      return rule.failureMessage;
    }
  }

  const elements = Array.from(doc.querySelectorAll(tagLower));
  const minCount = rule.minCount ?? 1;
  if (elements.length < minCount) {
    return rule.failureMessage;
  }

  // Filter elements that satisfy all per-element constraints (text and attributes)
  const matchingElements = elements.filter((el) => {
    const text = normalizeWhitespace(el.textContent ?? '');
    if (rule.requireNonEmptyText && text.length === 0) {
      return false;
    }
    if (
      rule.textIncludes &&
      !text.toLowerCase().includes(rule.textIncludes.toLowerCase())
    ) {
      return false;
    }
    if (rule.requiredAttrs) {
      for (const attr of rule.requiredAttrs) {
        const val = (el.getAttribute(attr) ?? '').trim();
        if (!val) return false;
      }
    }
    if (rule.attrEquals) {
      for (const [attr, expected] of Object.entries(rule.attrEquals)) {
        const val = (el.getAttribute(attr) ?? '').trim().toLowerCase();
        if (val !== expected.toLowerCase()) return false;
      }
    }
    return true;
  });

  if (matchingElements.length < minCount) {
    return rule.failureMessage;
  }

  // Ensure standard paired tags have an explicit closing tag so broken unclosed syntax does not pass silently
  if (tagLower !== 'img' && tagLower !== 'br' && tagLower !== 'hr') {
    const closeTagPattern = new RegExp(`</\\s*${tagLower}\\s*>`, 'i');
    if (!closeTagPattern.test(cleanCode)) {
      return rule.failureMessage;
    }
  }

  return null;
}

function extractCssDeclarations(
  cleanCss: string,
  targetSelector: string
): Record<string, string> {
  const declarations: Record<string, string> = {};
  const blockRegex = /([^{}]+)\{([^{}]*)\}/g;
  const normalizedTarget = targetSelector.trim().toLowerCase();

  let match: RegExpExecArray | null;
  while ((match = blockRegex.exec(cleanCss)) !== null) {
    const selectors = match[1]
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (!selectors.includes(normalizedTarget)) {
      continue;
    }

    const body = match[2];
    const parts = body.split(';');
    for (const part of parts) {
      const colonIdx = part.indexOf(':');
      if (colonIdx === -1) continue;
      const prop = part.slice(0, colonIdx).trim().toLowerCase();
      const val = part.slice(colonIdx + 1).trim();
      if (prop && val) {
        declarations[prop] = val;
      }
    }
  }

  return declarations;
}

function checkCssRule(
  cleanCss: string,
  rule: Extract<ValidationCheck, { type: 'css-rule' }>
): string | null {
  const declarations = extractCssDeclarations(cleanCss, rule.selector);
  const propName = rule.property.toLowerCase();
  const actualValue =
    declarations[propName] ??
    (propName === 'background-color' ? declarations['background'] : undefined);

  if (!actualValue) {
    return rule.failureMessage;
  }

  const normalizedVal = actualValue
    .replace(/!important/i, '')
    .trim()
    .toLowerCase();

  if (rule.acceptedValues && rule.acceptedValues.length > 0) {
    const accepted = rule.acceptedValues.map((v) => v.toLowerCase());
    if (!accepted.includes(normalizedVal)) {
      return rule.failureMessage;
    }
  }

  if (rule.valuePattern) {
    const pattern = new RegExp(rule.valuePattern, 'i');
    if (!pattern.test(normalizedVal)) {
      return rule.failureMessage;
    }
  }

  return null;
}

export function validateLessonCode(
  lesson: Lesson,
  rawCode: string
): ValidationResult {
  const trimmed = rawCode.trim();
  if (!trimmed) {
    return {
      passed: false,
      headline: 'Belum berhasil!',
      details: ['Editor kode masih kosong. Coba tulis kode sesuai misi atau tekan HINT.'],
    };
  }

  const failures: string[] = [];

  if (lesson.world === 'html') {
    const cleanHtml = stripHtmlComments(rawCode);
    if (!cleanHtml.trim()) {
      return {
        passed: false,
        headline: 'Belum berhasil!',
        details: ['Kode hanya berisi komentar. Tulis tag HTML kamu di bawah komentar tersebut.'],
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHtml, 'text/html');

    for (const check of lesson.checks) {
      if (check.type === 'doctype') {
        if (!/<!doctype\s+html\s*>/i.test(cleanHtml)) {
          failures.push(check.failureMessage);
        }
      } else if (check.type === 'html-tag') {
        const failure = checkHtmlRule(rawCode, doc, check);
        if (failure) failures.push(failure);
      }
    }
  } else {
    const cleanCss = stripCssComments(rawCode);
    if (!cleanCss.trim()) {
      return {
        passed: false,
        headline: 'Belum berhasil!',
        details: ['Belum ada aturan CSS yang ditulis. Coba isi property di dalam selector.'],
      };
    }

    for (const check of lesson.checks) {
      if (check.type === 'css-rule') {
        const failure = checkCssRule(cleanCss, check);
        if (failure) failures.push(failure);
      }
    }
  }

  if (failures.length === 0) {
    return {
      passed: true,
      headline: 'MISSION COMPLETE!',
      details: [
        `Bagus! Kode kamu memenuhi semua syarat pada level "${lesson.title}".`,
      ],
    };
  }

  return {
    passed: false,
    headline: 'Belum berhasil!',
    details: failures,
  };
}
