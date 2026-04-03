import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Bell,
  BookOpen,
  CalendarCheck2,
  ChartColumn,
  Gauge,
  FileText,
  Settings,
} from 'lucide-react';

export type WorkspaceModule = {
  id: string;
  name: string;
  route: string;
  description: string;
  icon: LucideIcon;
};

export const workspaceModules: WorkspaceModule[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    route: '/',
    description: 'Clinical operations snapshot and priorities',
    icon: Gauge,
  },
  {
    id: 'patients',
    name: 'Patients',
    route: '/patients',
    description: 'Patient cohorts, risk scoring, and profile review',
    icon: Activity,
  },
  {
    id: 'alerts',
    name: 'Alerts',
    route: '/alerts',
    description: 'Monitor and triage urgent clinical alerts',
    icon: Bell,
  },
  {
    id: 'education',
    name: 'Education',
    route: '/education',
    description: 'Education campaigns and adherence content',
    icon: BookOpen,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    route: '/analytics',
    description: 'Population health analytics and performance',
    icon: ChartColumn,
  },
  {
    id: 'scheduling',
    name: 'Scheduling',
    route: '/scheduling',
    description: 'Follow-up and care coordinator schedules',
    icon: CalendarCheck2,
  },
  {
    id: 'reports',
    name: 'Reports',
    route: '/reports',
    description: 'Compliance and executive reporting workspace',
    icon: FileText,
  },
  {
    id: 'settings',
    name: 'Settings',
    route: '/settings',
    description: 'Organization, access, and integration settings',
    icon: Settings,
  },
];
