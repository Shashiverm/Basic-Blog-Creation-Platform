import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';

interface PostForm {
  title: string;
  content: string;
  summary: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  summary?: string;
}

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<PostForm>({
    title: '',
    content: '',
    summary: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
          const { title, content, summary } = response.data;
          setForm({ title, content, summary });
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setIsFetching(false);
        }
      };

      fetchPost();
    }
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!form.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }
    if (!form.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/posts/${id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/posts', form);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {id ? 'Edit Post' : 'Create New Post'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Enter post title"
            />
            <Input
              label="Summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              error={errors.summary}
              placeholder="Brief summary of your post"
            />
            <TextArea
              label="Content"
              name="content"
              value={form.content}
              onChange={handleChange}
              error={errors.content}
              rows={10}
              placeholder="Write your post content here..."
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
              >
                {id ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEditPost;