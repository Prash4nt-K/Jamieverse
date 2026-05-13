import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Gaming } from './pages/gaming/gaming';
import { Community } from './pages/community/community';
import { CommunityDetail } from './pages/community-detail/community-detail';
import { Lore } from './pages/lore/lore';
import { Signals } from './pages/signals/signals';
import { Vault } from './pages/vault/vault';
import { Wall } from './pages/wall/wall';
import { WallDetail } from './pages/wall-detail/wall-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lore', component: Lore },
  { path: 'signals', component: Signals },
  { path: 'gaming', component: Gaming },
  { path: 'community', component: Community },
  { path: 'community/:slug', component: CommunityDetail },
  { path: 'wall', component: Wall },
  { path: 'wall/:slug', component: WallDetail },
  { path: 'vault', component: Vault },
  { path: '**', redirectTo: '' }
];
