import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jukeboxData from '../../data/jukebox.json';
import readsData from '../../data/reads.json';
import footballVideosData from '../../data/football-videos.json';
import usefulVideosData from '../../data/useful-videos.json';

interface JukeboxSong {
  title: string;
  artist: string;
  youtubeUrl: string;
}

interface JukeboxPlaylist {
  name: string;
  songs: JukeboxSong[];
}

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

  playlists: JukeboxPlaylist[] = jukeboxData;
  reads: ReadLink[] = readsData;
  usefulVideos: VideoLink[] = usefulVideosData;
  footballVideos: VideoLink[] = footballVideosData;
  selectedPlaylistIndex = 0;
  selectedSongIndex = 0;

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
