import { getSession } from '@/app/actions/auth';
import { query } from '@/lib/db';
import { getAppSettings } from '@/lib/settings';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { submitPayment } from '@/app/actions/payments';
import { CreditCard, Copy, ExternalLink, CheckCircle2, Clock } from 'lucide-react';

export default async function BillingPage() {
  const user = await getSession();
  const settings = await getAppSettings();
  const payments = await query<any>(`SELECT * FROM payments WHERE user_id = '${user.id}' ORDER BY created_at DESC`);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold mb-2">Billing & Subscription</h2>
        <p className="text-muted-foreground">Manage your plan and payments</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Get {settings.paid_tier_video_count} videos/day, {settings.paid_tier_video_duration} min max, and no watermarks for just ${settings.weekly_price}/week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="btc" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/50">
                <TabsTrigger value="btc" className="data-[state=active]:bg-btc data-[state=active]:text-white">Bitcoin (BTC)</TabsTrigger>
                <TabsTrigger value="eth" className="data-[state=active]:bg-eth data-[state=active]:text-white">Ethereum (ETH)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="btc" className="space-y-4 pt-4">
                <div className="p-4 rounded-lg bg-black/50 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Amount to send:</span>
                    <span className="font-mono font-bold text-btc">${settings.weekly_price.toFixed(2)} USD in BTC</span>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase">BTC Address</Label>
                    <div className="flex gap-2">
                      <Input readOnly value={settings.btc_address} className="font-mono text-xs bg-black border-white/10" />
                      <Button size="icon" variant="outline" className="shrink-0"><Copy className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
                <form action={submitPayment} className="space-y-4">
                  <input type="hidden" name="currency" value="BTC" />
                  <div className="space-y-2">
                    <Label htmlFor="btc-hash">Transaction Hash (TXID)</Label>
                    <Input id="btc-hash" name="txHash" placeholder="Enter your transaction hash for verification" required className="bg-black/50 border-white/10" />
                  </div>
                  <Button type="submit" className="w-full bg-btc hover:bg-btc/90 text-white">I've Paid - Submit for Verification</Button>
                </form>
              </TabsContent>

              <TabsContent value="eth" className="space-y-4 pt-4">
                <div className="p-4 rounded-lg bg-black/50 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Amount to send:</span>
                    <span className="font-mono font-bold text-eth">${settings.weekly_price.toFixed(2)} USD in ETH</span>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase">ETH Address</Label>
                    <div className="flex gap-2">
                      <Input readOnly value={settings.eth_address} className="font-mono text-xs bg-black border-white/10" />
                      <Button size="icon" variant="outline" className="shrink-0"><Copy className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
                <form action={submitPayment} className="space-y-4">
                  <input type="hidden" name="currency" value="ETH" />
                  <div className="space-y-2">
                    <Label htmlFor="eth-hash">Transaction Hash (TXID)</Label>
                    <Input id="eth-hash" name="txHash" placeholder="Enter your transaction hash for verification" required className="bg-black/50 border-white/10" />
                  </div>
                  <Button type="submit" className="w-full bg-eth hover:bg-eth/90 text-white">I've Paid - Submit for Verification</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="bg-white/5 text-xs text-muted-foreground py-3">
            Manual verification typically takes less than 24 hours.
          </CardFooter>
        </Card>

        <Card className="bg-white/5 border-white/10 h-fit">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-xl font-bold capitalize">{user.status}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-xl font-bold">{user.status === 'trial' ? 'Free' : `$${settings.weekly_price}/week`}</span>
            </div>
            {user.status === 'trial' && (
              <div className="p-3 rounded-lg bg-btc/10 border border-btc/20 text-xs text-btc">
                Your free trial expires on {new Date(user.trial_end).toLocaleDateString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-muted-foreground" /> Payment History
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No payment history found
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={payment.currency === 'BTC' ? 'text-btc border-btc/20 bg-btc/5' : 'text-eth border-eth/20 bg-eth/5'}>
                        {payment.currency}
                      </Badge>
                    </TableCell>
                    <TableCell>${payment.amount_usd.toFixed(2)}</TableCell>
                    <TableCell>
                      {payment.status === 'verified' ? (
                        <div className="flex items-center gap-1 text-green-500">
                          <CheckCircle2 className="w-4 h-4" /> Verified
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Clock className="w-4 h-4" /> Pending
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1 h-8">
                        View <ExternalLink className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
