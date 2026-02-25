import { Lock } from 'lucide-react';

interface QualitySelectorProps {
  selected: string;
  onSelect: (quality: string) => void;
  onUpgradeClick: () => void;
  isPro?: boolean;
}

const QUALITIES = [
  { id: '720p', label: '720p', pro: false },
  { id: '1080p', label: '1080p', pro: true },
];

export default function QualitySelector({ selected, onSelect, onUpgradeClick, isPro = false }: QualitySelectorProps) {
  return (
    <div className="flex gap-2">
      {QUALITIES.map(q => {
        const isSelected = selected === q.id;
        const isLocked = q.pro && !isPro;
        return (
          <button
            key={q.id}
            onClick={() => {
              if (isLocked) {
                onUpgradeClick();
              } else {
                onSelect(q.id);
              }
            }}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1"
            style={{
              background: isSelected
                ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))'
                : 'oklch(0.15 0.02 270)',
              border: isSelected
                ? '1px solid oklch(0.50 0.15 290)'
                : '1px solid oklch(0.22 0.02 270)',
              color: isSelected ? 'white' : isLocked ? 'oklch(0.45 0.02 270)' : 'oklch(0.55 0.02 270)',
            }}
          >
            {isLocked && <Lock className="w-3 h-3" />}
            {q.label}
          </button>
        );
      })}
    </div>
  );
}
