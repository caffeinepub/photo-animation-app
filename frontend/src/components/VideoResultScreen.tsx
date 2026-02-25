import { Download, Share2, RotateCcw, Play, Film, Clock, Sparkles } from 'lucide-react';
import { VideoResult } from '../App';
import { toast } from 'sonner';

interface VideoResultScreenProps {
  result: VideoResult;
  onBack: () => void;
}

export default function VideoResultScreen({ result, onBack }: VideoResultScreenProps) {
  const handleDownload = () => {
    toast.success('Video downloaded successfully!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Generated Video',
        text: result.prompt || 'Check out this AI generated video!',
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in-up">
      {/* Title */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
          style={{
            background: 'oklch(0.16 0.04 290)',
            border: '1px solid oklch(0.30 0.08 290)',
            color: 'oklch(0.80 0.15 290)',
          }}
        >
          <Sparkles className="w-3 h-3" />
          Video Generated Successfully
        </div>
        <h1
          className="font-display text-2xl sm:text-3xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #e2c9ff 0%, #a78bfa 40%, #60a5fa 80%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 18px rgba(168,85,247,0.55)) drop-shadow(0 0 40px rgba(96,165,250,0.30))',
          }}
        >
          Your Video is Ready
        </h1>
      </div>

      {/* Cinematic Video Preview */}
      <div
        className="relative rounded-2xl overflow-hidden mb-6 animate-focusPulse"
        style={{
          aspectRatio: '16/9',
          border: '1px solid oklch(0.28 0.06 290)',
          boxShadow: '0 0 40px rgba(168,85,247,0.25), 0 0 80px rgba(59,130,246,0.12), 0 8px 32px rgba(0,0,0,0.7)',
        }}
      >
        {/* Deep black base */}
        <div className="absolute inset-0 bg-black" />

        {/* Source image for image-to-video (slightly visible underneath) */}
        {result.sourceImage && (
          <img
            src={result.sourceImage}
            alt="Source"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.22, filter: 'blur(2px) saturate(1.4)' }}
          />
        )}

        {/* Cinematic color grading layer */}
        <div
          className="absolute inset-0 animate-colorGrade"
          style={{
            background:
              'linear-gradient(160deg, rgba(0,40,60,0.72) 0%, rgba(10,10,30,0.55) 40%, rgba(40,20,10,0.50) 70%, rgba(60,30,0,0.45) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Secondary color grade — warm highlights */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(255,180,80,0.10) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,120,200,0.12) 0%, transparent 55%)',
            animation: 'colorGrade 6s ease-in-out infinite reverse',
          }}
        />

        {/* Film grain texture overlay */}
        <div
          className="absolute inset-0 animate-filmGrain pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
            opacity: 0.055,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Scan line horizontal bars */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Moving scan line */}
        <div
          className="absolute inset-x-0 pointer-events-none animate-scanLine"
          style={{
            height: '3px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(180,140,255,0.18) 20%, rgba(120,200,255,0.28) 50%, rgba(180,140,255,0.18) 80%, transparent 100%)',
            top: 0,
          }}
        />

        {/* Letterbox bars — top and bottom */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: '7%', background: 'rgba(0,0,0,0.82)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: '7%', background: 'rgba(0,0,0,0.82)' }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-glow"
            style={{
              background: 'rgba(168, 85, 247, 0.18)',
              border: '2px solid rgba(168, 85, 247, 0.55)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 30px rgba(168,85,247,0.35), inset 0 0 20px rgba(168,85,247,0.10)',
            }}
          >
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* HD / Quality badge — top right */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold tracking-widest z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.45), rgba(59,130,246,0.45))',
            border: '1px solid rgba(168,85,247,0.50)',
            color: 'white',
            backdropFilter: 'blur(8px)',
            letterSpacing: '0.12em',
          }}
        >
          {result.quality}
        </div>

        {/* Duration badge — bottom right */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-white z-10"
          style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
        >
          <Clock className="w-3 h-3" />
          {result.duration}s
        </div>

        {/* LIVE / AI badge — top left */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold z-10"
          style={{
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: 'rgba(200,180,255,0.90)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }}
          />
          AI RENDER
        </div>
      </div>

      {/* Metadata Card */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{ background: 'oklch(0.11 0.015 270)', border: '1px solid oklch(0.20 0.02 270)' }}
      >
        <div className="flex items-start gap-4">
          {result.sourceImage && (
            <img
              src={result.sourceImage}
              alt="Source"
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              style={{ border: '1px solid oklch(0.22 0.02 270)' }}
            />
          )}
          <div className="flex-1 min-w-0">
            {result.prompt && (
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">{result.prompt}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <MetaBadge icon={<Film className="w-3 h-3" />} label={result.style} />
              <MetaBadge icon={<Clock className="w-3 h-3" />} label={`${result.duration}s`} />
              <MetaBadge
                icon={
                  <span className="text-xs">
                    {result.sourceType === 'text' ? '✦' : '🖼'}
                  </span>
                }
                label={result.sourceType === 'text' ? 'Text to Video' : 'Image to Video'}
              />
              {result.music && (
                <MetaBadge icon={<span className="text-xs">♪</span>} label="Music" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 gradient-bg hover:opacity-90"
          style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.25)' }}
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:text-white"
          style={{
            background: 'oklch(0.14 0.02 270)',
            border: '1px solid oklch(0.25 0.03 270)',
            color: 'oklch(0.70 0.02 270)',
          }}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Create New Button */}
      <button
        onClick={onBack}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:text-white"
        style={{
          color: 'oklch(0.55 0.02 270)',
          border: '1px solid oklch(0.20 0.02 270)',
        }}
      >
        <RotateCcw className="w-4 h-4" />
        Create Another Video
      </button>
    </div>
  );
}

function MetaBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
      style={{
        background: 'oklch(0.16 0.02 270)',
        border: '1px solid oklch(0.22 0.02 270)',
        color: 'oklch(0.65 0.02 270)',
      }}
    >
      {icon}
      {label}
    </div>
  );
}
