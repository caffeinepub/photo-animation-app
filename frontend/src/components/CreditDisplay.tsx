import { Zap, Crown } from 'lucide-react';
import { useGetCreditStatus } from '../hooks/useQueries';

interface CreditDisplayProps {
  onUpgradeClick: () => void;
}

export default function CreditDisplay({ onUpgradeClick }: CreditDisplayProps) {
  const { data: creditStatus } = useGetCreditStatus();

  if (!creditStatus) return null;

  const balance = Number(creditStatus.balance);
  const isPro = creditStatus.isPro;

  return (
    <div className="flex items-center gap-2">
      {isPro ? (
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.2))',
            border: '1px solid oklch(0.40 0.12 290)',
          }}
        >
          <Crown className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs font-semibold text-white">PRO</span>
        </div>
      ) : (
        <>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{
              background: 'oklch(0.14 0.02 270)',
              border: '1px solid oklch(0.22 0.02 270)',
            }}
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-medium text-white">{balance}</span>
            <span className="text-xs" style={{ color: 'oklch(0.50 0.02 270)' }}>credits</span>
          </div>
          {balance === 0 && (
            <button
              onClick={onUpgradeClick}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
            >
              Upgrade
            </button>
          )}
        </>
      )}
    </div>
  );
}
