export const kpiData = [
  { label: 'Active Patients', value: '1,240', change: '+4.8% this week' },
  { label: 'High-Risk Patients', value: '128', change: '32 flagged today' },
  { label: 'Pending Alerts', value: '36', change: '12 urgent < 2h' },
  { label: 'Today’s Follow-Ups', value: '52', change: '41 confirmed' },
];

export const alerts = [
  { patient: 'Marina Jensen', message: 'High glucose trend', severity: 'critical', at: '9 min ago' },
  { patient: 'Ethan Brooks', message: 'Missed medication', severity: 'medium', at: '21 min ago' },
  { patient: 'David Kim', message: 'No recent follow-up', severity: 'low', at: '58 min ago' },
  { patient: 'Priya Sharma', message: 'Device sync failed', severity: 'medium', at: '1h 14m ago' },
];

export const patients = [
  {
    name: 'Marina Jensen',
    risk: 'High Risk',
    lastSync: '12 min ago',
    nextFollowUp: 'Today, 14:20',
    status: 'Overdue',
  },
  {
    name: 'Ethan Brooks',
    risk: 'Moderate',
    lastSync: '1h ago',
    nextFollowUp: 'Today, 16:45',
    status: 'Pending',
  },
  {
    name: 'Olivia Carter',
    risk: 'Stable',
    lastSync: '5 min ago',
    nextFollowUp: 'Apr 7, 11:40',
    status: 'Synced',
  },
  {
    name: 'Nadia Ahmed',
    risk: 'High Risk',
    lastSync: '27 min ago',
    nextFollowUp: 'Today, 15:15',
    status: 'Synced',
  },
];

export const quickActions = ['Add Patient', 'Review Alerts', 'Schedule Follow-Up', 'Open Reports'];

export const recentActivity = [
  '09:12 · Care coordinator escalated Marina Jensen glucose spike.',
  '08:47 · Device sync restored for Priya Sharma after remote reset.',
  '08:26 · Follow-up confirmed for Ethan Brooks at 16:45.',
  '07:58 · New education module assigned to 24 moderate-risk patients.',
];
