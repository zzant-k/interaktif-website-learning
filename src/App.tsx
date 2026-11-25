import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PixelButton } from './components/PixelButton';
import { PixelCard } from './components/PixelCard';
import { useProgress } from './hooks/useProgress';
import { HomePage } from './pages/HomePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { LearningPage } from './pages/LearningPage';
import { ProfilePage } from './pages/ProfilePage';
import { WorldMapPage } from './pages/WorldMapPage';
import { WorldPage } from './pages/WorldPage';

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <PixelCard tone="white" className="text-center">
        <h1 className="font-pixel text-base text-navy sm:text-lg">
          404: AREA TIDAK DITEMUKAN
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-navy">
          Jalur yang kamu tuju belum ada di peta Kota Pixel. Kembali ke beranda
          atau pilih dunia belajarmu.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <PixelButton to="/" variant="primary" size="md">
            KEMBALI KE BERANDA
          </PixelButton>
          <PixelButton to="/world" variant="secondary" size="md">
            PILIH DUNIA
          </PixelButton>
        </div>
      </PixelCard>
    </div>
  );
}

export default function App() {
  const {
    progress,
    isLoaded,
    storageError,
    currentUser,
    login,
    register,
    logout,
    syncNow,
    dismissStorageError,
    completeLevel,
    saveLessonCode,
    setLastPlayed,
    toggleSound,
    resetProgress,
    totalLevels,
    htmlCompleted,
    cssCompleted,
    totalCompleted,
    completionPercent,
  } = useProgress();

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-light-bg text-navy">
        <Navbar
          progress={progress}
          currentUser={currentUser}
          onToggleSound={toggleSound}
        />

        {storageError && (
          <div
            role="alert"
            className="border-b-[3px] border-navy bg-rose-warn px-4 py-2.5 text-rose-ink"
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="font-semibold">
                Penyimpanan browser bermasalah atau diblokir. Progress sesi ini
                mungkin tidak tersimpan setelah reload.
              </span>
              <button
                type="button"
                onClick={dismissStorageError}
                className="min-h-[44px] border-2 border-navy bg-white px-3 font-pixel text-[10px] text-navy"
              >
                TUTUP
              </button>
            </div>
          </div>
        )}

        <main className="flex-1">
          {!isLoaded ? (
            <div className="mx-auto max-w-3xl px-4 py-14 text-center">
              <p className="font-pixel text-xs text-navy">
                MEMUAT DUNIA CODE QUEST...
              </p>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    progress={progress}
                    totalLevels={totalLevels}
                    htmlCompleted={htmlCompleted}
                    cssCompleted={cssCompleted}
                    totalCompleted={totalCompleted}
                    completionPercent={completionPercent}
                    currentUser={currentUser}
                    onLogin={login}
                    onRegister={register}
                    onLogout={logout}
                    onSync={syncNow}
                  />
                }
              />
              <Route
                path="/world"
                element={
                  <WorldPage
                    progress={progress}
                    htmlCompleted={htmlCompleted}
                    cssCompleted={cssCompleted}
                  />
                }
              />
              <Route
                path="/world/html"
                element={<WorldMapPage world="html" progress={progress} />}
              />
              <Route
                path="/world/css"
                element={<WorldMapPage world="css" progress={progress} />}
              />
              <Route
                path="/learn/html/:levelId"
                element={
                  <LearningPage
                    world="html"
                    progress={progress}
                    onCompleteLevel={completeLevel}
                    onSaveCode={saveLessonCode}
                    onSetLastPlayed={setLastPlayed}
                  />
                }
              />
              <Route
                path="/learn/css/:levelId"
                element={
                  <LearningPage
                    world="css"
                    progress={progress}
                    onCompleteLevel={completeLevel}
                    onSaveCode={saveLessonCode}
                    onSetLastPlayed={setLastPlayed}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    progress={progress}
                    currentUser={currentUser}
                    totalLevels={totalLevels}
                    htmlCompleted={htmlCompleted}
                    cssCompleted={cssCompleted}
                    totalCompleted={totalCompleted}
                    completionPercent={completionPercent}
                    onResetProgress={resetProgress}
                    onSync={syncNow}
                    onLogout={logout}
                  />
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <LeaderboardPage
                    progress={progress}
                    currentUser={currentUser}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </main>

        <footer className="border-t-[3px] border-navy bg-navy px-4 py-4 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center text-xs sm:flex-row sm:text-left">
            <span className="font-pixel text-[10px] text-sky-blue">
              CODE QUEST
            </span>
            <span className="text-white/90">
              Belajar HTML dan CSS dasar dengan gaya game retro 2D.
            </span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

