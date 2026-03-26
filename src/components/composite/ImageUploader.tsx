import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ImageUploaderProps {
  value?: string;
  onChange: (file: File, previewUrl: string) => void;
  onClear?: () => void;
  accept?: string;
  className?: string;
  placeholder?: string;
}

export default function ImageUploader({
  value,
  onChange,
  onClear,
  accept = 'image/*',
  className,
  placeholder = 'Clique ou arraste uma imagem aqui',
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    onChange(file, url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={cn('relative', className)}>
      {value ? (
        <div className="relative rounded-admin-lg overflow-hidden border border-admin-border">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          {onClear && (
            <button
              onClick={onClear}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow transition-colors"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-3 h-48 border-2 border-dashed border-admin-border rounded-admin-lg cursor-pointer hover:border-admin-primary hover:bg-admin-primary-light/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-admin-text-muted" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-admin-text">{placeholder}</p>
            <p className="text-xs text-admin-text-muted mt-0.5">PNG, JPG, WebP</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-admin-border rounded-admin-md text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Upload className="w-3 h-3" /> Escolher arquivo
          </span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
