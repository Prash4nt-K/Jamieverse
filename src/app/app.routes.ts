import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jukebox } from './pages/jukebox/jukebox';
import { Lore } from './pages/lore/lore';
import { Signals } from './pages/signals/signals';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lore', component: Lore },
  { path: 'signals', component: Signals },
  { path: 'jukebox', component: Jukebox },
  { path: '**', redirectTo: '' }
];
