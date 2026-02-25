interface StyleSelectorProps {
  selected: string;
  onSelect: (style: string) => void;
}

const STYLES = [
  {
    id: 'Cinematic',
    label: 'Cinematic',
    image: '/assets/generated/style-cinematic.dim_200x200.png',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    accent: '#e94560',
  },
  {
    id: 'Anime',
    label: 'Anime',
    image: '/assets/generated/style-anime.dim_200x200.png',
    gradient: 'linear-gradient(135deg, #2d1b69, #11998e, #38ef7d)',
    accent: '#38ef7d',
  },
  {
    id: 'Cartoon',
    label: 'Cartoon',
    image: '/assets/generated/style-cartoon.dim_200x200.png',
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200, #f7971e)',
    accent: '#ffd200',
  },
  {
    id: '3D Effect',
    label: '3D Effect',
    image: '/assets/generated/style-3d.dim_200x200.png',
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)',
    accent: '#8b5cf6',
  },
];

export default function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {STYLES.map(style => {
        const isSelected = selected === style.id;
        return (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className="relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 focus:outline-none"
            style={{
              aspectRatio: '1',
              border: isSelected
                ? '2px solid transparent'
                : '2px solid oklch(0.22 0.02 270)',
              boxShadow: isSelected
                ? `0 0 0 2px ${style.accent}, 0 0 16px ${style.accent}55`
                : 'none',
            }}
          >
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{ background: style.gradient }}
            />
            {/* Image overlay */}
            <img
              src={style.image}
              alt={style.label}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Label */}
            <div className="absolute bottom-0 inset-x-0 p-1.5 text-center">
              <span className="text-xs font-semibold text-white drop-shadow-lg">
                {style.label}
              </span>
            </div>
            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: style.accent }}>
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
