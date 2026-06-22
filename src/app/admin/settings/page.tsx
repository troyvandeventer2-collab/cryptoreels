import { getAppSettings } from '@/lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateAppSettings } from '@/app/actions/settings';
import { Settings as SettingsIcon, Save, Wallet } from 'lucide-react';

export default async function AdminSettingsPage() {
  const settings = await getAppSettings();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Platform Settings</h2>
        <p className="text-muted-foreground">Configure pricing and limits across the platform</p>
      </div>

      <form action={updateAppSettings}>
        <div className="grid gap-6 max-w-4xl">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-btc" /> Free Tier Settings
              </CardTitle>
              <CardDescription>Configure limits for users on the free trial</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="free_tier_video_count">Videos Per Day</Label>
                <Input 
                  id="free_tier_video_count" 
                  name="free_tier_video_count" 
                  type="number" 
                  defaultValue={settings.free_tier_video_count} 
                  className="bg-black/50 border-white/10" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="free_tier_video_duration">Max Video Duration (Minutes)</Label>
                <Input 
                  id="free_tier_video_duration" 
                  name="free_tier_video_duration" 
                  type="number" 
                  defaultValue={settings.free_tier_video_duration} 
                  className="bg-black/50 border-white/10" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trial_duration_days">Trial Duration (Days)</Label>
                <Input 
                  id="trial_duration_days" 
                  name="trial_duration_days" 
                  type="number" 
                  defaultValue={settings.trial_duration_days} 
                  className="bg-black/50 border-white/10" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-eth" /> Paid Tier Settings
              </CardTitle>
              <CardDescription>Configure limits for users with an active Pro subscription</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="paid_tier_video_count">Videos Per Day</Label>
                <Input 
                  id="paid_tier_video_count" 
                  name="paid_tier_video_count" 
                  type="number" 
                  defaultValue={settings.paid_tier_video_count} 
                  className="bg-black/50 border-white/10" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paid_tier_video_duration">Max Video Duration (Minutes)</Label>
                <Input 
                  id="paid_tier_video_duration" 
                  name="paid_tier_video_duration" 
                  type="number" 
                  defaultValue={settings.paid_tier_video_duration} 
                  className="bg-black/50 border-white/10" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekly_price">Weekly Price (USD Equivalent)</Label>
                <Input 
                  id="weekly_price" 
                  name="weekly_price" 
                  type="number" 
                  step="0.01"
                  defaultValue={settings.weekly_price} 
                  className="bg-black/50 border-white/10" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-500" /> Wallet Addresses
              </CardTitle>
              <CardDescription>Owner addresses where payments will be deposited</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="btc_address">Bitcoin (BTC) Address</Label>
                <Input 
                  id="btc_address" 
                  name="btc_address" 
                  type="text" 
                  defaultValue={settings.btc_address} 
                  className="bg-black/50 border-white/10 font-mono" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eth_address">Ethereum (ETH) Address</Label>
                <Input 
                  id="eth_address" 
                  name="eth_address" 
                  type="text" 
                  defaultValue={settings.eth_address} 
                  className="bg-black/50 border-white/10 font-mono" 
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="bg-btc hover:bg-btc/90 text-white gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
