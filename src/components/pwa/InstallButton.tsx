import { Button } from '@/components/ui/Button';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { Download, CheckCircle } from 'lucide-react';

interface InstallButtonProps {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export function InstallButton({ variant = 'primary', fullWidth = true }: InstallButtonProps) {
  const { isSupported, isInstalled, promptInstall } = useInstallPrompt();

  if (isInstalled) {
    return (
      <Button variant="secondary" fullWidth={fullWidth} disabled leftIcon={<CheckCircle size={24} />}>
        App instalada
      </Button>
    );
  }

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      leftIcon={<Download size={24} />}
      onClick={promptInstall}
    >
      Instalar SafeSenior
    </Button>
  );
}
