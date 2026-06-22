import { query } from './db';

export interface AppSettings {
  free_tier_video_count: number;
  free_tier_video_duration: number;
  trial_duration_days: number;
  paid_tier_video_count: number;
  paid_tier_video_duration: number;
  weekly_price: number;
  btc_address: string;
  eth_address: string;
}

export async function getAppSettings(): Promise<AppSettings> {
  const rows = await query<{ key: string; value: string }>('SELECT * FROM app_settings');
  
  const settings: any = {};
  rows.forEach(row => {
    settings[row.key] = row.value;
  });

  return {
    free_tier_video_count: parseInt(settings.free_tier_video_count ?? '2'),
    free_tier_video_duration: parseInt(settings.free_tier_video_duration ?? '3'),
    trial_duration_days: parseInt(settings.trial_duration_days ?? '7'),
    paid_tier_video_count: parseInt(settings.paid_tier_video_count ?? '5'),
    paid_tier_video_duration: parseInt(settings.paid_tier_video_duration ?? '10'),
    weekly_price: parseFloat(settings.weekly_price ?? '5'),
    btc_address: settings.btc_address ?? 'bc1qs5jhsj3hnkapa9fhnzttupl65t3x00362xgk4a',
    eth_address: settings.eth_address ?? '0xf18224D383F9044BeDB2D308484191565Bc3029a',
  };
}
