import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import readsData from '../../data/reads.json';
import footballVideosData from '../../data/football-videos.json';
import usefulVideosData from '../../data/useful-videos.json';

interface ReadLink {
  title: string;
  source: string;
  description: string;
  url: string;
}

interface VideoLink {
  title: string;
  source: string;
  description: string;
  youtubeUrl: string;
  embedBlocked?: boolean;
}

@Component({
  selector: 'app-signals',
  templateUrl: './signals.html'
})
export class Signals {
  private readonly sanitizer = inject(DomSanitizer);

  reads: ReadLink[] = readsData;
  usefulVideos: VideoLink[] = usefulVideosData;
  footballVideos: VideoLink[] = footballVideosData;

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

      return parsedUrl.searchParams.get('v') ?? '';
    } catch {
      return url;
    }
  }
}
