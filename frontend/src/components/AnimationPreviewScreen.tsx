import { useState } from 'react';
import { ANIMATION_TEMPLATES, type TemplateId } from '../types/templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Upload, Loader2, CheckCircle } from 'lucide-react';
import { useUploadPhoto } from '../hooks/useQueries';

interface AnimationPreviewScreenProps {
  previewUrl: string;
  selectedFile: File;
  selectedTemplate: TemplateId;
  onBack: () => void;
  onStartOver: () => void;
  onChangeTemplate: (id: TemplateId) => void;
}

export function AnimationPreviewScreen({
  previewUrl,
  selectedFile,
  selectedTemplate,
  onBack,
  onStartOver,
  onChangeTemplate,
}: AnimationPreviewScreenProps) {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const uploadPhoto = useUploadPhoto();

  const currentTemplate = ANIMATION_TEMPLATES.find((t) => t.id === selectedTemplate)!;

  const handleSave = async () => {
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      await uploadPhoto.mutateAsync({ name: selectedFile.name, data: arrayBuffer });
      setUploadSuccess(true);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="step-enter flex flex-col gap-6 w-full max-w-2xl mx-auto px-4">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black gradient-text mb-2">
          Dekho Kaise Lag Rahi Hai! ✨
        </h2>
        <p className="text-muted-foreground font-semibold text-sm sm:text-base">
          Tumhari photo{' '}
          <span className="text-primary font-black">
            {currentTemplate.emoji} {currentTemplate.name}
          </span>{' '}
          animation ke saath!
        </p>
      </div>

      {/* Animation Stage */}
      <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/20 rounded-3xl overflow-hidden border-2 border-border shadow-xl">
        {/* Decorative dots */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, oklch(0.65 0.22 38) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative flex items-center justify-center py-16 px-8 min-h-64">
          <div className={`${currentTemplate.animClass} relative z-10`}>
            <img
              src={previewUrl}
              alt="Animated photo"
              className="w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-2xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>

        {/* Animation label */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span
            className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black
            ${currentTemplate.bgColor} ${currentTemplate.color} border border-current/20
          `}
          >
            {currentTemplate.emoji} {currentTemplate.name} Mode
          </span>
        </div>
      </div>

      {/* Template switcher */}
      <div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-3 text-center">
          Template Badlo
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {ANIMATION_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChangeTemplate(t.id)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold
                transition-all duration-200 border-2
                ${
                  selectedTemplate === t.id
                    ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                    : 'border-border bg-card hover:border-primary/50 hover:scale-105'
                }
              `}
            >
              <span>{t.emoji}</span>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Save status */}
      {uploadSuccess && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-xl px-4 py-3 font-bold border border-green-200">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Photo save ho gayi! 🎉</span>
        </div>
      )}

      {uploadPhoto.isError && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 rounded-xl px-4 py-3 font-bold">
          <span>Upload fail hua. Dobara try karo!</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="rounded-full font-black gap-2 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Template Badlo
        </Button>

        {!uploadSuccess && (
          <Button
            size="lg"
            onClick={handleSave}
            disabled={uploadPhoto.isPending}
            className="rounded-full font-black gap-2 w-full sm:flex-1"
          >
            {uploadPhoto.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Save Ho Rahi Hai...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Photo Save Karo
              </>
            )}
          </Button>
        )}

        <Button
          variant="secondary"
          size="lg"
          onClick={onStartOver}
          className="rounded-full font-black gap-2 w-full sm:w-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Naya Photo
        </Button>
      </div>
    </div>
  );
}
