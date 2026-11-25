export type WorldId = 'html' | 'css';

export type LevelStatus = 'locked' | 'available' | 'completed';

export type CharacterVariant = 'cyan' | 'pink' | 'runner';

export interface MaterialPoint {
  code: string;
  explanation: string;
}

export type ValidationCheck =
  | {
      type: 'doctype';
      failureMessage: string;
    }
  | {
      type: 'html-tag';
      tag: string;
      minCount?: number;
      textIncludes?: string;
      requireNonEmptyText?: boolean;
      requiredAttrs?: string[];
      attrEquals?: Record<string, string>;
      failureMessage: string;
    }
  | {
      type: 'css-rule';
      selector: string;
      property: string;
      acceptedValues?: string[];
      valuePattern?: string;
      failureMessage: string;
    };

export interface Lesson {
  id: number;
  world: WorldId;
  title: string;
  shortDescription: string;
  xpChallenge: number;
  xpLevel: number;
  npcName: string;
  npcVariant: CharacterVariant;
  story: string;
  material: string[];
  materialPoints: MaterialPoint[];
  codeExample: string;
  whatHappens: string;
  mission: string;
  starterCode: string;
  baseHtml?: string;
  hints: string[];
  solutionCode: string;
  solutionExplanation: string;
  checks: ValidationCheck[];
}

export interface WorldInfo {
  id: WorldId;
  name: string;
  subtitle: string;
  description: string;
  accentLabel: string;
}

