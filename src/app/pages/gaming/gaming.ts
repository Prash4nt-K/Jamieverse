import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import gamingVideosData from '../../data/gaming-videos.json';

interface GamingVideo {
  title: string;
  game: string;
  description: string;
  youtubeUrl: string;
  embedBlocked?: boolean;
}

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.html'
})
export class Gaming {
  private readonly sanitizer = inject(DomSanitizer);

  videos: GamingVideo[] = gamingVideosData;

  getVideoEmbedUrl(youtubeUrl: string): SafeResourceUrl | null {
    const youtubeId = this.getYouTubeId(youtubeUrl);

    if (!youtubeId) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${youtubeId}`
    );
  }

  getVideoThumbnailUrl(youtubeUrl: string) {
    const youtubeId = this.getYouTubeId(youtubeUrl);

    if (!youtubeId) {
      return '';
    }

    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  getVideoThumbnailBackground(youtubeUrl: string) {
    const thumbnailUrl = this.getVideoThumbnailUrl(youtubeUrl);

    if (!thumbnailUrl) {
      return '';
    }

    return `url("${thumbnailUrl}")`;
  }

  private getYouTubeId(url?: string) {
    if (!url) {
      return '';
    }

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes('youtu.be')) {
        return parsedUrl.pathname.replace('/', '');
      }

      if (parsedUrl.pathname.includes('/embed/')) {
        return parsedUrl.pathname.split('/embed/')[1];
      }

      if (parsedUrl.pathname.includes('/shorts/')) {
        return parsedUrl.pathname.split('/shorts/')[1];
      }

      return parsedUrl.searchParams.get('v') ?? '';
    } catch {
      return url;
    }
  }
}
