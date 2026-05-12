import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface JukeboxSong {
  title: string;
  artist: string;
  youtubeUrl: string;
}

interface JukeboxPlaylist {
  name: string;
  songs: JukeboxSong[];
}

@Component({
  selector: 'app-signals',
  templateUrl: './signals.html'
})
export class Signals implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  playlists: JukeboxPlaylist[] = [];
  selectedPlaylistIndex = 0;
  selectedSongIndex = 0;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      void this.loadJukebox();
    });
  }

  private async loadJukebox() {
    try {
      const response = await fetch('/data/jukebox.json');
      const playlists = (await response.json()) as JukeboxPlaylist[];

      if (Array.isArray(playlists) && playlists.length) {
        this.playlists = playlists;
        this.selectedPlaylistIndex = 0;
        this.selectedSongIndex = 0;
      }
    } catch {
      this.playlists = [];
    } finally {
      this.changeDetectorRef.detectChanges();
    }
  }

  get selectedPlaylist() {
    return this.playlists[this.selectedPlaylistIndex] ?? { name: '', songs: [] };
  }

  get selectedSong() {
    return this.selectedPlaylist?.songs[this.selectedSongIndex];
  }

  get currentEmbedUrl(): SafeResourceUrl | null {
    const youtubeIds = this.selectedPlaylist?.songs
      .map((song) => this.getYouTubeId(song.youtubeUrl))
      .filter(Boolean);

    if (!youtubeIds?.length) {
      return null;
    }

    const selectedVideoId = this.getYouTubeId(this.selectedSong?.youtubeUrl) || youtubeIds[0];
    const playlist = youtubeIds.join(',');

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${selectedVideoId}?playlist=${playlist}&loop=1&autoplay=1`
    );
  }

  selectPlaylist(index: number) {
    this.selectedPlaylistIndex = index;
    this.selectedSongIndex = 0;
  }

  playPreviousSong() {
    const songCount = this.selectedPlaylist?.songs.length ?? 0;

    if (!songCount) {
      return;
    }

    this.selectedSongIndex = (this.selectedSongIndex - 1 + songCount) % songCount;
  }

  playNextSong() {
    const songCount = this.selectedPlaylist?.songs.length ?? 0;

    if (!songCount) {
      return;
    }

    this.selectedSongIndex = (this.selectedSongIndex + 1) % songCount;
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
