import { CalendarCheck2, FileBarChart2, Plus, TriangleAlert } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import SectionCard from '../components/mobile/SectionCard';
import StatusBadge from '../components/mobile/StatusBadge';
import { alerts, kpiData, patients, quickActions, recentActivity } from '../lib/mock-data';

const alertVariantMap: Record<string, 'critical' | 'medium' | 'low'> = {
  critical: 'critical',
  medium: 'medium',
  low: 'low',
};

const riskVariantMap: Record<string, 'highRisk' | 'moderate' | 'stable'> = {
  'High Risk': 'highRisk',
  Moderate: 'moderate',
  Stable: 'stable',
};

const statusVariantMap: Record<string, 'synced' | 'pending' | 'overdue'> = {
  Synced: 'synced',
  Pending: 'pending',
  Overdue: 'overdue',
};

const actionIconMap = [Plus, TriangleAlert, CalendarCheck2, FileBarChart2];

const DashboardPage = () => {
  return (
    <div className="space-y-4 pb-2">
      <div className="grid grid-cols-2 gap-3">
        {kpiData.map((kpi) => (
          <StatCard key={kpi.label} label={kpi.label} value={kpi.value} meta={kpi.change} />
        ))}
      </div>

      <SectionCard title="Alerts Preview" subtitle="Prioritize interventions requiring immediate response" actionLabel="See all">
        <ul className="space-y-2.5">
          {alerts.map((alert) => (
            <li key={`${alert.patient}-${alert.message}`} className="rounded-2xl bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{alert.message}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{alert.patient} · {alert.at}</p>
                </div>
                <StatusBadge label={alert.severity} variant={alertVariantMap[alert.severity]} />
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Patient Summary" subtitle="Compact high-priority caseload view">
        <ul className="space-y-2.5">
          {patients.map((patient) => (
            <li key={patient.name} className="rounded-2xl border border-slate-200/80 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
                <StatusBadge label={patient.risk} variant={riskVariantMap[patient.risk]} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Sync: {patient.lastSync}</span>
                <StatusBadge label={patient.status} variant={statusVariantMap[patient.status]} />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-600">Next follow-up: {patient.nextFollowUp}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Quick Actions" subtitle="Complete common care operations in 1–2 taps">
        <div className="grid grid-cols-2 gap-2.5">
          {quickActions.map((action, index) => {
            const ActionIcon = actionIconMap[index];
            return (
              <button
                key={action}
                type="button"
                className="flex min-h-14 items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-slate-700 shadow-sm"
              >
                <ActionIcon size={14} className="text-sky-600" />
                {action}
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Recent Activity" subtitle="Latest platform and care-team events">
        <ol className="space-y-2.5">
          {recentActivity.map((event) => (
            <li key={event} className="rounded-2xl bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
              {event}
            </li>
          ))}
        </ol>
      </SectionCard>
    </div>
  );
};

export default DashboardPage;
