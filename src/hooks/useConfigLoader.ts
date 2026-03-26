import { useState, useEffect } from 'react';
import { githubApi } from '@/lib/githubApi';
import { triggerToast } from '@/lib/toast';

interface UseConfigLoaderResult<T> {
  data: T | null;
  loading: boolean;
  error: string;
  sha: string;
  save: (newData: T) => Promise<void>;
  saving: boolean;
}

/**
 * Load a JSON config file from GitHub, track its sha, and save it back.
 *
 * @param path  - e.g. 'src/data/menu.json'
 * @param empty - default value while loading
 */
export function useConfigLoader<T>(path: string, empty: T): UseConfigLoaderResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [sha, setSha] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    githubApi('read', path)
      .then(res => {
        if (cancelled) return;
        const parsed = JSON.parse(res.content) as T;
        setData(parsed);
        setSha(res.sha || '');
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setData(empty);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [path]);

  const save = async (newData: T) => {
    setSaving(true);
    triggerToast('Salvando…', 'progress', 50);
    try {
      const res = await githubApi('write', path, {
        content: JSON.stringify(newData, null, 2),
        sha,
      });
      setData(newData);
      setSha(res.sha || sha);
      triggerToast('Salvo com sucesso!', 'success');
    } catch (err: any) {
      triggerToast(err.message || 'Erro ao salvar', 'error');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { data, loading, error, sha, save, saving };
}
