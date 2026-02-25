import { ANIMATION_TEMPLATES, type AnimationTemplate, type TemplateId } from '../types/templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TemplateSelectionScreenProps {
  previewUrl: string;
  selectedTemplate: TemplateId | null;
  onSelectTemplate: (id: TemplateId) => void;
  onNext: () => void;
  onBack: () => void;
}

function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: AnimationTemplate;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`
        template-card w-full text-left rounded-2xl p-4 border-2 transition-all duration-200
        ${isSelected
          ? 'border-primary bg-primary/10 selected'
          : 'border-border bg-card hover:border-primary/40'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Animated emoji preview */}
        <div
          className={`
            w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
            ${template.bgColor}
            ${isSelected ? template.animClass : ''}
          `}
        >
          {template.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-black text-base ${isSelected ? 'text-primary' : 'text-foreground'}`}>
              {template.name}
            </span>
            {isSelected && (
              <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-bold">
                Selected ✓
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm font-semibold leading-snug">
            {template.description}
          </p>
        </div>
      </div>
    </button>
  );
}

export function TemplateSelectionScreen({
  previewUrl,
  selectedTemplate,
  onSelectTemplate,
  onNext,
  onBack,
}: TemplateSelectionScreenProps) {
  return (
    <div className="step-enter flex flex-col gap-6 w-full max-w-3xl mx-auto px-4">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black gradient-text mb-2">
          Animation Template Chuno! 🎨
        </h2>
        <p className="text-muted-foreground font-semibold text-sm sm:text-base">
          Apni photo ke liye ek animation style select karo
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Photo preview */}
        <div className="lg:w-48 flex-shrink-0">
          <div className="sticky top-4">
            <p className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-2 text-center">
              Tumhari Photo
            </p>
            <div className="w-full lg:w-48 h-40 lg:h-48 rounded-2xl overflow-hidden border-2 border-border shadow-md mx-auto">
              <img
                src={previewUrl}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Templates grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ANIMATION_TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={() => onSelectTemplate(template.id)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="rounded-full font-black gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Wapas Jao
        </Button>

        <Button
          size="lg"
          onClick={onNext}
          disabled={!selectedTemplate}
          className="rounded-full font-black gap-2 px-8"
        >
          Preview Dekho
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
