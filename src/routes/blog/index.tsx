import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Header } from "~/components/ui/Header";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useTRPC } from "~/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "~/components/SEO";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  const trpc = useTRPC();
  const articlesQuery = useQuery(trpc.getArticles.queryOptions({ limit: 10 }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Mandate Blog",
    "description": "Insights, updates, and best practices for chargeback prevention and subscription commerce",
    "url": "https://mandate.app/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Mandate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mandate.app/logo.png"
      }
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/[#*`]/g, '').trim();
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Blog - Mandate | Chargeback Prevention Insights"
        description="Insights, updates, and best practices for chargeback prevention and subscription commerce. Learn how to reduce disputes, optimize payment flows, and protect your revenue."
        canonical="https://mandate.app/blog"
        keywords="chargeback prevention blog, payment disputes, subscription billing, fraud prevention, dispute management"
        structuredData={structuredData}
      />
      <Header />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <Container>
          <div className="py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Mandate Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Insights, updates, and best practices for chargeback prevention and subscription commerce
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Articles */}
      <Container className="py-12">
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
          <div className="grid gap-8 md:gap-12">
            {articlesQuery.data?.articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4 mr-2" />
                    <span>{article.author}</span>
                    <Calendar className="w-4 h-4 ml-6 mr-2" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    <Link to="/blog/$articleSlug" params={{ articleSlug: article.slug }}>
                      {article.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {getExcerpt(article.content)}
                  </p>
                  
                  <Link to="/blog/$articleSlug" params={{ articleSlug: article.slug }}>
                    <Button variant="outline" size="sm">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}

            {articlesQuery.data?.articles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No articles published yet. Check back soon!</p>
              </div>
            )}
          </div>
        )}

        {/* Admin Link */}
        <div className="mt-12 text-center">
          <Link to="/admin/blog">
            <Button variant="outline">
              Manage Articles
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
