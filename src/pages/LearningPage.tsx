import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CodeEditor } from '../components/CodeEditor';
import { CodeHighlighter } from '../components/CodeHighlighter';
import { CodePreview } from '../components/CodePreview';
import { HintBox } from '../components/HintBox';
import { MissionCompleteModal } from '../components/MissionCompleteModal';
import { PixelBadge } from '../components/PixelBadge';
import { PixelButton } from '../components/PixelButton';
import { PixelCard } from '../components/PixelCard';
import { PixelCharacter } from '../components/PixelCharacter';
import {
  PixelCheckIcon,
  PixelLockIcon,
  PixelStarIcon,
} from '../components/PixelIcons';
import { PixelProgressBar } from '../components/PixelProgressBar';
import { formatSpeedrunTime } from '../services/supabaseAuth';
import type { WorldId } from '../types/lesson';
import type { CompletionReward, PlayerProgress } from '../types/progress';
import { validateLessonCode, type ValidationResult } from '../utils/codeValidator';
import {
  getLevelStatus,
  getWorldLessons,
  makeLevelKey,
} from '../utils/progressManager';
import { playSfx } from '../utils/soundFx';

interface LearningPageProps {
  world: WorldId;
  progress: PlayerProgress;
  onCompleteLevel: (world: WorldId, levelId: number, timeTakenSeconds?: number) => CompletionReward;
  onSaveCode: (world: WorldId, levelId: number, code: string) => void;
  onSetLastPlayed: (world: WorldId, levelId: number) => void;
}

export function LearningPage({
  world,
  progress,
  onCompleteLevel,
  onSaveCode,
  onSetLastPlayed,
}: LearningPageProps) {
  const { levelId: levelIdParam } = useParams();
  const navigate = useNavigate();

  const lessons = getWorldLessons(world);
  const parsedId = Number(levelIdParam);
  const lesson = lessons.find((l) => l.id === parsedId);

  const levelKey = lesson ? makeLevelKey(world, lesson.id) : '';
  const initialCode = lesson
    ? progress.savedCode[levelKey] ?? lesson.starterCode
    : '';

  const [code, setCode] = useState(initialCode);
  const [renderedCode, setRenderedCode] = useState(initialCode);
  const [runCount, setRunCount] = useState(0);
  const [statusNote, setStatusNote] = useState<string>('');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [latestReward, setLatestReward] = useState<CompletionReward | null>(
    null
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Sync editor state and timer when switching levels or worlds
  useEffect(() => {
    if (!lesson) return;
    const key = makeLevelKey(world, lesson.id);
    const saved = progress.savedCode[key] ?? lesson.starterCode;
    setCode(saved);
    setRenderedCode(saved);
    setRunCount(0);
    setStatusNote('');
    setValidation(null);
    setModalOpen(false);
    setLatestReward(null);
    setElapsedSeconds(0);

    const timer = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);

    const status = getLevelStatus(progress, world, lesson.id);
    if (status !== 'locked') {
      onSetLastPlayed(world, lesson.id);
    }
    return () => window.clearInterval(timer);
    // Intentionally reset only on level/world route transitions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [world, parsedId]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <PixelCard tone="white" className="text-center">
          <h1 className="font-pixel text-base text-navy sm:text-lg">
            LEVEL TIDAK DITEMUKAN
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-navy">
            Stage yang kamu cari belum tersedia di {world.toUpperCase()} World.
            Silakan kembali ke peta dunia untuk memilih level yang tersedia.
          </p>
          <div className="mt-5 flex justify-center">
            <PixelButton to={`/world/${world}`} variant="primary" size="md">
              KEMBALI KE PETA {world.toUpperCase()}
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    );
  }

  const levelStatus = getLevelStatus(progress, world, lesson.id);

  if (levelStatus === 'locked') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <PixelCard tone="soft" className="text-center">
          <div className="mx-auto mb-3 inline-flex border-[3px] border-navy bg-lavender p-3">
            <PixelLockIcon size={28} />
          </div>
          <h1 className="font-pixel text-base text-navy sm:text-lg">
            LEVEL {lesson.id} MASIH TERKUNCI
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-navy">
            Selesaikan <strong>Level {lesson.id - 1}</strong> di{' '}
            {world.toUpperCase()} World terlebih dahulu untuk membuka level ini.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <PixelButton
              to={`/learn/${world}/${lesson.id - 1}`}
              variant="primary"
              size="md"
            >
              BUKA LEVEL {lesson.id - 1}
            </PixelButton>
            <PixelButton to={`/world/${world}`} variant="secondary" size="md">
              LIHAT PETA DUNIA
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    );
  }

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode);
    onSaveCode(world, lesson.id, nextCode);
  };

  const handleRunCode = () => {
    playSfx('run', progress.soundEnabled);
    setRenderedCode(code);
    setRunCount((c) => c + 1);
    setStatusNote('Preview diperbarui');
  };

  const handleResetCode = () => {
    playSfx('click', progress.soundEnabled);
    setCode(lesson.starterCode);
    setRenderedCode(lesson.starterCode);
    onSaveCode(world, lesson.id, lesson.starterCode);
    setValidation(null);
    setStatusNote('Kode direset');
  };

  const handleCheckAnswer = () => {
    setRenderedCode(code);
    setRunCount((c) => c + 1);
    const result = validateLessonCode(lesson, code);
    setValidation(result);

    if (result.passed) {
      playSfx('victory', progress.soundEnabled);
      const timeTaken = Math.max(1, elapsedSeconds);
      const reward = onCompleteLevel(world, lesson.id, timeTaken);
      setLatestReward(reward);
      setModalOpen(true);
      setStatusNote('Misi selesai!');
    } else {
      playSfx('error', progress.soundEnabled);
      setStatusNote('Cek detail di bawah');
    }
  };

  const hasNextLevel = lesson.id < lessons.length;
  const totalXpPossible = lesson.xpChallenge + lesson.xpLevel;

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
      {/* Top Level Header Bar */}
      <div className="mb-5 border-[3px] border-navy bg-white p-4 shadow-pixel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <PixelButton
              to={`/world/${world}`}
              variant="secondary"
              size="sm"
              onClick={() => playSfx('click', progress.soundEnabled)}
            >
              &lt; PETA {world.toUpperCase()}
            </PixelButton>

            {levelStatus === 'completed' ? (
              <PixelBadge tone="mint">
                <PixelCheckIcon size={14} />
                <span>LEVEL SELESAI</span>
              </PixelBadge>
            ) : (
              <PixelBadge tone="pink">
                <PixelStarIcon size={14} />
                <span>+{totalXpPossible} XP REWARD</span>
              </PixelBadge>
            )}

            {/* Retro speedrun timer badge */}
            <div className="inline-flex items-center gap-1.5 border-2 border-navy bg-light-bg px-2.5 py-1 text-xs">
              <span className="font-pixel text-[10px] text-navy">⏱️ WAKTU:</span>
              <span className="font-mono font-bold text-navy">
                {formatSpeedrunTime(elapsedSeconds)}
              </span>
              {progress.levelTimes?.[levelKey] && (
                <span className="hidden font-mono text-[10px] text-navy/70 sm:inline">
                  (Terbaik: {formatSpeedrunTime(progress.levelTimes[levelKey])})
                </span>
              )}
            </div>
          </div>

          <div className="w-full sm:w-56">
            <PixelProgressBar
              value={lesson.id}
              max={lessons.length}
              label={`Level ${lesson.id} dari ${lessons.length}`}
              segments={6}
              fillTone={world === 'html' ? 'blue' : 'pink'}
            />
          </div>
        </div>

        <h1 className="mt-3 font-pixel text-sm leading-relaxed text-navy sm:text-lg">
          LEVEL {lesson.id}: {lesson.title}
        </h1>
      </div>

      {/* Keep lesson reading column first in DOM so mobile naturally stacks Materi -> Editor -> Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="space-y-5 lg:col-span-5">
          {/* Unified RPG dialogue panel with framed pixel platform stage for the NPC */}
          <section
            aria-label="Cerita misi"
            className="pixel-box overflow-hidden bg-white text-navy"
          >
            <div className="flex flex-col sm:flex-row">
              <div
                className={`relative flex shrink-0 flex-col items-center justify-end border-b-[3px] border-navy pt-3 sm:w-28 sm:border-b-0 sm:border-r-[3px] ${
                  world === 'html'
                    ? 'bg-gradient-to-b from-sky-blue to-lavender/70'
                    : 'bg-gradient-to-b from-pastel-pink/80 to-lavender/80'
                }`}
              >
                <div className="px-4">
                  <PixelCharacter
                    variant={lesson.npcVariant}
                    size={56}
                    interactive
                    label={`Klik ${lesson.npcName}`}
                    onInteract={() => playSfx('click', progress.soundEnabled)}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className={`mt-1 h-3.5 w-full border-t-2 border-navy ${
                    world === 'html' ? 'pixel-brick-row' : 'pixel-pink-brick-row'
                  }`}
                />
              </div>

              <div className="flex-1 p-4">
                <div className="mb-2 inline-block border-2 border-navy bg-lavender px-2.5 py-0.5 font-pixel text-[10px] text-navy">
                  {lesson.npcName}
                </div>
                <p className="text-sm leading-relaxed text-navy">
                  {lesson.story}
                </p>
              </div>
            </div>
          </section>

          {/* Materi */}
          <PixelCard tone="white">
            <h2 className="font-pixel text-xs text-navy sm:text-sm">MATERI</h2>
            <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-navy sm:text-[15px]">
              {lesson.material.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {lesson.materialPoints.length > 0 && (
              <ul className="mt-4 space-y-2 border-t-2 border-navy/15 pt-3">
                {lesson.materialPoints.map((pt, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col gap-1 border-2 border-navy/20 bg-light-bg px-3 py-2 text-sm"
                  >
                    <code className="font-mono text-xs font-bold text-navy">
                      {pt.code}
                    </code>
                    <span className="text-navy/95">{pt.explanation}</span>
                  </li>
                ))}
              </ul>
            )}
          </PixelCard>

          {/* Code Example & What Happens */}
          <PixelCard tone="soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-pixel text-xs text-navy sm:text-sm">
                CONTOH POLA KODE
              </h2>
              <span className="font-mono text-[11px] font-semibold text-navy/85">
                Baca pola, lalu ketik sendiri
              </span>
            </div>
            <div className="mt-3">
              <CodeHighlighter code={lesson.codeExample} language={world} />
            </div>

            <h3 className="mt-4 font-pixel text-[11px] text-navy">
              APA YANG TERJADI?
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-navy">
              {lesson.whatHappens}
            </p>
          </PixelCard>
        </div>

        {/* Interactive mission, editor, and preview workspace */}
        <div className="space-y-5 lg:col-span-7">
          {/* Your Mission */}
          <PixelCard tone="sky">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-pixel text-xs text-navy sm:text-sm">
                MISI KAMU
              </h2>
              <span className="font-mono text-xs font-bold text-navy">
                Challenge +{lesson.xpChallenge} XP | Level +{lesson.xpLevel} XP
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold leading-relaxed text-navy sm:text-base">
              {lesson.mission}
            </p>
          </PixelCard>

          {/* Live Coding Editor */}
          <CodeEditor
            world={world}
            code={code}
            onChange={handleCodeChange}
            onRun={handleRunCode}
            onReset={handleResetCode}
            onCheck={handleCheckAnswer}
            statusNote={statusNote}
          />

          {/* Friendly Validation Feedback */}
          {validation && (
            <div
              role="status"
              aria-live="polite"
              className={`border-[3px] border-navy p-4 shadow-pixel ${
                validation.passed
                  ? 'bg-mint-pass text-mint-ink'
                  : 'bg-rose-warn text-rose-ink'
              }`}
            >
              <div className="flex items-center gap-2">
                {validation.passed ? (
                  <PixelCheckIcon size={18} />
                ) : (
                  <PixelStarIcon size={18} filled={false} />
                )}
                <p className="font-pixel text-xs">{validation.headline}</p>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-medium">
                {validation.details.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
              {!validation.passed && (
                <p className="mt-2 text-xs font-semibold">
                  Coba periksa kembali kode kamu, atau klik tombol HINT di bawah.
                </p>
              )}
            </div>
          )}

          {/* Sandboxed Code Preview */}
          <CodePreview
            world={world}
            renderedCode={renderedCode}
            baseHtml={lesson.baseHtml}
            runCount={runCount}
          />

          {/* Progressive Hint System */}
          <HintBox key={levelKey} hints={lesson.hints} />

          {/* Level Footer Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {lesson.id > 1 ? (
              <PixelButton
                to={`/learn/${world}/${lesson.id - 1}`}
                variant="secondary"
                size="sm"
                onClick={() => playSfx('click', progress.soundEnabled)}
              >
                &lt; LEVEL {lesson.id - 1}
              </PixelButton>
            ) : (
              <span />
            )}

            {hasNextLevel &&
              getLevelStatus(progress, world, lesson.id + 1) !== 'locked' && (
                <PixelButton
                  to={`/learn/${world}/${lesson.id + 1}`}
                  variant="primary"
                  size="sm"
                  onClick={() => playSfx('click', progress.soundEnabled)}
                >
                  LEVEL {lesson.id + 1} &gt;
                </PixelButton>
              )}
          </div>
        </div>
      </div>

      <MissionCompleteModal
        isOpen={modalOpen}
        world={world}
        levelId={lesson.id}
        levelTitle={lesson.title}
        hasNextLevel={hasNextLevel}
        reward={latestReward}
        onClose={() => setModalOpen(false)}
        onNextLevel={() => {
          setModalOpen(false);
          navigate(`/learn/${world}/${lesson.id + 1}`);
        }}
      />
    </div>
  );
}

