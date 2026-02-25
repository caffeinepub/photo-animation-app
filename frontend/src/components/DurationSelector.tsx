interface DurationSelectorProps {
  selected: number;
  onSelect: (duration: number) => void;
}

const DURATIONS = [5, 10, 15];

export default function DurationSelector({ selected, onSelect }: DurationSelectorProps) {
  return (
    <div className="flex gap-2">
      {DURATIONS.map(d => {
        const isSelected = selected === d;
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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
            {d}s
          </button>
        );
      })}
    </div>
  );
}
