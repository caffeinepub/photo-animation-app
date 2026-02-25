import { useState, useRef } from 'react';
import { Upload, X, Sparkles, Loader2, ImageIcon, ChevronDown } from 'lucide-react';
import StyleSelector from './StyleSelector';
import DurationSelector from './DurationSelector';
import QualitySelector from './QualitySelector';
import MusicSelector from './MusicSelector';
import { useConsumeCredit } from '../hooks/useQueries';
import { VideoResult } from '../App';

interface ImageToVideoScreenProps {
  onResult: (result: VideoResult) => void;
  onUpgradeClick: () => void;
}

export default function ImageToVideoScreen({ onResult, onUpgradeClick }: ImageToVideoScreenProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [style, setStyle] = useState('Cinematic');
  const [duration, setDuration] = useState(5);
  const [quality, setQuality] = useState('720p');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Upbeat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const consumeCredit = useConsumeCredit();

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleGenerate = async () => {
    if (!image || isGenerating) return;
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
      }

      await new Promise(r => setTimeout(r, 2500));

      onResult({
        style,
        duration,
        quality,
        music: musicEnabled,
        sourceType: 'image',
        sourceImage: image,
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
          Animate your image
        </h2>
        <p className="text-sm" style={{ color: 'oklch(0.55 0.02 270)' }}>
          Upload a photo and watch it come to life
        </p>
      </div>

      {/* Upload / Preview Area */}
      {!image ? (
        <div
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="relative rounded-2xl mb-4 cursor-pointer transition-all duration-200 overflow-hidden"
          style={{
            background: isDragging ? 'oklch(0.15 0.03 280)' : 'oklch(0.11 0.015 270)',
            border: `2px dashed ${isDragging ? 'oklch(0.65 0.22 290)' : 'oklch(0.25 0.03 270)'}`,
            minHeight: '240px',
          }}
        >
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'oklch(0.16 0.04 290)', border: '1px solid oklch(0.28 0.08 290)' }}
            >
              <Upload className="w-7 h-7" style={{ color: 'oklch(0.70 0.18 290)' }} />
            </div>
            <p className="text-base font-medium text-white mb-1">
              {isDragging ? 'Drop your image here' : 'Upload an image'}
            </p>
            <p className="text-sm" style={{ color: 'oklch(0.50 0.02 270)' }}>
              Drag & drop or click to browse
            </p>
            <p className="text-xs mt-2" style={{ color: 'oklch(0.40 0.02 270)' }}>
              JPG, PNG, WebP · Max 5MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="relative rounded-2xl mb-4 overflow-hidden" style={{ border: '1px solid oklch(0.22 0.02 270)' }}>
          <img
            src={image}
            alt="Uploaded"
            className="w-full object-cover"
            style={{ maxHeight: '320px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            onClick={() => setImage(null)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
            <ImageIcon className="w-3 h-3 text-green-400" />
            <span className="text-xs text-white font-medium">Image ready</span>
          </div>
        </div>
      )}

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
        disabled={!image || isGenerating}
        className="w-full py-4 rounded-2xl text-base font-semibold text-white transition-all duration-200 gradient-bg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
        style={!isGenerating && image ? { boxShadow: '0 0 30px rgba(168, 85, 247, 0.35)' } : {}}
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
