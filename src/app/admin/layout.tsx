import { getSession } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, LogOut, Users } from 'lucide-react';
import { logout } from '@/app/actions/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getSession();

  if (!admin || admin.email !== 'owner@cryptoreels.com') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-btc rounded-lg flex items-center justify-center font-bold text-white text-xl">A</div>
            <span className="font-bold text-xl tracking-tight">Admin<span className="text-btc">Panel</span></span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5">
              <LayoutDashboard className="w-5 h-5 text-btc" />
              Overview
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5">
              <Settings className="w-5 h-5 text-muted-foreground" />
              Settings
            </Button>
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-red-500/10 hover:text-red-500">
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
