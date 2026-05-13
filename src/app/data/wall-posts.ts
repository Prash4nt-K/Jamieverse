export interface WallPost {
  slug: string;
  author: string;
  mood: string;
  title: string;
  text: string;
  link?: {
    label: string;
    url: string;
    type: 'youtube' | 'audio' | 'video' | 'image' | 'article';
  };
  attachment?: {
    label: string;
    url: string;
    type: 'pdf' | 'text' | 'video' | 'image';
  };
}

export const wallPosts: WallPost[] = [
  {
    slug: 'one-tiny-win-counts',
    author: 'Jamie',
    mood: 'Daily spark',
    title: 'One tiny win counts',
    text: 'Did the thing I was avoiding. Not glamorous, still counts. Today gets a little gold star.',
    link: {
      label: 'Open image',
      url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sample_image_.jpg',
      type: 'image'
    }
  },
  {
    slug: 'song-that-fixed-the-walk',
    author: 'Someone here',
    mood: 'Excited',
    title: 'Found a song that fixed the whole walk',
    text: 'Sometimes the day only needs one good track and a bit of outside air.',
    link: {
      label: 'Play audio',
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      type: 'audio'
    }
  },
  {
    slug: 'tiny-video-moment',
    author: 'Community',
    mood: 'Video drop',
    title: 'A tiny video moment',
    text: 'A short clip, a mood, a little visual proof that today had something in it.',
    attachment: {
      label: 'flower.mp4',
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      type: 'video'
    }
  },
  {
    slug: 'article-i-liked-today',
    author: 'Jamie',
    mood: 'Link share',
    title: 'Article I liked today',
    text: 'Not necessarily grand or curated. Just something that made me pause for a minute.',
    link: {
      label: 'Read article',
      url: 'https://en.wikipedia.org/wiki/Media_literacy',
      type: 'article'
    }
  },
  {
    slug: 'random-text-file',
    author: 'Someone here',
    mood: 'Notebook',
    title: 'A random text file',
    text: 'Sometimes the attachment is the post. This one depicts a text file someone might drop on the Wall.',
    attachment: {
      label: 'alice.txt',
      url: 'https://www.gutenberg.org/ebooks/928.txt.utf-8',
      type: 'text'
    }
  }
];
