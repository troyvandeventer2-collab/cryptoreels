'use server';

import { query } from '@/lib/db';
import { getSession } from './auth';
import { revalidatePath } from 'next/cache';

export async function updateAppSettings(formData: FormData) {
  const user = await getSession();
  if (!user || user.email !== 'owner@cryptoreels.com') return;

  const free_tier_video_count = formData.get('free_tier_video_count') as string;
  const free_tier_video_duration = formData.get('free_tier_video_duration') as string;
  const trial_duration_days = formData.get('trial_duration_days') as string;
  const paid_tier_video_count = formData.get('paid_tier_video_count') as string;
  const paid_tier_video_duration = formData.get('paid_tier_video_duration') as string;
  const weekly_price = formData.get('weekly_price') as string;
  const btc_address = formData.get('btc_address') as string;
  const eth_address = formData.get('eth_address') as string;

  const updates = [
    { key: 'free_tier_video_count', value: free_tier_video_count },
    { key: 'free_tier_video_duration', value: free_tier_video_duration },
    { key: 'trial_duration_days', value: trial_duration_days },
    { key: 'paid_tier_video_count', value: paid_tier_video_count },
    { key: 'paid_tier_video_duration', value: paid_tier_video_duration },
    { key: 'weekly_price', value: weekly_price },
    { key: 'btc_address', value: btc_address },
    { key: 'eth_address', value: eth_address },
  ];

  for (const update of updates) {
    if (update.value !== null) {
      await query(`INSERT INTO app_settings (key, value) VALUES ('${update.key}', '${update.value}')
                   ON CONFLICT(key) DO UPDATE SET value = excluded.value`);
    }
  }

  revalidatePath('/admin/settings');
  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/billing');
}
