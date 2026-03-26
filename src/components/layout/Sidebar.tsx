import React from 'react';
import { ExternalLink, LogOut, LayoutDashboard } from 'lucide-react';
import SidebarLink from './SidebarLink';

export interface NavSection {
  label: string;
  items: Array<{ href: string; label: string; icon: React.ElementType; section: string }>;
}

interface SidebarProps {
  activeSection?: string;
  sections: NavSection[];
  /** Brand name shown in logo area */
  brandName?: string;
  /** URL for "view site" link */
  siteUrl?: string;
  /** Called when logout is clicked */
  onLogout?: () => void;
}

export default function Sidebar({
  activeSection = '',
  sections,
  brandName = 'Admin CMS',
  siteUrl = '/',
  onLogout,
}: SidebarProps) {
  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
      return;
    }
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-admin-surface border-r border-admin-border flex flex-col z-50 shadow-sm">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-admin-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-admin-primary rounded-admin-md flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-admin-text">{brandName}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {sections.map(section => (
          <div key={section.label} className="mb-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
              {section.label}
            </p>
            {section.items.map(item => (
              <SidebarLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={activeSection === item.section}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-admin-border space-y-1">
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-admin-md text-slate-500 hover:text-admin-primary hover:bg-admin-primary-light transition-all group"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium">Ver site</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-admin-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
