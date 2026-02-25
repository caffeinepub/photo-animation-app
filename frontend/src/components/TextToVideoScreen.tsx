import { useState } from 'react';
import { Sparkles, Loader2, Wand2, ChevronDown } from 'lucide-react';
import StyleSelector from './StyleSelector';
import DurationSelector from './DurationSelector';
import QualitySelector from './QualitySelector';
import MusicSelector from './MusicSelector';
import { useConsumeCredit } from '../hooks/useQueries';
import { VideoResult } from '../App';

interface TextToVideoScreenProps {
  onResult: (result: VideoResult) => void;
  onUpgradeClick: () => void;
}

const ENHANCE_SUGGESTIONS = [
  'cinematic lighting, 4K quality, smooth motion',
  'dramatic atmosphere, professional grade, vivid colors',
  'epic scale, dynamic camera movement, stunning visuals',
];

export default function TextToVideoScreen({ onResult, onUpgradeClick }: TextToVideoScreenProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Cinematic');
  const [duration, setDuration] = useState(5);
  const [quality, setQuality] = useState('720p');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Upbeat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  const consumeCredit = useConsumeCredit();

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    await new Promise(r => setTimeout(r, 800));
    const suggestion = ENHANCE_SUGGESTIONS[Math.floor(Math.random() * ENHANCE_SUGGESTIONS.length)];
    setPrompt(prev => prev.trim() + ', ' + suggestion);
    setIsEnhancing(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      try {
        await consumeCredit.mutateAsync();
      } catch (creditError: any) {
        const msg = creditError?.message || '';
        if (msg.includes('No credits left')) {
          onUpgradeClick();
          setIsGenerating(false);
          return;
        }
        // Auth errors silently skipped
      }

      await new Promise(r => setTimeout(r, 2500));

      onResult({
        style,
        duration,
        quality,
        music: musicEnabled,
        sourceType: 'text',
        prompt,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in-up">
      {/* Hero text */}
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          Describe your video
        </h2>
        <p className="text-sm" style={{ color: 'oklch(0.55 0.02 270)' }}>
          Be as detailed as possible for the best results
        </p>
      </div>

      {/* Prompt Area */}
      <div
        className="relative rounded-2xl p-px mb-4"
        style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))' }}
      >
        <div className="rounded-2xl overflow-hidden" style={{ background: 'oklch(0.12 0.015 270)' }}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="A majestic eagle soaring over snow-capped mountains at golden hour, cinematic drone shot..."
            rows={5}
            className="w-full px-5 pt-5 pb-3 text-sm text-white placeholder-gray-500 bg-transparent resize-none outline-none leading-relaxed"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <span className="text-xs" style={{ color: 'oklch(0.40 0.02 270)' }}>
              {prompt.length} / 500
            </span>
            <button
              onClick={handleEnhancePrompt}
              disabled={!prompt.trim() || isEnhancing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-40"
              style={{
                background: 'oklch(0.18 0.04 290)',
                border: '1px solid oklch(0.28 0.08 290)',
                color: 'oklch(0.75 0.15 290)',
              }}
            >
              {isEnhancing ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Wand2 className="w-3 h-3" />
              )}
              Enhance Prompt
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <div
        className="rounded-2xl mb-6 overflow-hidden"
        style={{ background: 'oklch(0.11 0.015 270)', border: '1px solid oklch(0.20 0.02 270)' }}
      >
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Generation Settings
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSettings ? 'rotate-180' : ''}`} />
        </button>

        {showSettings && (
          <div className="px-5 pb-5 space-y-5 border-t" style={{ borderColor: 'oklch(0.18 0.02 270)' }}>
            <div className="pt-4">
              <label className="block text-xs font-medium mb-2.5" style={{ color: 'oklch(0.55 0.02 270)' }}>
                STYLE
              </label>
              <StyleSelector selected={style} onSelect={setStyle} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-2.5" style={{ color: 'oklch(0.55 0.02 270)' }}>
                  DURATION
                </label>
                <DurationSelector selected={duration} onSelect={setDuration} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2.5" style={{ color: 'oklch(0.55 0.02 270)' }}>
                  QUALITY
                </label>
                <QualitySelector
                  selected={quality}
                  onSelect={setQuality}
                  onUpgradeClick={onUpgradeClick}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2.5" style={{ color: 'oklch(0.55 0.02 270)' }}>
                BACKGROUND MUSIC
              </label>
              <MusicSelector
                enabled={musicEnabled}
                onToggle={setMusicEnabled}
                selectedTrack={selectedTrack}
                onTrackSelect={setSelectedTrack}
              />
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full py-4 rounded-2xl text-base font-semibold text-white transition-all duration-200 gradient-bg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
        style={!isGenerating && prompt.trim() ? { boxShadow: '0 0 30px rgba(168, 85, 247, 0.35)' } : {}}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating your video...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Video
          </>
        )}
      </button>

      {isGenerating && (
        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: 'oklch(0.50 0.02 270)' }}>
            This usually takes 10–30 seconds. Please wait...
          </p>
        </div>
      )}
    </div>
  );
}
