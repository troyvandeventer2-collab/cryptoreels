import { getSession } from '@/app/actions/auth';
import { query } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { verifyPayment } from '@/app/actions/admin';
import { Users, CreditCard, DollarSign, CheckCircle2, Clock, ExternalLink } from 'lucide-react';

export default async function AdminDashboard() {
  const admin = await getSession();

  if (!admin || admin.email !== 'owner@cryptoreels.com') {
    redirect('/login');
  }

  const users = await query<any>(`SELECT * FROM users ORDER BY created_at DESC`);
  const pendingPayments = await query<any>(`
    SELECT p.*, u.email as user_email 
    FROM payments p 
    JOIN users u ON p.user_id = u.id 
    WHERE p.status = 'pending' 
    ORDER BY p.created_at ASC
  `);
  
  const totalRevenue = await query<any>(`SELECT SUM(amount_usd) as total FROM payments WHERE status = 'verified'`);
  const revenueAmount = totalRevenue[0]?.total || 0;

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage users and verify crypto payments</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-btc flex items-center justify-center font-bold text-black">
          A
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="w-4 h-4 text-btc" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            <Clock className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-yellow-500" /> Pending Payment Verifications
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>TX Hash</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No pending payments
                  </TableCell>
                </TableRow>
              ) : (
                pendingPayments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.user_email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={payment.currency === 'BTC' ? 'text-btc border-btc/20 bg-btc/5' : 'text-eth border-eth/20 bg-eth/5'}>
                        {payment.currency}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center gap-2">
                        {payment.tx_hash.substring(0, 10)}...
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ExternalLink className="w-3 h-3" /></Button>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <form action={async () => {
                        'use server';
                        await verifyPayment(payment.id);
                      }}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Verify & Upgrade
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Users className="w-5 h-5 text-btc" /> User Management
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Trial End</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u: any) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === 'active' ? 'default' : 'outline'} className={u.status === 'active' ? 'bg-green-600' : ''}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(u.trial_end).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
