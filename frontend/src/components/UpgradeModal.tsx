import { Crown, Zap, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useUpgradeToPro } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

const BENEFITS = [
  'Unlimited video generations',
  '1080p HD quality output',
  'Priority processing queue',
  'All animation styles unlocked',
  'Background music library',
  'Commercial usage rights',
];

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const upgradeToPro = useUpgradeToPro();

  const handleUpgrade = async () => {
    try {
      await upgradeToPro.mutateAsync();
      toast.success('🎉 Welcome to Pro! Unlimited credits unlocked.');
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Upgrade failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md border-0 p-0 overflow-hidden"
        style={{ background: 'oklch(0.11 0.015 270)', border: '1px solid oklch(0.22 0.02 270)' }}
      >
        {/* Header gradient */}
        <div
          className="px-6 pt-8 pb-6 text-center relative"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.15))' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: 'oklch(0.55 0.02 270)' }}
          >
            <X className="w-4 h-4" />
          </button>

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
          >
            <Crown className="w-8 h-8 text-white" />
          </div>

          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-white mb-1">
              Upgrade to Pro
            </DialogTitle>
            <DialogDescription style={{ color: 'oklch(0.60 0.02 270)' }}>
              Unlock unlimited video generation and premium features
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Benefits */}
        <div className="px-6 py-5">
          <ul className="space-y-3 mb-6">
            {BENEFITS.map(benefit => (
              <li key={benefit} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))', border: '1px solid oklch(0.40 0.12 290)' }}
                >
                  <Check className="w-3 h-3 text-purple-300" />
                </div>
                <span className="text-sm text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div
            className="rounded-xl p-4 mb-5 text-center"
            style={{ background: 'oklch(0.14 0.02 270)', border: '1px solid oklch(0.22 0.02 270)' }}
          >
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-white font-display">Free</span>
              <span className="text-sm" style={{ color: 'oklch(0.55 0.02 270)' }}>for now</span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'oklch(0.50 0.02 270)' }}>
              Limited time offer — upgrade at no cost
            </p>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={upgradeToPro.isPending}
            className="w-full py-3.5 rounded-xl text-base font-semibold text-white gradient-bg hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ boxShadow: '0 0 24px rgba(168, 85, 247, 0.35)' }}
          >
            {upgradeToPro.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Upgrading...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Upgrade to Pro — Free
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
