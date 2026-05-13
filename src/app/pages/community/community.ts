import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { communityCards } from '../../data/community-cards';

@Component({
  selector: 'app-community',
  imports: [RouterLink],
  templateUrl: './community.html'
})
export class Community {
  private readonly sanitizer = inject(DomSanitizer);

  communityCards = communityCards;

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
