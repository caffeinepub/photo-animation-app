import { useRef, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

interface UploadScreenProps {
  onUpload: (file: File, preview: string) => void;
}

export default function UploadScreen({ onUpload }: UploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const preview = e.target?.result as string;
      onUpload(file, preview);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className="relative rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden"
      style={{
        background: isDragging ? 'oklch(0.15 0.03 280)' : 'oklch(0.11 0.015 270)',
        border: `2px dashed ${isDragging ? 'oklch(0.65 0.22 290)' : 'oklch(0.25 0.03 270)'}`,
        minHeight: '280px',
      }}
    >
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'oklch(0.16 0.04 290)', border: '1px solid oklch(0.28 0.08 290)' }}
        >
          {isDragging ? (
            <ImageIcon className="w-9 h-9" style={{ color: 'oklch(0.70 0.18 290)' }} />
          ) : (
            <Upload className="w-9 h-9" style={{ color: 'oklch(0.70 0.18 290)' }} />
          )}
        </div>
        <p className="text-lg font-semibold text-white mb-1.5">
          {isDragging ? 'Drop your image here' : 'Upload your photo'}
        </p>
        <p className="text-sm mb-3" style={{ color: 'oklch(0.50 0.02 270)' }}>
          Drag & drop or click to browse
        </p>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs"
          style={{ background: 'oklch(0.15 0.02 270)', color: 'oklch(0.45 0.02 270)' }}
        >
          <span>JPG · PNG · GIF · WebP</span>
          <span style={{ color: 'oklch(0.30 0.02 270)' }}>|</span>
          <span>Max 5MB</span>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}
