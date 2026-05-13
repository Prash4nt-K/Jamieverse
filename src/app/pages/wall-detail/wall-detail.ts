import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { wallPosts } from '../../data/wall-posts';

@Component({
  selector: 'app-wall-detail',
  imports: [RouterLink],
  templateUrl: './wall-detail.html'
})
export class WallDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  post = wallPosts.find(
    (item) => item.slug === this.route.snapshot.paramMap.get('slug')
  ) ?? wallPosts[0];

  getYouTubeEmbedUrl(url: string): SafeResourceUrl {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.searchParams.get('v') ?? '';

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  getSafeResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
