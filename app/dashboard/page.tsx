import Link from "next/link";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Settings,
  Users,
  WalletCards,
} from "lucide-react";

const stats = [
  ["Students", "1,248", "+8.2% this term"],
  ["Teachers", "86", "4 new this term"],
  ["Attendance", "94.6%", "Current average"],
  ["Pending Fees", "GH₵ 48,650", "Across active accounts"],
];

const modules = [
  [Users, "Students", "Manage student profiles and classes", "/dashboard/students"],
  [GraduationCap, "Academics", "Subjects, results and assessments", "#"],
  [ClipboardCheck, "Attendance", "Track daily student attendance", "#"],
  [CalendarDays, "Timetable", "Manage lessons and schedules", "#"],
  [BookOpen, "Assignments", "Create and review assignments", "#"],
  [WalletCards, "Fees", "Track school fee records", "#"],
];

export default function Dashboard() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="rounded-xl bg-blue-600 p-2">
            <GraduationCap size={22} />
          </div>
          <div>
            <div className="font-bold">JIPAS</div>
            <div className="text-xs text-blue-200">Management System</div>
          </div>
        </div>

        <nav className="space-y-1">
          <div className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold">
            Dashboard
          </div>

          {["Students", "Academics", "Attendance", "Timetable", "Assignments", "Fees"].map(
            (item) => (
              <div
                key={item}
                className="rounded-lg px-3 py-2 text-sm text-blue-100 hover:bg-white/10"
              >
                {item}
              </div>
            )
          )}
        </nav>

        <div className="mt-8 border-t border-white/10 pt-4 text-sm text-blue-200">
          <div className="flex items-center gap-2 px-3 py-2">
            <Bell size={17} />
            Notifications
          </div>
          <div className="flex items-center gap-2 px-3 py-2">
            <Settings size={17} />
            Settings
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="flex items-center justify-between border-b bg-white px-5 py-4 md:px-8">
          <div>
            <p className="text-sm text-slate-500">Administration</p>
            <h1 className="text-xl font-bold">School Dashboard</h1>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
            JA
          </div>
        </header>

        <div className="p-5 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(([label, value, note]) => (
              <div className="stat-card" key={label}>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">Quick Access</h2>
            <p className="mt-1 text-sm text-slate-500">
              Core school management modules
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map(([Icon, title, text, href]) => {
              const ModuleIcon = Icon as typeof Users;

              return (
                <Link
                  href={href as string}
                  key={title as string}
                  className="card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700 w-fit">
                    <ModuleIcon size={23} />
                  </div>

                  <h3 className="mt-5 font-bold">{title as string}</h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {text as string}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="card mt-8 p-6">
            <h2 className="font-bold">Recent Activity</h2>

            <div className="mt-4 divide-y">
              {[
                "New student profile registered",
                "Term attendance records updated",
                "Mathematics results uploaded",
                "School announcement published",
              ].map((item, index) => (
                <div
                  className="flex items-center justify-between py-3 text-sm"
                  key={item}
                >
                  <span>{item}</span>
                  <span className="text-xs text-slate-400">
                    {index + 1}h ago
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
