import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Gaming } from './pages/gaming/gaming';
import { Lore } from './pages/lore/lore';
import { Signals } from './pages/signals/signals';
import { Vault } from './pages/vault/vault';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lore', component: Lore },
  { path: 'signals', component: Signals },
  { path: 'gaming', component: Gaming },
  { path: 'vault', component: Vault },
  { path: '**', redirectTo: '' }
];
