import { CheckCircle2, CircleAlert, CircleDot, Clock3, Plus, TriangleAlert } from 'lucide-react';
import { alerts, analyticsCards, coordinatorTasks, kpiData, patients } from '../lib/mock-data';

const severityStyles: Record<string, string> = {
  critical: 'bg-rose-50 text-rose-700 ring-rose-100',
  medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

const riskStyles: Record<string, string> = {
  'High Risk': 'bg-rose-50 text-rose-700 ring-rose-100',
  Moderate: 'bg-amber-50 text-amber-700 ring-amber-100',
  Stable: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

const statusStyles: Record<string, string> = {
  Synced: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Pending: 'bg-sky-50 text-sky-700 ring-sky-100',
  Overdue: 'bg-rose-50 text-rose-700 ring-rose-100',
};

const DashboardPage = () => {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((kpi) => (
          <article key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{kpi.value}</p>
            <p className="mt-1 text-xs text-slate-500">{kpi.change}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr,1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Alert Summary</h3>
            <button className="text-sm font-medium text-sky-700 hover:text-sky-800">Review all alerts</button>
          </div>
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li key={`${alert.patient}-${alert.message}`} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{alert.message}</p>
                  <p className="text-sm text-slate-500">{alert.patient} · {alert.at}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${severityStyles[alert.severity]}`}>
                  {alert.severity}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold">Care Coordinator Tasks</h3>
          <ul className="space-y-3">
            {coordinatorTasks.map((task) => (
              <li key={task} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CircleDot size={16} className="mt-0.5 text-sky-600" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Patient Overview</h3>
          <p className="text-sm text-slate-500">Actionable patient queue for care teams</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-3 py-3 font-semibold">Patient Name</th>
                <th className="px-3 py-3 font-semibold">Risk Level</th>
                <th className="px-3 py-3 font-semibold">Last Sync</th>
                <th className="px-3 py-3 font-semibold">Next Follow-Up</th>
                <th className="px-3 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.name} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium text-slate-800">{patient.name}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${riskStyles[patient.risk]}`}>
                      {patient.risk}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{patient.lastSync}</td>
                  <td className="px-3 py-3 text-slate-600">{patient.nextFollowUp}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[patient.status]}`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold">Analytics</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {analyticsCards.map((card) => (
              <div key={card.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-600">{card.title}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                <p className="mt-1 text-xs text-slate-500">{card.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold">Quick Actions</h3>
          <div className="grid gap-3">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">
              <Plus size={16} /> Add Patient
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <TriangleAlert size={16} /> Review Alerts
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Clock3 size={16} /> Schedule Follow-Up
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <CheckCircle2 size={16} /> Export Report
            </button>
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
            <CircleAlert size={16} className="mr-2 inline text-slate-400" />
            No escalations currently assigned to your team.
          </div>
        </article>
      </div>
    </section>
  );
};

export default DashboardPage;
