interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="font-semibold text-text">{label}</p>
        {description && <p className="text-text-muted text-base mt-1">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex h-8 w-14 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/50',
          checked ? 'bg-primary' : 'bg-gray-300',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 mt-1',
            checked ? 'translate-x-7' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
    </div>
  );
}
