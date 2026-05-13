import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { communityCards } from '../../data/community-cards';

@Component({
  selector: 'app-community-detail',
  imports: [RouterLink],
  templateUrl: './community-detail.html'
})
export class CommunityDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  card = communityCards.find(
    (item) => item.slug === this.route.snapshot.paramMap.get('slug')
  ) ?? communityCards[0];

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
