# Admin UI Boilerplate

Copy-paste component library for **Astro + React + Tailwind** admin panels.
Inspired by shadcn/ui — no npm package, no versioning overhead. Just copy what you need.

## Stack

- Astro 4 + React 18
- Tailwind CSS 3
- Lucide React icons
- clsx + tailwind-merge

---

## Quick Start

### Option A — Use as GitHub Template

1. Click **"Use this template"** on GitHub
2. Clone your new repo
3. `npm install && npm run dev`
4. Open `http://localhost:4321/demo` for the kitchen sink

### Option B — Cherry-pick into existing project

Copy into your project:
```
src/styles/tokens.css       ← design tokens
src/styles/admin.css        ← tailwind entry
src/lib/cn.ts               ← clsx + twMerge helper
src/components/ui/          ← atomic components
src/components/feedback/    ← toasts, dialogs
src/components/layout/      ← card, sidebar, etc.
src/components/composite/   ← search, table, etc.
src/hooks/                  ← useConfigLoader, etc.
```

Merge `tailwind.config.ts` into yours (add the `admin-*` color/radius entries).

---

## Theming

All colors and radii are CSS custom properties in `src/styles/tokens.css`.
Change 3 lines to completely re-theme:

```css
/* Orange travel blog */
:root {
  --admin-primary: 234 88 12;
  --admin-primary-hover: 194 65 12;
  --admin-primary-light: 255 247 237;
}
```

```css
/* Teal SaaS */
:root {
  --admin-primary: 13 148 136;
  --admin-primary-hover: 15 118 110;
  --admin-primary-light: 240 253 250;
}
```

---

## Components

### `ui/` — Atomic

| Component | Description |
|-----------|-------------|
| `Button`  | variants: primary/secondary/danger/ghost · sizes: sm/md/lg · loading state |
| `Input`   | focus ring, disabled state, className pass-through |
| `Textarea`| same as Input |
| `Select`  | same as Input |
| `Label`   | uppercase, tracking-wider |
| `Badge`   | published/draft/info/warning/danger/neutral |
| `Toggle`  | custom CSS switch, replaces checkbox inline hacks |
| `Spinner` | Loader2 animate-spin, sizes sm/md/lg |

### `feedback/` — User Feedback

| Component | Description |
|-----------|-------------|
| `Toast`   | event-bus toasts (success/error/info/progress with progress bar) |
| `AlertBanner` | inline alerts, 3 variants: default/bordered/prominent |
| `ConfirmDialog` | replaces `window.confirm()`, works with `useConfirm` hook |
| `EmptyState` | dashed border + icon + CTA |

### `layout/` — Structure

| Component | Description |
|-----------|-------------|
| `Card` + `CardHeader/Body/Footer` | main content container |
| `PageHeader` | h1 + description + actions slot |
| `ActionBar` | sticky header bar |
| `Sidebar` | configurable nav via sections prop |
| `SidebarLink` | individual nav item |
| `AdminShell.astro` | full page layout (sidebar + main + toast) |

### `composite/` — Higher-order

| Component | Description |
|-----------|-------------|
| `Modal` | backdrop blur + header/body/footer |
| `Tabs` | pill-style tab group |
| `SaveButton` | button with loading state + Save/Loader2 icon |
| `InfoBox` | instructional callout (blue/amber/green) |
| `SearchInput` | input with search icon |
| `DataTable` | generic table with column renderer |
| `Pagination` | smart pagination with ellipsis |
| `ImageUploader` | drag-and-drop image zone |
| `ColorPicker` | color input + hex text field |

---

## Hooks

### `useConfigLoader<T>(path, empty)`

Load a JSON config from GitHub API, track SHA, save with toasts.

```tsx
const { data, loading, save, saving } = useConfigLoader('src/data/menu.json', []);
```

### `useConfirm()`

Imperative confirm dialog — replaces `window.confirm()`.

```tsx
const { confirmProps, confirm } = useConfirm();

// In JSX:
<ConfirmDialog {...confirmProps} />

// In handler:
if (await confirm({ description: 'Excluir este item?' })) {
  await deleteItem();
}
```

### `useUnsavedChanges(isDirty)`

Warns the user before navigating away.

```tsx
useUnsavedChanges(hasChanges);
```

---

## Toast API

```ts
import { triggerToast } from '@/lib/toast';

triggerToast('Salvo!', 'success');
triggerToast('Erro ao salvar', 'error');
triggerToast('Processando…', 'progress', 60);   // shows progress bar
triggerToast('Novidade!', 'info', undefined, '/blog/novo-post');  // with link
```

---

## GitHub API Helper

```ts
import { githubApi } from '@/lib/githubApi';

const file = await githubApi('read', 'src/data/config.json');
const json = JSON.parse(file.content);

await githubApi('write', 'src/data/config.json', {
  content: JSON.stringify(json, null, 2),
  sha: file.sha,
});
```

Requires `/api/admin/github` endpoint on the host project (see Walker for reference implementation).

---

## License

MIT
