# Admin UI Boilerplate — Instruções para IA

Este projeto usa uma biblioteca de componentes copy-paste para painéis admin em **Astro + React + Tailwind**.
Antes de criar qualquer componente de UI, verifique se já existe algo aqui.

## Regras

- **Nunca use Tailwind inline para botões, inputs, modais ou toasts** — use os componentes abaixo
- **Nunca use `window.confirm()`** — use `ConfirmDialog` + `useConfirm`
- **Nunca concatene classes Tailwind com template strings** — use `cn()` de `@/lib/cn`
- **Todas as cores devem ser `admin-*`** — nunca `violet-`, `indigo-`, `amber-` diretamente
- Para salvar configs JSON do GitHub, use `useConfigLoader` — não reimplemente fetch + sha tracking

---

## Componentes disponíveis

### Utilitários (`src/lib/`)

```ts
import { cn } from '@/lib/cn';                    // clsx + tailwind-merge
import { triggerToast } from '@/lib/toast';        // dispara toast global
import { githubApi } from '@/lib/githubApi';       // POST /api/admin/github
```

**triggerToast:**
```ts
triggerToast('Salvo!', 'success');
triggerToast('Erro ao salvar', 'error');
triggerToast('Processando…', 'progress', 60);  // barra de progresso
triggerToast('Info', 'info', undefined, '/link-opcional');
```

---

### Atômicos (`src/components/ui/`)

```tsx
import Button   from '@/components/ui/Button';
import Input    from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select   from '@/components/ui/Select';
import Label    from '@/components/ui/Label';
import Badge    from '@/components/ui/Badge';
import Toggle   from '@/components/ui/Toggle';
import Spinner  from '@/components/ui/Spinner';
```

**Button** — variants: `primary` | `secondary` | `danger` | `ghost` · sizes: `sm` | `md` | `lg`
```tsx
<Button variant="primary" size="md" loading={saving} onClick={handleSave}>Salvar</Button>
<Button variant="danger">Excluir</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Ver mais</Button>
```

**Badge** — variants: `published` | `draft` | `info` | `warning` | `danger` | `neutral`
```tsx
<Badge variant="published">Publicado</Badge>
<Badge variant="draft">Rascunho</Badge>
```

**Toggle:**
```tsx
<Toggle checked={active} onChange={setActive} label="Publicar imediatamente" />
```

**Spinner:**
```tsx
<Spinner size="md" />  // sm | md | lg
```

---

### Feedback (`src/components/feedback/`)

```tsx
import Toast         from '@/components/feedback/Toast';          // colocar 1x no layout
import AlertBanner   from '@/components/feedback/AlertBanner';
import ConfirmDialog from '@/components/feedback/ConfirmDialog';
import EmptyState    from '@/components/feedback/EmptyState';
```

**Toast** — colocar uma vez no layout raiz, escuta eventos do `triggerToast()`:
```tsx
<Toast client:load />
```

**AlertBanner** — variants: `default` | `bordered` | `prominent` · types: `info` | `success` | `warning` | `error`
```tsx
<AlertBanner type="warning" variant="bordered" title="Atenção">
  Esta ação não pode ser desfeita.
</AlertBanner>
```

**ConfirmDialog** — sempre usar com `useConfirm`, nunca `window.confirm()`:
```tsx
const { confirm, confirmProps } = useConfirm();
// no JSX:
<ConfirmDialog {...confirmProps} />
// no handler:
if (await confirm({ description: 'Excluir este post?' })) {
  await deletePost();
}
```

**EmptyState:**
```tsx
<EmptyState
  icon={FileText}
  heading="Nenhum post encontrado"
  description="Crie seu primeiro artigo."
  action={{ label: '+ Novo Post', onClick: handleNew }}
/>
```

---

### Layout (`src/components/layout/`)

```tsx
import Card, { CardHeader, CardBody, CardFooter } from '@/components/layout/Card';
import PageHeader  from '@/components/layout/PageHeader';
import ActionBar   from '@/components/layout/ActionBar';
import Sidebar     from '@/components/layout/Sidebar';
import SidebarLink from '@/components/layout/SidebarLink';
// AdminShell.astro — layout completo (sidebar + main + toast)
```

**Card** — container padrão de seção:
```tsx
<Card>
  <CardHeader><h2 className="font-bold text-admin-text">Título</h2></CardHeader>
  <CardBody>conteúdo</CardBody>
  <CardFooter><Button>Salvar</Button></CardFooter>
</Card>
```

**PageHeader** — topo de cada página admin:
```tsx
<PageHeader
  title="Artigos"
  description="Gerencie os posts do blog"
  actions={<Button onClick={handleNew}>+ Novo Post</Button>}
/>
```

**ActionBar** — sticky header com título + botões:
```tsx
<ActionBar
  title="Editar Post"
  subtitle="Rascunho"
  actions={<SaveButton loading={saving} onClick={handleSave} />}
/>
```

**Sidebar** — nav configurável via props:
```tsx
<Sidebar
  activeSection="posts"
  brandName="Meu Blog"
  sections={[
    {
      label: 'Principal',
      items: [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, section: 'dashboard' },
        { href: '/admin/posts', label: 'Artigos', icon: FileText, section: 'posts' },
      ],
    },
  ]}
/>
```

---

### Compostos (`src/components/composite/`)

```tsx
import Modal         from '@/components/composite/Modal';
import Tabs          from '@/components/composite/Tabs';
import SaveButton    from '@/components/composite/SaveButton';
import InfoBox       from '@/components/composite/InfoBox';
import SearchInput   from '@/components/composite/SearchInput';
import DataTable     from '@/components/composite/DataTable';
import Pagination    from '@/components/composite/Pagination';
import ImageUploader from '@/components/composite/ImageUploader';
import ColorPicker   from '@/components/composite/ColorPicker';
```

**SaveButton** — botão de salvar com loading state:
```tsx
<SaveButton loading={saving} onClick={handleSave} />
<SaveButton loading={saving} label="Publicar" loadingLabel="Publicando…" />
```

**Modal:**
```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Editar item"
  footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button><Button onClick={handleSave}>Salvar</Button></>}
>
  <Input placeholder="Nome…" />
</Modal>
```

**Tabs:**
```tsx
const tabs = [{ id: 'geral', label: 'Geral' }, { id: 'seo', label: 'SEO' }];
<Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
```

**InfoBox** — callout instrucional, variants: `blue` | `amber` | `green`:
```tsx
<InfoBox variant="amber" title="Atenção">Salve antes de sair.</InfoBox>
```

**DataTable:**
```tsx
<DataTable
  columns={[
    { key: 'title', header: 'Título' },
    { key: 'status', header: 'Status', render: row => <Badge variant={row.status}>{row.status}</Badge> },
  ]}
  rows={posts}
  rowKey={r => r.slug}
/>
```

**Pagination:**
```tsx
<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
```

**ImageUploader:**
```tsx
<ImageUploader
  value={imageUrl}
  onChange={(file, previewUrl) => { setPendingFile(file); setImageUrl(previewUrl); }}
  onClear={() => setImageUrl(undefined)}
/>
```

**ColorPicker:**
```tsx
<ColorPicker value={color} onChange={setColor} label="Cor do tema" />
```

---

### Hooks (`src/hooks/`)

**useConfigLoader** — carrega JSON do GitHub, salva com sha tracking e toasts automáticos:
```ts
import { useConfigLoader } from '@/hooks/useConfigLoader';

const { data, loading, save, saving } = useConfigLoader('src/data/menu.json', []);

// salvar:
await save(newData);  // triggerToast automático de progresso e sucesso/erro
```

**useConfirm** — dialog de confirmação imperativo:
```ts
import { useConfirm } from '@/hooks/useConfirm';

const { confirm, confirmProps } = useConfirm();
// no JSX: <ConfirmDialog {...confirmProps} />
// no handler:
if (await confirm({ description: 'Excluir?' })) { ... }
```

**useUnsavedChanges** — avisa antes de sair com mudanças não salvas:
```ts
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';

useUnsavedChanges(isDirty);
```

---

## Theming

Editar `src/styles/tokens.css` para mudar o tema inteiro:
```css
:root {
  --admin-primary: 124 58 237;        /* violet — mudar aqui */
  --admin-primary-hover: 109 40 217;
  --admin-primary-light: 245 243 255;
}
```

Classes Tailwind disponíveis: `bg-admin-primary`, `text-admin-primary`, `border-admin-border`, `bg-admin-bg`, `text-admin-text`, `text-admin-text-muted`, `bg-admin-surface`, etc.
