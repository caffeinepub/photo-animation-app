import { useState } from 'react';
import { Zap, Crown, ChevronRight, Sparkles } from 'lucide-react';
import TextToVideoScreen from './components/TextToVideoScreen';
import ImageToVideoScreen from './components/ImageToVideoScreen';
import VideoResultScreen from './components/VideoResultScreen';
import UpgradeModal from './components/UpgradeModal';
import CreditDisplay from './components/CreditDisplay';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCreditStatus } from './hooks/useQueries';

export interface VideoResult {
  style: string;
  duration: number;
  quality: string;
  music: boolean;
  sourceType: 'text' | 'image';
  prompt?: string;
  sourceImage?: string;
}

type TabType = 'text' | 'image';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('text');
  const [videoResult, setVideoResult] = useState<VideoResult | null>(null);
  const [resultSourceTab, setResultSourceTab] = useState<TabType>('text');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: creditStatus } = useGetCreditStatus();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleTextResult = (result: VideoResult) => {
    setResultSourceTab('text');
    setVideoResult(result);
  };

  const handleImageResult = (result: VideoResult) => {
    setResultSourceTab('image');
    setVideoResult(result);
  };

  const handleBack = () => {
    setVideoResult(null);
    setActiveTab(resultSourceTab);
  };

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'oklch(0.08 0.01 270)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: 'oklch(0.09 0.012 270)', borderColor: 'oklch(0.18 0.02 270)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/assets/generated/app-logo.dim_64x64.png"
              alt="PixGen Logo"
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-display font-bold text-lg gradient-text">PixGen</span>
          </div>

          {/* Center Tabs */}
          {!videoResult && (
            <nav className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'oklch(0.12 0.015 270)' }}>
              <button
                onClick={() => setActiveTab('text')}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'text'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                style={activeTab === 'text' ? { background: 'oklch(0.18 0.025 270)' } : {}}
              >
                {activeTab === 'text' && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 gradient-bg rounded-full" />
                )}
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Text to Video
                </span>
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'image'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                style={activeTab === 'image' ? { background: 'oklch(0.18 0.025 270)' } : {}}
              >
                {activeTab === 'image' && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 gradient-bg rounded-full" />
                )}
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Image to Video
                </span>
              </button>
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isAuthenticated && (
              <CreditDisplay onUpgradeClick={() => setShowUpgradeModal(true)} />
            )}

            {isAuthenticated ? (
              <button
                onClick={handleAuth}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 text-gray-300 hover:text-white"
                style={{ background: 'oklch(0.16 0.02 270)', border: '1px solid oklch(0.22 0.02 270)' }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleAuth}
                disabled={isLoggingIn}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 gradient-bg hover:opacity-90 disabled:opacity-50"
              >
                {isLoggingIn ? 'Connecting...' : 'Login'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {!isAuthenticated ? (
          <LandingHero onLogin={handleAuth} isLoggingIn={isLoggingIn} />
        ) : videoResult ? (
          <VideoResultScreen result={videoResult} onBack={handleBack} />
        ) : activeTab === 'text' ? (
          <TextToVideoScreen
            onResult={handleTextResult}
            onUpgradeClick={() => setShowUpgradeModal(true)}
          />
        ) : (
          <ImageToVideoScreen
            onResult={handleImageResult}
            onUpgradeClick={() => setShowUpgradeModal(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t text-center" style={{ borderColor: 'oklch(0.18 0.02 270)' }}>
        <p className="text-sm" style={{ color: 'oklch(0.45 0.02 270)' }}>
          © {new Date().getFullYear()} PixGen. Built with{' '}
          <span className="text-red-400">♥</span>{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'pixgen-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-text font-medium hover:opacity-80 transition-opacity"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      <Toaster theme="dark" />
    </div>
  );
}

function LandingHero({ onLogin, isLoggingIn }: { onLogin: () => void; isLoggingIn: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      {/* Hero banner */}
      <div className="w-full max-w-4xl mb-12 rounded-2xl overflow-hidden relative">
        <img
          src="/assets/generated/hero-dark-banner.dim_1440x480.png"
          alt="PixGen Hero"
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{ background: 'oklch(0.16 0.04 290)', border: '1px solid oklch(0.30 0.08 290)', color: 'oklch(0.80 0.15 290)' }}>
          <Sparkles className="w-3 h-3" />
          AI-Powered Video Generation
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold mb-4 leading-tight">
          Turn Ideas into{' '}
          <span className="gradient-text">Stunning Videos</span>
        </h1>

        <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'oklch(0.60 0.02 270)' }}>
          Generate cinematic videos from text prompts or images using advanced AI. No experience needed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onLogin}
            disabled={isLoggingIn}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white gradient-bg hover:opacity-90 transition-all duration-200 glow-primary disabled:opacity-50"
          >
            {isLoggingIn ? 'Connecting...' : 'Get Started Free'}
            {!isLoggingIn && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-sm" style={{ color: 'oklch(0.50 0.02 270)' }}>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            5 Free Credits
          </span>
          <span className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-purple-400" />
            Pro Upgrade Available
          </span>
        </div>
      </div>
    </div>
  );
}
