import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jukeboxData from '../../data/jukebox.json';

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
  selector: 'app-jukebox',
  templateUrl: './jukebox.html'
})
export class Jukebox {
  private readonly sanitizer = inject(DomSanitizer);

  playlists: JukeboxPlaylist[] = jukeboxData;
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

  selectSong(index: number, event: Event) {
    this.selectedSongIndex = index;

    const dropdown = (event.currentTarget as HTMLElement).closest('details');
    dropdown?.removeAttribute('open');
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
