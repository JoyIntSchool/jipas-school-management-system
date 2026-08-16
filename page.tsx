import Link from "next/link";
import { ArrowLeft, Search, UserPlus } from "lucide-react";

const students = [
  ["JPS-2026-001", "Ama Mensah", "Form 3A", "Female", "Active"],
  ["JPS-2026-002", "Kwame Asante", "Form 3A", "Male", "Active"],
  ["JPS-2026-003", "Akosua Owusu", "Form 2B", "Female", "Active"],
  ["JPS-2026-004", "Daniel Boateng", "Form 1C", "Male", "Active"],
];

export default function StudentsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-5 py-4 md:px-8">
        <Link href="/dashboard" className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-700"><ArrowLeft size={17}/> Dashboard</Link>
      </header>
      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><h1 className="text-2xl font-black">Students</h1><p className="mt-1 text-sm text-slate-500">Manage registered JIPAS students.</p></div>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white"><UserPlus size={17}/> Add Student</button>
        </div>

        <div className="card mt-6 overflow-hidden">
          <div className="border-b p-4">
            <div className="flex max-w-md items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2">
              <Search size={17} className="text-slate-400"/>
              <input className="w-full bg-transparent text-sm outline-none" placeholder="Search students..." />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr><th className="px-5 py-3">Admission No.</th><th className="px-5 py-3">Student</th><th className="px-5 py-3">Class</th><th className="px-5 py-3">Gender</th><th className="px-5 py-3">Status</th></tr>
              </thead>
              <tbody className="divide-y">
                {students.map((s) => <tr key={s[0]} className="hover:bg-slate-50">
                  {s.map((v) => <td className="px-5 py-4" key={v}><span className={v === "Active" ? "rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700" : ""}>{v}</span></td>)}
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
