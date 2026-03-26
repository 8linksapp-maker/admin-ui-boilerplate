import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, Settings, Tag, Users, Bell,
  Trash2, Edit3, Plus, Star,
} from 'lucide-react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import Toggle from '@/components/ui/Toggle';
import Spinner from '@/components/ui/Spinner';
import Toast from '@/components/feedback/Toast';
import AlertBanner from '@/components/feedback/AlertBanner';
import ConfirmDialog from '@/components/feedback/ConfirmDialog';
import EmptyState from '@/components/feedback/EmptyState';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/layout/Card';
import PageHeader from '@/components/layout/PageHeader';
import ActionBar from '@/components/layout/ActionBar';
import Sidebar from '@/components/layout/Sidebar';
import Modal from '@/components/composite/Modal';
import Tabs from '@/components/composite/Tabs';
import SaveButton from '@/components/composite/SaveButton';
import InfoBox from '@/components/composite/InfoBox';
import SearchInput from '@/components/composite/SearchInput';
import DataTable from '@/components/composite/DataTable';
import Pagination from '@/components/composite/Pagination';
import ImageUploader from '@/components/composite/ImageUploader';
import ColorPicker from '@/components/composite/ColorPicker';
import { triggerToast } from '@/lib/toast';

const navSections = [
  {
    label: 'Principal',
    items: [
      { href: '#', label: 'Dashboard', icon: LayoutDashboard, section: 'dashboard' },
      { href: '#', label: 'Artigos', icon: FileText, section: 'posts' },
      { href: '#', label: 'Categorias', icon: Tag, section: 'categories' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { href: '#', label: 'Configurações', icon: Settings, section: 'config' },
      { href: '#', label: 'Usuários', icon: Users, section: 'users' },
    ],
  },
];

const tableRows = [
  { name: 'Mochilão pela Ásia', category: 'Viagens', status: 'published', date: '2024-01-15' },
  { name: 'Guia de Bangkok', category: 'Destinos', status: 'draft', date: '2024-01-20' },
  { name: 'Dicas de Segurança', category: 'Tips', status: 'published', date: '2024-02-01' },
];

const tableColumns = [
  { key: 'name', header: 'Título' },
  { key: 'category', header: 'Categoria' },
  {
    key: 'status',
    header: 'Status',
    render: (row: any) => (
      <Badge variant={row.status === 'published' ? 'published' : 'draft'}>
        {row.status === 'published' ? 'Publicado' : 'Rascunho'}
      </Badge>
    ),
  },
  { key: 'date', header: 'Data' },
];

export default function KitchenSink() {
  const [toggle, setToggle] = useState(false);
  const [tab, setTab] = useState('buttons');
  const [page, setPage] = useState(1);
  const [color, setColor] = useState('#7c3aed');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const simulateSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      triggerToast('Salvo com sucesso!', 'success');
    }, 1500);
  };

  const tabs = [
    { id: 'buttons', label: 'Buttons & Forms' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'layout', label: 'Layout' },
    { id: 'composite', label: 'Composite' },
  ];

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <Sidebar
        activeSection="dashboard"
        sections={navSections}
        brandName="Boilerplate"
        onLogout={() => triggerToast('Logout simulado', 'info')}
      />

      <div className="ml-64 flex-1">
        <ActionBar
          title="Kitchen Sink"
          subtitle="Todos os componentes do Admin UI Boilerplate"
          actions={<SaveButton loading={saving} onClick={simulateSave} />}
        />

        <div className="p-8 space-y-10">
          <PageHeader
            title="Admin UI Boilerplate"
            description="Biblioteca de componentes copy-paste para projetos Astro + React + Tailwind"
            actions={
              <Button variant="secondary" size="sm">
                <Star className="w-4 h-4" /> GitHub
              </Button>
            }
          />

          <Tabs tabs={tabs} active={tab} onChange={setTab} />

          {/* ── BUTTONS & FORMS ── */}
          {tab === 'buttons' && (
            <div className="space-y-8">
              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Button Variants</h2></CardHeader>
                <CardBody className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Button Sizes</h2></CardHeader>
                <CardBody className="flex items-center flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Form Controls</h2></CardHeader>
                <CardBody className="space-y-4 max-w-md">
                  <div>
                    <Label htmlFor="title">Título do Post</Label>
                    <Input id="title" placeholder="Digite o título…" />
                  </div>
                  <div>
                    <Label htmlFor="desc">Descrição</Label>
                    <Textarea id="desc" placeholder="Descreva o conteúdo…" rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="cat">Categoria</Label>
                    <Select id="cat">
                      <option>Viagens</option>
                      <option>Destinos</option>
                      <option>Dicas</option>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Toggle checked={toggle} onChange={setToggle} label="Publicar imediatamente" />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Badges & Spinner</h2></CardHeader>
                <CardBody className="flex flex-wrap gap-3 items-center">
                  <Badge variant="published">Publicado</Badge>
                  <Badge variant="draft">Rascunho</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Error</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </CardBody>
              </Card>
            </div>
          )}

          {/* ── FEEDBACK ── */}
          {tab === 'feedback' && (
            <div className="space-y-8">
              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Toast Notifications</h2></CardHeader>
                <CardBody className="flex flex-wrap gap-3">
                  <Button onClick={() => triggerToast('Operação concluída!', 'success')}>Success Toast</Button>
                  <Button variant="danger" onClick={() => triggerToast('Erro ao salvar arquivo', 'error')}>Error Toast</Button>
                  <Button variant="secondary" onClick={() => triggerToast('Processando arquivo…', 'progress', 60)}>Progress Toast</Button>
                  <Button variant="ghost" onClick={() => triggerToast('Novidade disponível', 'info')}>Info Toast</Button>
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Alert Banners</h2></CardHeader>
                <CardBody className="space-y-3">
                  <AlertBanner type="info" variant="default" title="Informação">Verifique as configurações antes de publicar.</AlertBanner>
                  <AlertBanner type="success" variant="bordered" title="Salvo!">Suas alterações foram publicadas com sucesso.</AlertBanner>
                  <AlertBanner type="warning" variant="prominent" title="Atenção">Esta ação não pode ser desfeita.</AlertBanner>
                  <AlertBanner type="error">Falha ao conectar com a API. Tente novamente.</AlertBanner>
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Confirm Dialog</h2></CardHeader>
                <CardBody>
                  <Button variant="danger" onClick={() => setConfirmOpen(true)}>
                    <Trash2 className="w-4 h-4" /> Excluir post
                  </Button>
                  <ConfirmDialog
                    open={confirmOpen}
                    title="Excluir post"
                    description="Esta ação é irreversível. O post será permanentemente removido."
                    confirmLabel="Excluir"
                    onConfirm={() => { setConfirmOpen(false); triggerToast('Post excluído', 'success'); }}
                    onCancel={() => setConfirmOpen(false)}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Empty State</h2></CardHeader>
                <CardBody>
                  <EmptyState
                    icon={FileText}
                    heading="Nenhum post encontrado"
                    description="Crie seu primeiro artigo para começar a publicar conteúdo."
                    action={{ label: '+ Novo Post', onClick: () => triggerToast('Abrir editor…', 'info') }}
                  />
                </CardBody>
              </Card>
            </div>
          )}

          {/* ── LAYOUT ── */}
          {tab === 'layout' && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <h2 className="font-bold text-admin-text">Card anatomy</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-admin-text-muted">Card body content goes here.</p>
                </CardBody>
                <CardFooter>
                  <div className="flex justify-end gap-3">
                    <Button variant="secondary" size="sm">Cancelar</Button>
                    <Button size="sm">Salvar</Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">Modal</h2></CardHeader>
                <CardBody>
                  <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
                  <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Editar configuração"
                    footer={
                      <>
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
                        <Button onClick={() => { setModalOpen(false); triggerToast('Salvo!', 'success'); }}>Salvar</Button>
                      </>
                    }
                  >
                    <div className="space-y-4">
                      <div>
                        <Label>Nome</Label>
                        <Input placeholder="Digite o nome…" />
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <Textarea placeholder="Descrição…" rows={3} />
                      </div>
                    </div>
                  </Modal>
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">InfoBox Variants</h2></CardHeader>
                <CardBody className="space-y-3">
                  <InfoBox variant="blue" title="Como funciona">Configure o arquivo tokens.css para tematizar todo o painel.</InfoBox>
                  <InfoBox variant="amber" title="Atenção">As alterações só aparecem após rebuildar o projeto.</InfoBox>
                  <InfoBox variant="green" title="Dica">Use cherry-pick para copiar apenas os componentes que precisar.</InfoBox>
                </CardBody>
              </Card>
            </div>
          )}

          {/* ── COMPOSITE ── */}
          {tab === 'composite' && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-admin-text">DataTable + SearchInput + Pagination</h2>
                    <SearchInput placeholder="Buscar posts…" className="w-56" />
                  </div>
                </CardHeader>
                <DataTable columns={tableColumns} rows={tableRows} rowKey={r => r.name} />
                <CardFooter>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs text-admin-text-muted">3 resultados</span>
                    <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">ImageUploader</h2></CardHeader>
                <CardBody className="max-w-sm">
                  <ImageUploader
                    value={image}
                    onChange={(_, url) => setImage(url)}
                    onClear={() => setImage(undefined)}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">ColorPicker</h2></CardHeader>
                <CardBody>
                  <ColorPicker value={color} onChange={setColor} label="Cor primária" />
                  <p className="mt-3 text-sm text-admin-text-muted">Valor: <code className="font-mono">{color}</code></p>
                </CardBody>
              </Card>

              <Card>
                <CardHeader><h2 className="font-bold text-admin-text">SaveButton states</h2></CardHeader>
                <CardBody className="flex gap-3">
                  <SaveButton />
                  <SaveButton loading loadingLabel="Salvando…" />
                  <SaveButton disabled label="Sem alterações" />
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Toast />
    </div>
  );
}
