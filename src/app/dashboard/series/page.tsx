import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Play, Settings, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SeriesPage() {
  const series = [
    { id: 1, name: 'Reddit Stories', status: 'active', frequency: 'Daily', lastPost: '2 hours ago', views: '1.2k' },
    { id: 2, name: 'Motivational Quotes', status: 'paused', frequency: '2x Daily', lastPost: '1 day ago', views: '450' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">My Series</h2>
          <p className="text-muted-foreground">Manage your automated video series</p>
        </div>
        <Button className="bg-btc hover:bg-btc/90 text-white gap-2">
          <PlusCircle className="w-5 h-5" /> Create New Series
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {series.map((s) => (
          <Card key={s.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">{s.name}</CardTitle>
                <CardDescription>Frequency: {s.frequency}</CardDescription>
              </div>
              <Badge variant={s.status === 'active' ? 'default' : 'secondary'} className={s.status === 'active' ? 'bg-green-600' : ''}>
                {s.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-6">
                <div>
                  <span className="text-muted-foreground block">Last Post</span>
                  <span>{s.lastPost}</span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground block">Total Views</span>
                  <span className="font-bold text-btc">{s.views}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Play className="w-4 h-4" /> Preview
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
