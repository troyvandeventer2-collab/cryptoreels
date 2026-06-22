import Link from 'next/link';
import { getSession, logout } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Video, CreditCard, Settings, LogOut, PlusCircle } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-btc rounded-lg flex items-center justify-center font-bold text-white text-xl">C</div>
            <span className="font-bold text-xl tracking-tight">Crypto<span className="text-btc">Reels</span></span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5">
              <LayoutDashboard className="w-5 h-5 text-btc" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/series">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5">
              <Video className="w-5 h-5 text-eth" />
              My Series
            </Button>
          </Link>
          <Link href="/dashboard/billing">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5">
              <CreditCard className="w-5 h-5 text-green-500" />
              Billing
            </Button>
          </Link>
          <Link href="/dashboard/settings">
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
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8">
          <h2 className="font-semibold text-lg">Welcome back, {user.name}</h2>
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-btc hover:bg-btc/90 text-white gap-2">
              <PlusCircle className="w-4 h-4" /> New Series
            </Button>
            <div className="w-8 h-8 rounded-full bg-btc/20 border border-btc/50 flex items-center justify-center text-xs font-bold text-btc">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
