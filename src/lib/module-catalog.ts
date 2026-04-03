export type WorkspaceModule = {
  id: string;
  name: string;
  route: string;
  description?: string;
};

export const workspaceModules: WorkspaceModule[] = [
  { id: 'dashboard', name: 'Dashboard', route: '/' },
  { id: 'patients', name: 'Patients', route: '/patients' },
  { id: 'alerts', name: 'Alerts', route: '/alerts' },
  { id: 'education', name: 'Education', route: '/education' },
  { id: 'analytics', name: 'Analytics', route: '/analytics' },
  { id: 'scheduling', name: 'Scheduling', route: '/scheduling' },
  { id: 'reports', name: 'Reports', route: '/reports' },
  { id: 'settings', name: 'Settings', route: '/settings' },
];
