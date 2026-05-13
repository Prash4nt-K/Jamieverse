import { RenderMode, ServerRoute } from '@angular/ssr';
import { communityCards } from './data/community-cards';
import { wallPosts } from './data/wall-posts';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'community/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => communityCards.map((card) => ({ slug: card.slug }))
  },
  {
    path: 'wall/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => wallPosts.map((post) => ({ slug: post.slug }))
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
