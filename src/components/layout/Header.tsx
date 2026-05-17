'use client';

interface HeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Header({ title, description, actions }: HeaderProps) {
  return (
    <div className="flex items-start justify-between border-b border-zinc-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-zinc-500">{description}</p>}
      </div>
      {actions && <div className="ml-4 flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
