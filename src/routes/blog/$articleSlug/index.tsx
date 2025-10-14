import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "~/components/ui/Container";
import { Header } from "~/components/ui/Header";
import { Button } from "~/components/ui/Button";
import { Calendar, User, ArrowLeft, ExternalLink, Edit } from "lucide-react";
import { useTRPC } from "~/trpc/react";
import { useQuery } from "@tanstack/react-query";
import Markdown from "markdown-to-jsx";
import { useAuthStore } from "~/stores/authStore";
import { SEO } from "~/components/SEO";

export const Route = createFileRoute("/blog/$articleSlug/")({
  component: ArticlePage,
});

function ArticlePage() {
  const { articleSlug } = Route.useParams();
  const trpc = useTRPC();
  const { isAuthenticated } = useAuthStore();
  const articleQuery = useQuery(trpc.getArticleBySlug.queryOptions({ slug: articleSlug }));

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (articleQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Container className="py-12">
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
        <Container className="py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
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

  const article = articleQuery.data;
  if (!article) return null;

  // Generate excerpt for meta description
  const getExcerpt = (content: string, maxLength: number = 160) => {
    const plainText = content.replace(/[#*`\[\]()]/g, '').trim();
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": getExcerpt(article.content),
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mandate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mandate.app/logo.png"
      }
    },
    "datePublished": article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date(article.createdAt).toISOString(),
    "dateModified": new Date(article.createdAt).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mandate.app/blog/${article.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${article.title} - Mandate Blog`}
        description={getExcerpt(article.content)}
        canonical={`https://mandate.app/blog/${article.slug}`}
        ogType="article"
        articlePublishedTime={article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date(article.createdAt).toISOString()}
        articleModifiedTime={new Date(article.createdAt).toISOString()}
        articleAuthor={article.author}
        keywords="chargeback prevention, payment disputes, subscription billing"
        structuredData={articleStructuredData}
      />
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
          {isAuthenticated && (
            <Link to="/admin/blog/$articleSlug/edit" params={{ articleSlug }}>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Article
              </Button>
            </Link>
          )}
        </div>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="w-4 h-4 mr-2" />
                <span>{article.author}</span>
                <Calendar className="w-4 h-4 ml-6 mr-2" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>

              {article.mediumUrl && (
                <div className="flex items-center text-sm text-blue-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <a 
                    href={article.mediumUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Originally published on Medium
                  </a>
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900">
              <Markdown>{article.content}</Markdown>
            </div>
          </div>
        </article>

        {/* Back to Blog (bottom) */}
        <div className="mt-12 text-center">
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
