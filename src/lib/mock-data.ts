export const kpiData = [
  { label: 'Active Patients', value: '1,240', change: '+4.8% vs last week' },
  { label: 'High-Risk Patients', value: '128', change: '-2.1% after intervention' },
  { label: 'Pending Alerts', value: '36', change: '12 require action < 2 hours' },
  { label: 'Scheduled Today', value: '52', change: '41 confirmed appointments' },
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
    nextFollowUp: 'Tomorrow, 09:00',
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
    name: 'David Kim',
    risk: 'Moderate',
    lastSync: '3h ago',
    nextFollowUp: 'Today, 16:00',
    status: 'Pending',
  },
  {
    name: 'Nadia Ahmed',
    risk: 'High Risk',
    lastSync: '27 min ago',
    nextFollowUp: 'Today, 15:15',
    status: 'Synced',
  },
];

export const coordinatorTasks = [
  'Review high-risk queue',
  'Call missed follow-up patients',
  'Approve educational campaign',
  'Validate device sync issues',
];

export const analyticsCards = [
  { title: 'Weekly Risk Trend', value: '▼ 9%', detail: 'Improvement in Tier-3 cohort' },
  { title: 'Adherence Rate', value: '86%', detail: 'Medication adherence, 7-day rolling' },
  { title: 'Appointment Completion', value: '93%', detail: 'Across all clinics this week' },
  { title: 'Alert Distribution', value: 'Critical 14%', detail: 'Medium 48% · Low 38%' },
];
