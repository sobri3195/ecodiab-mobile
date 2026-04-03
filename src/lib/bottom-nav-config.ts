import { workspaceModules } from './module-catalog';

export const PRIMARY_TAB_IDS = ['dashboard', 'patients', 'alerts', 'education'] as const;

export type PrimaryTabId = (typeof PRIMARY_TAB_IDS)[number];

export const primaryTabs = PRIMARY_TAB_IDS.map((id) => {
  const module = workspaceModules.find((candidate) => candidate.id === id);

  if (!module) {
    throw new Error(`Primary tab module not found in workspaceModules: ${id}`);
  }

  return module;
});

export const bottomSheetModules = workspaceModules.filter(
  (module) => !PRIMARY_TAB_IDS.includes(module.id as PrimaryTabId),
);
