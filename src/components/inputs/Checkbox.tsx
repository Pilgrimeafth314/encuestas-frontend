interface CheckboxProps {

  label: string;
  isChecked: boolean;
  onToggle: (newIsChecked: boolean) => void;
}

export function Checkbox({ label, isChecked, onToggle }: CheckboxProps) {
  const handleToggle = () => {
    onToggle(!isChecked);
  };

  return (
    <label className="relative inline-flex items-center mb-4 cursor-pointer">
      <input
        type="checkbox"
        id={label}
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`w-11 h-6 bg-gray-200 rounded-full peer ${
          isChecked
            ? 'peer-checked:after:translate-x-full peer-checked:after:border-white'
            : ''
        } after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
      />
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
}
