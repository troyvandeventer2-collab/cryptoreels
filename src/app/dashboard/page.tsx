import { getSession } from '@/app/actions/auth';
import { query } from '@/lib/db';
import { getAppSettings } from '@/lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Video, Zap, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const user = await getSession();
  const settings = await getAppSettings();
  
  // Mock data for video count
  const today = new Date().toISOString().split('T')[0];
  const videoStats = await query<any>(`SELECT count FROM videos WHERE user_id = '${user.id}' AND date = '${today}'`);
  const videosGeneratedToday = videoStats.length > 0 ? videoStats[0].count : 0;
  
  const dailyLimit = user.status === 'trial' ? settings.free_tier_video_count : settings.paid_tier_video_count;
  const progress = (videosGeneratedToday / dailyLimit) * 100;
  
  const trialEnd = new Date(user.trial_end);
  const now = new Date();
  const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 3600 * 24));

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              Subscription Status
              {user.status === 'trial' ? (
                <Badge variant="outline" className="bg-btc/10 text-btc border-btc/20">Trial</Badge>
              ) : (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Pro</Badge>
              )}
            </CardDescription>
            <CardTitle className="text-2xl font-bold">
              {user.status === 'trial' ? `${daysLeft} Days Left` : 'Active'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.status === 'trial' ? (
              <Link href="/dashboard/billing">
                <Button size="sm" className="w-full mt-2 bg-btc hover:bg-btc/90 text-white">Upgrade to Pro</Button>
              </Link>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">Next payment in 5 days</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              Videos Today
              <Video className="w-4 h-4 text-eth" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">
              {videosGeneratedToday} / {dailyLimit}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2 mt-2 bg-white/10" />
            <p className="text-xs text-muted-foreground mt-2">Resets in 14 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              Total Views (30d)
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">12,450</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-green-500 mt-2 font-medium">
              <Zap className="w-3 h-3 fill-current" /> +12% from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-btc" /> Recent Generations
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-muted-foreground/20" />
            </div>
            <h4 className="font-semibold text-lg">No videos generated yet</h4>
            <p className="text-muted-foreground max-w-xs mx-auto mt-1 mb-6">
              Create your first series to start generating AI faceless videos automatically.
            </p>
            <Button className="bg-btc hover:bg-btc/90 text-white">Create Your First Series</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
