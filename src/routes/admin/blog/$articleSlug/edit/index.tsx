import React, { useEffect } from "react";
import { createFileRoute, Link, useRouter, Navigate } from "@tanstack/react-router";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Header } from "~/components/ui/Header";
import { ArrowLeft, Save, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTRPC } from "~/trpc/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "~/stores/authStore";

export const Route = createFileRoute("/admin/blog/$articleSlug/edit/")({
  component: EditArticlePage,
});

const updateArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required").max(100, "Author must be less than 100 characters"),
  published: z.boolean(),
});

type UpdateArticleForm = z.infer<typeof updateArticleSchema>;

function EditArticlePage() {
  const { articleSlug } = Route.useParams();
  const router = useRouter();
  const trpc = useTRPC();
  const { token, isAuthenticated, logout } = useAuthStore();

  // Form setup
  const form = useForm<UpdateArticleForm>({
    resolver: zodResolver(updateArticleSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
      published: false,
    },
  });

  // Load article data
  const articleQuery = useQuery(trpc.getArticleBySlugAdmin.queryOptions({
    slug: articleSlug,
    authToken: token || 'invalid',
  }, {
    enabled: isAuthenticated && !!token,
  }));

  // Update mutation
  const updateArticleMutation = useMutation(trpc.updateArticle.mutationOptions({
    onSuccess: (data) => {
      toast.success('Article updated successfully!');
      router.navigate({ to: '/blog/$articleSlug', params: { articleSlug: data.article.slug } });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update article');
    },
  }));

  // Reset form when article data loads
  useEffect(() => {
    if (articleQuery.data) {
      form.reset({
        title: articleQuery.data.title,
        content: articleQuery.data.content,
        author: articleQuery.data.author,
        published: articleQuery.data.published,
      });
    }
  }, [articleQuery.data, form]);

  // Event handlers defined after all hooks
  const onSubmit = (data: UpdateArticleForm) => {
    if (!articleQuery.data || !token) return;
    
    updateArticleMutation.mutate({ 
      id: articleQuery.data.id,
      ...data, 
      authToken: token 
    });
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.navigate({ to: '/admin/login' });
  };

  // All conditional returns at the very end
  if (!isAuthenticated || !token) {
    return <Navigate to="/admin/login" />;
  }

  if (articleQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Container className="py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (articleQuery.error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Container className="py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're trying to edit doesn't exist.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Container className="py-8">
        {/* Back to Article */}
        <div className="mb-8 flex justify-between items-center">
          <Link to="/blog/$articleSlug" params={{ articleSlug }}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Article
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
            <p className="mt-2 text-gray-600">
              Make changes to your article
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...form.register('title')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter article title..."
                />
                {form.formState.errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  {...form.register('author')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name..."
                />
                {form.formState.errors.author && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.author.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content (Markdown supported)
                </label>
                <textarea
                  id="content"
                  {...form.register('content')}
                  rows={12}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your article content here... You can use Markdown formatting."
                />
                {form.formState.errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.content.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="published"
                  type="checkbox"
                  {...form.register('published')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                  Published
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <Link to="/blog/$articleSlug" params={{ articleSlug }}>
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button
                  type="submit"
                  disabled={updateArticleMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateArticleMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
