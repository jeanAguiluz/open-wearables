import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CredentialsTab } from './settings/credentials-tab';
import { ProvidersTab } from './settings/providers-tab';
import { PrioritiesTab } from './settings/priorities-tab';
import { TeamTab } from './settings/team-tab';

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
});

interface TabConfig {
  id: string;
  label: string;
  component: React.ComponentType;
}

const tabs: TabConfig[] = [
  {
    id: 'credentials',
    label: 'Credenciales',
    component: CredentialsTab,
  },
  {
    id: 'providers',
    label: 'Proveedores',
    component: ProvidersTab,
  },
  {
    id: 'priorities',
    label: 'Prioridades',
    component: PrioritiesTab,
  },
  {
    id: 'team',
    label: 'Equipo',
    component: TeamTab,
  },
];

function SettingsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-white">Configuración</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Administra tus ajustes y preferencias
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
