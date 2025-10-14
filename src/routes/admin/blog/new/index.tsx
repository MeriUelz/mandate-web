import { createFileRoute, Link, useRouter, Navigate } from "@tanstack/react-router";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Header } from "~/components/ui/Header";
import { ArrowLeft, Plus, Download, LogOut } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTRPC } from "~/trpc/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "~/stores/authStore";
import { MediumScrapingTest } from "~/components/admin/MediumScrapingTest";

export const Route = createFileRoute("/admin/blog/new/")({
  component: NewArticlePage,
});

const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required").max(100, "Author must be less than 100 characters"),
  published: z.boolean(),
});

const uploadMediumSchema = z.object({
  mediumUrl: z.string().url("Please enter a valid URL"),
  published: z.boolean(),
});

type CreateArticleForm = z.infer<typeof createArticleSchema>;
type UploadMediumForm = z.infer<typeof uploadMediumSchema>;

function NewArticlePage() {
  const [activeTab, setActiveTab] = useState<'create' | 'upload'>('create');
  const router = useRouter();
  const trpc = useTRPC();
  const { token, isAuthenticated, logout } = useAuthStore();

  // Redirect if not authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/admin/login" />;
  }

  // Create Article Form
  const createForm = useForm<CreateArticleForm>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
      published: false,
    },
  });

  // Upload Medium Article Form
  const uploadForm = useForm<UploadMediumForm>({
    resolver: zodResolver(uploadMediumSchema),
    defaultValues: {
      mediumUrl: '',
      published: false,
    },
  });

  // Mutations
  const createArticleMutation = useMutation(trpc.createArticle.mutationOptions({
    onSuccess: (data) => {
      toast.success('Article created successfully!');
      router.navigate({ to: '/blog/$articleSlug', params: { articleSlug: data.article.slug } });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create article');
    },
  }));

  const uploadMediumMutation = useMutation(trpc.uploadMediumArticle.mutationOptions({
    onSuccess: (data) => {
      toast.success('Article imported from Medium successfully!');
      router.navigate({ to: '/blog/$articleSlug', params: { articleSlug: data.article.slug } });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to import article from Medium');
    },
  }));

  const onCreateSubmit = (data: CreateArticleForm) => {
    createArticleMutation.mutate({ ...data, authToken: token });
  };

  const onUploadSubmit = (data: UploadMediumForm) => {
    uploadMediumMutation.mutate({ ...data, authToken: token });
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.navigate({ to: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Container className="py-8">
        {/* Back to Blog */}
        <div className="mb-8 flex justify-between items-center">
          <Link to="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Medium Scraping Diagnostics */}
        <div className="mb-8">
          <MediumScrapingTest />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Publish New Article</h1>
            <p className="mt-2 text-gray-600">
              Create a new article or import one from Medium
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'create'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Plus className="w-4 h-4 mr-2 inline-block" />
                Create Article
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Download className="w-4 h-4 mr-2 inline-block" />
                Import from Medium
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'create' ? (
              <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...createForm.register('title')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter article title..."
                  />
                  {createForm.formState.errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {createForm.formState.errors.title.message}
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
                    {...createForm.register('author')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter author name..."
                  />
                  {createForm.formState.errors.author && (
                    <p className="mt-1 text-sm text-red-600">
                      {createForm.formState.errors.author.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content (Markdown supported)
                  </label>
                  <textarea
                    id="content"
                    {...createForm.register('content')}
                    rows={12}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your article content here... You can use Markdown formatting."
                  />
                  {createForm.formState.errors.content && (
                    <p className="mt-1 text-sm text-red-600">
                      {createForm.formState.errors.content.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="published"
                    type="checkbox"
                    {...createForm.register('published')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Link to="/blog">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={createArticleMutation.isPending}
                  >
                    {createArticleMutation.isPending ? 'Creating...' : 'Create Article'}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={uploadForm.handleSubmit(onUploadSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="mediumUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Medium Article URL
                  </label>
                  <input
                    id="mediumUrl"
                    type="url"
                    {...uploadForm.register('mediumUrl')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://medium.com/@author/article-title-123456"
                  />
                  {uploadForm.formState.errors.mediumUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {uploadForm.formState.errors.mediumUrl.message}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Enter the full URL of the Medium article you want to import
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    id="published-upload"
                    type="checkbox"
                    {...uploadForm.register('published')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published-upload" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Link to="/blog">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={uploadMediumMutation.isPending}
                  >
                    {uploadMediumMutation.isPending ? 'Importing...' : 'Import from Medium'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
