import { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated Instagram feed data
  useEffect(() => {
    // In a real implementation, this would fetch from Instagram API
    const mockPosts: InstagramPost[] = [
      {
        id: '1',
        imageUrl: '/portfolio_filmstrip_01.jpg',
        likes: 1247,
        comments: 89,
        caption: 'New tasting menu preview',
      },
      {
        id: '2',
        imageUrl: '/portfolio_filmstrip_02.jpg',
        likes: 2156,
        comments: 142,
        caption: 'Dessert artistry',
      },
      {
        id: '3',
        imageUrl: '/portfolio_filmstrip_03.jpg',
        likes: 892,
        comments: 56,
        caption: 'Morning prep',
      },
      {
        id: '4',
        imageUrl: '/hero_chef_plating.jpg',
        likes: 3421,
        comments: 231,
        caption: 'Behind the scenes',
      },
      {
        id: '5',
        imageUrl: '/book_stack_02.jpg',
        likes: 678,
        comments: 45,
        caption: 'Weekend reading',
      },
      {
        id: '6',
        imageUrl: '/fitness_gym.jpg',
        likes: 1543,
        comments: 98,
        caption: 'Training day',
      },
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-neon/30 border-t-neon rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Instagram size={24} className="text-neon" />
          <div>
            <h3 className="font-heading font-bold text-text-primary">@mosematic</h3>
            <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
              Latest from the kitchen
            </p>
          </div>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-sm py-2 px-4"
        >
          Follow
        </a>
      </div>

      <div className="instagram-grid">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`https://instagram.com/p/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-item relative group"
          >
            <img src={post.imageUrl} alt={post.caption} />
            <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <span className="flex items-center gap-1 text-text-primary">
                <Heart size={16} className="fill-current" />
                {formatNumber(post.likes)}
              </span>
              <span className="flex items-center gap-1 text-text-primary">
                <MessageCircle size={16} className="fill-current" />
                {formatNumber(post.comments)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
