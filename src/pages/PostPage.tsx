import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import DeletePostDialog from '../components/DeletePostDialog';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError('Failed to load post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Post not found'}</p>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex space-x-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
          <time className="text-gray-600 mt-2 block">
            {format(new Date(post.createdAt), 'MMMM d, yyyy')}
          </time>
        </CardHeader>
        
        <CardContent>
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Back to Posts
          </Button>
        </CardFooter>
      </Card>

      <DeletePostDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={post.title}
      />
    </>
  );
};

export default PostPage;