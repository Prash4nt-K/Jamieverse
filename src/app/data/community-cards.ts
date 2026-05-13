export interface CommunityCard {
  slug: string;
  title: string;
  format: 'Video' | 'Audio' | 'Image' | 'Article' | 'File' | 'Mixed';
  description: string;
  source: string;
  enteredText?: string;
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

export const communityCards: CommunityCard[] = [
  {
    slug: 'youtube-link-with-context',
    title: 'YouTube link with context',
    format: 'Video',
    description: 'A card can show a YouTube link as an embedded video, while still keeping the contributor note visible below it.',
    source: 'Video link',
    enteredText: 'This is the kind of video someone might share because it explains an idea clearly or gives people a useful perspective.',
    link: {
      label: 'Open on YouTube',
      url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
      type: 'youtube'
    }
  },
  {
    slug: 'audio-link-contribution',
    title: 'Audio link contribution',
    format: 'Audio',
    description: 'Audio links can appear with native playback controls directly inside the card.',
    source: 'Audio link',
    enteredText: 'Useful for short clips, spoken notes, interviews, music snippets, or audio explainers.',
    link: {
      label: 'Open audio',
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      type: 'audio'
    }
  },
  {
    slug: 'image-link-contribution',
    title: 'Image link contribution',
    format: 'Image',
    description: 'Image links render as a visual preview, with any added text kept as the explanation.',
    source: 'Image link',
    enteredText: 'This could be an infographic, screenshot, diagram, quote card, or photo with context.',
    link: {
      label: 'Open image',
      url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sample_image_.jpg',
      type: 'image'
    }
  },
  {
    slug: 'article-link-with-summary',
    title: 'Article link with summary',
    format: 'Article',
    description: 'Article links get a readable preview area and a clear open action instead of being hidden in plain text.',
    source: 'Article link',
    enteredText: 'The contributor can explain why the article matters, who it helps, or what to look for before opening it.',
    link: {
      label: 'Read article',
      url: 'https://en.wikipedia.org/wiki/Media_literacy',
      type: 'article'
    }
  },
  {
    slug: 'attached-pdf-file',
    title: 'Attached PDF file',
    format: 'File',
    description: 'Attached files can be displayed in the card too. A PDF gets a preview pane and a direct open link.',
    source: 'Attached file',
    enteredText: 'This depicts a file attachment coming from the internet rather than a local upload.',
    attachment: {
      label: 'dummy.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      type: 'pdf'
    }
  },
  {
    slug: 'attached-video-file',
    title: 'Attached video file',
    format: 'File',
    description: 'A video uploaded or attached as a file can play directly inside the card.',
    source: 'Attached file',
    enteredText: 'This behaves like a file attachment, not just an external video page.',
    attachment: {
      label: 'flower.mp4',
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      type: 'video'
    }
  },
  {
    slug: 'attached-text-file',
    title: 'Attached text file',
    format: 'File',
    description: 'Text files can be shown in a preview frame and still opened from the attachment link.',
    source: 'Attached file',
    enteredText: 'This shows how a plain text resource could be attached and readable from the card.',
    attachment: {
      label: 'alice.txt',
      url: 'https://www.gutenberg.org/ebooks/928.txt.utf-8',
      type: 'text'
    }
  },
  {
    slug: 'mixed-card-example',
    title: 'Mixed card example',
    format: 'Mixed',
    description: 'One card can carry a playable video link, entered text, and an attached file-style resource together.',
    source: 'Example card',
    enteredText: 'Example entered text: this post combines a video, a note from the contributor, and a plain-text attachment.',
    link: {
      label: 'Open video file',
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      type: 'video'
    },
    attachment: {
      label: 'Alice plain text',
      url: 'https://www.gutenberg.org/ebooks/928.txt.utf-8',
      type: 'text'
    }
  }
];
