import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

export default function SidebarLink({ href, label, icon: Icon, active = false }: SidebarLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-admin-md mb-0.5 transition-all group',
        active
          ? 'bg-admin-primary-light text-admin-primary'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
      )}
    >
      <Icon
        className={cn(
          'w-4 h-4 shrink-0',
          active ? 'text-admin-primary' : 'text-slate-400 group-hover:text-slate-600',
        )}
      />
      <span className={cn('text-sm flex-1', active ? 'font-semibold' : 'font-medium')}>{label}</span>
      {active && <ChevronRight className="w-3 h-3 text-admin-primary/60" />}
    </a>
  );
}
