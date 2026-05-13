import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { wallPosts } from '../../data/wall-posts';

@Component({
  selector: 'app-wall',
  imports: [RouterLink],
  templateUrl: './wall.html'
})
export class Wall {
  private readonly sanitizer = inject(DomSanitizer);

  postIdeas = [
    'Daily motivation',
    'Small win',
    'Photo moment',
    'Something exciting',
    'Random thought',
    'Today I learned'
  ];

  posts = wallPosts;

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
