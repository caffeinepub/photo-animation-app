import { Music2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface MusicSelectorProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  selectedTrack: string;
  onTrackSelect: (track: string) => void;
}

const TRACKS = ['Upbeat', 'Chill', 'Epic'];

export default function MusicSelector({ enabled, onToggle, selectedTrack, onTrackSelect }: MusicSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music2 className="w-4 h-4" style={{ color: 'oklch(0.65 0.15 290)' }} />
          <span className="text-sm text-gray-300">Background Music</span>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>

      {enabled && (
        <div className="flex gap-2">
          {TRACKS.map(track => {
            const isSelected = selectedTrack === track;
            return (
              <button
                key={track}
                onClick={() => onTrackSelect(track)}
                className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))'
                    : 'oklch(0.15 0.02 270)',
                  border: isSelected
                    ? '1px solid oklch(0.50 0.15 290)'
                    : '1px solid oklch(0.22 0.02 270)',
                  color: isSelected ? 'white' : 'oklch(0.55 0.02 270)',
                }}
              >
                {track}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
