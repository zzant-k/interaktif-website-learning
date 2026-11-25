import { LeaderboardSection } from '../components/LeaderboardSection';
import type { StudentUser } from '../services/supabaseAuth';
import type { PlayerProgress } from '../types/progress';

interface LeaderboardPageProps {
  progress: PlayerProgress;
  currentUser: StudentUser | null;
}

export function LeaderboardPage({
  progress,
  currentUser,
}: LeaderboardPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <LeaderboardSection
        currentUser={currentUser}
        soundEnabled={progress.soundEnabled}
      />
    </div>
  );
}

