import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-admin-md text-admin-text-muted hover:text-admin-primary hover:bg-admin-primary-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {visiblePages.reduce<React.ReactNode[]>((acc, page, i, arr) => {
        if (i > 0 && page - arr[i - 1] > 1) {
          acc.push(<span key={`gap-${page}`} className="px-1 text-admin-text-muted">…</span>);
        }
        acc.push(
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'min-w-[2rem] h-8 px-2 rounded-admin-md text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-admin-primary text-white'
                : 'text-admin-text-muted hover:text-admin-primary hover:bg-admin-primary-light',
            )}
          >
            {page}
          </button>,
        );
        return acc;
      }, [])}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-admin-md text-admin-text-muted hover:text-admin-primary hover:bg-admin-primary-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
