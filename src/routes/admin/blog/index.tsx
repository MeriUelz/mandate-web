import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Header } from "~/components/ui/Header";
import { Calendar, User, Edit, Plus, LogOut, Eye, EyeOff } from "lucide-react";
import { useTRPC } from "~/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "~/stores/authStore";
import toast from "react-hot-toast";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blog/")({
  component: AdminBlogIndex,
});

function AdminBlogIndex() {
  const trpc = useTRPC();
  const router = useRouter();
  const { token, isAuthenticated, logout } = useAuthStore();

  // Redirect if not authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/admin/login" />;
  }

  const articlesQuery = useQuery(trpc.getArticlesAdmin.queryOptions({ 
    limit: 20,
    authToken: token 
  }));

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 100) => {
    const plainText = content.replace(/[#*`]/g, '').trim();
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.navigate({ to: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <Container>
          <div className="py-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Article Management
                </h1>
                <p className="text-lg text-gray-600">
                  Manage all your blog articles
                </p>
              </div>
              <div className="flex space-x-4">
                <Link to="/admin/blog/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Article
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Articles */}
      <Container className="py-8">
        {articlesQuery.isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        ) : articlesQuery.error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load articles. Please try again later.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {articlesQuery.data?.articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No articles created yet.</p>
                <Link to="/admin/blog/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Article
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articlesQuery.data?.articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {getExcerpt(article.content)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="w-4 h-4 mr-2" />
                            {article.author}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.published ? (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                Published
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 mr-1" />
                                Draft
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(article.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link to="/admin/blog/$articleSlug/edit" params={{ articleSlug: article.slug }}>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </Link>
                            {article.published && (
                              <Link to="/blog/$articleSlug" params={{ articleSlug: article.slug }}>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <Link to="/blog">
            <Button variant="outline">
              View Public Blog
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
