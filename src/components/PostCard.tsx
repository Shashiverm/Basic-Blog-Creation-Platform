import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    summary: string;
    createdAt: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`}>
      <Card className="h-full transform hover:scale-102 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg border border-gray-100">
        <CardContent className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors duration-300" />
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 relative">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3 relative">
            {post.summary}
          </p>
          
          <div className="flex justify-between items-center relative">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;