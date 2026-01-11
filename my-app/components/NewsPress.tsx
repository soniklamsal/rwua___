'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { Home } from 'lucide-react';
import TopSearch from './TopSearch';

// GraphQL query to fetch WordPress posts - using the same structure as the working single post
const GET_POSTS = gql`
  query GetPosts {
    posts(first: 20, where: { 
      orderby: { field: DATE, order: DESC },
      status: PUBLISH
    }) {
      nodes {
        id
        title
        excerpt
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

// Type definitions for our transformed article
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  image: string;
  category: string;
  author: string;
}

export default function NewsPressPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch posts from WordPress using Apollo Client (works with Faust.js)
  const { loading, error, data } = useQuery(GET_POSTS, {
    errorPolicy: 'all',
  });

  // Transform WordPress posts to match the expected format
  const newsArticles = useMemo(() => {
    if (!data?.posts?.nodes) return [];

    // Debug: Log the raw WordPress data
    console.log('🔍 Raw WordPress posts data:', data.posts.nodes);
    console.log('📊 Number of posts received:', data.posts.nodes.length);

    return data.posts.nodes.map((post: any, index: number) => {
      console.log(`\n📝 Processing post ${index + 1}: "${post.title}"`);

      // Debug: Log each post's featured image data
      console.log(`🖼️ Featured image data for "${post.title}":`, post.featuredImage);

      // Use the same simple approach as the working single post page
      let imageUrl = '';

      if (post.featuredImage?.node?.sourceUrl) {
        imageUrl = post.featuredImage.node.sourceUrl;
        console.log(`✅ Found featured image for "${post.title}":`, imageUrl);
      } else {
        console.log(`❌ No featured image found for "${post.title}"`);
      }

      return {
        id: post.slug, // Use slug as ID for routing
        title: post.title,
        excerpt: post.excerpt?.replace(/<[^>]*>/g, '') || '', // Strip HTML tags
        content: post.content || '',
        date: post.date,
        slug: post.slug,
        image: imageUrl,
        category: post.categories?.nodes?.[0]?.name || 'News',
        author: post.author?.node?.name || 'RWUA Team'
      };
    });
  }, [data]);

  // Filter news based on search query
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      return newsArticles;
    }

    const query = searchQuery.toLowerCase();
    return newsArticles.filter((news: NewsArticle) =>
      news.title.toLowerCase().includes(query) ||
      news.excerpt.toLowerCase().includes(query) ||
      news.category.toLowerCase().includes(query)
    );
  }, [searchQuery, newsArticles]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-screen-lg mx-auto px-4 pt-32">
          <div className="animate-pulse">
            <div className="h-8 bg-stone-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="h-32 bg-stone-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-stone-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-stone-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-screen-lg mx-auto px-4 pt-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading News</h2>
            <p className="text-gray-600 mb-8">There was an error loading news from WordPress via Faust.js.</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <p className="text-red-700 text-sm">{error.message || 'Unknown error occurred'}</p>
              <details className="mt-2 text-xs text-red-600">
                <summary className="cursor-pointer">Debug Info</summary>
                <div className="mt-2 text-left">
                  <p><strong>WordPress URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}</p>
                  <p><strong>GraphQL Endpoint:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql</p>
                  <p><strong>Using:</strong> Faust.js + Apollo Client</p>
                </div>
              </details>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/wp-status" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Check WordPress Status
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get featured article
  const featuredArticle = filteredNews[0];

  // Get other articles (excluding featured)
  const otherArticles = filteredNews.filter((news: NewsArticle) => news.id !== featuredArticle?.id);
  const subMainPosts = otherArticles.slice(0, 2);
  const latestNews = otherArticles.slice(0, 3);
  const popularNews = otherArticles.slice(3, 6);

  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#ffffff'
    }}>
      {/* Breadcrumb Section */}
      <section className="py-4 px-0 pt-[15px]" style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-end">
            <nav className="flex items-center text-sm text-gray-600 font-sans">
              <Link href="/" className="hover:text-purple-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />
                मुख्य पृष्ठ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-600 font-medium">News & Press</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-screen-lg mx-auto px-4">
        {/* Search Section */}
        <TopSearch onSearch={setSearchQuery} />

        <main className="mt-12">
          {/* Show search results count */}
          {searchQuery && (
            <div className="mb-6 text-gray-600">
              <p className="text-sm">
                Showing {filteredNews.length} result{filteredNews.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </div>
          )}

          {/* No results message */}
          {searchQuery && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
            </div>
          )}

          {/* No posts message */}
          {!loading && filteredNews.length === 0 && !searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles available</p>
              <p className="text-gray-400 text-sm mt-2">Please check back later for updates</p>
            </div>
          )}

          {/* Featured Section */}
          {featuredArticle && (
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-6 mb-16">
              {/* Main Post */}
              <div className="mb-4 lg:mb-0 p-4 lg:p-0 w-full md:w-4/7 relative rounded block cursor-pointer">
                {featuredArticle.image && (
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="rounded-md object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
                  />
                )}
                {!featuredArticle.image && (
                  <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
                <span className="text-green-700 text-sm hidden md:block mt-4">{featuredArticle.category}</span>
                <h1 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight cursor-pointer hover:text-deep-purple transition-colors duration-200">
                  <Link href={`/post/${encodeURIComponent(featuredArticle.slug)}`} className="hover:text-deep-purple transition-colors duration-200">
                    {featuredArticle.title}
                  </Link>
                </h1>
                <p className="text-gray-600 mb-4">
                  {featuredArticle.excerpt}
                </p>
                <Link href={`/post/${encodeURIComponent(featuredArticle.slug)}`} className="inline-flex items-center text-deep-purple hover:text-white font-semibold text-sm mt-4 transition-all duration-300 hover:bg-deep-purple px-3 py-1.5 rounded-full border border-deep-purple/20 hover:border-deep-purple group hover:shadow-md">
                  Read more
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Sub-main Posts */}
              <div className="w-full md:w-4/7">
                <div className="grid grid-cols-1 gap-4">
                  {subMainPosts.map((post: NewsArticle, index: number) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="text-white text-sm">No image</p>
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                          {post.excerpt.length > 80 ? post.excerpt.substring(0, 80) + '...' : post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                          </div>
                          <Link
                            href={`/post/${encodeURIComponent(post.slug)}`}
                            className="inline-flex items-center text-deep-purple hover:text-white text-sm font-medium transition-all duration-300 hover:bg-deep-purple px-3 py-1.5 rounded-full border border-deep-purple/20 hover:border-deep-purple group hover:shadow-md cursor-pointer"
                          >
                            <span>Read More</span>
                            <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Latest News Section */}
          {latestNews.length > 0 && (
            <>
              <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
                <h2 className="font-bold text-3xl text-gray-800 cursor-pointer hover:text-deep-purple transition-colors duration-200">
                  Latest News
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestNews.map((news: NewsArticle, index: number) => (
                  <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                      {news.image ? (
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-white text-sm">No image</p>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {news.excerpt.length > 80 ? news.excerpt.substring(0, 80) + '...' : news.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{news.date ? new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                        </div>
                        <Link
                          href={`/post/${news.slug}`}
                          className="inline-flex items-center text-deep-purple hover:text-white text-sm font-medium transition-all duration-300 hover:bg-deep-purple px-3 py-1.5 rounded-full border border-deep-purple/20 hover:border-deep-purple group hover:shadow-md cursor-pointer"
                        >
                          <span>Read More</span>
                          <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Newsletter Subscribe Section */}
          <div className="rounded-lg flex md:shadow-lg mt-12 border border-gray-100 overflow-hidden" style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src="https://rwua.com.np/wp-content/uploads/2021/10/1.jpg"
              alt="Newsletter"
              className="w-0 md:w-1/4 object-cover"
            />
            <div className="px-6 py-6 flex-1">
              <h3 className="text-3xl text-gray-800 font-bold mb-2">समाचार सदस्यता लिनुहोस्</h3>
              <p className="text-lg text-gray-600 mb-6">
                हामी हरेक हप्ता नवीनतम समाचार र पोस्टहरू पठाउँछौं
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  className="flex-1 rounded-lg bg-gray-50 px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:bg-white focus:ring-indigo-200 focus:border-indigo-400 text-gray-900"
                  placeholder="your@email.com"
                />
                <button className="inline-flex items-center text-deep-purple hover:text-white font-semibold text-sm transition-all duration-300 group bg-transparent border-2 border-deep-purple hover:border-deep-purple hover:bg-deep-purple rounded-lg py-2 px-4">
                  Subscribe
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
              <p className="text-green-700 opacity-70 text-sm mt-3">No spam. We promise</p>
            </div>
          </div>

          {/* Popular News Section */}
          {popularNews.length > 0 && (
            <>
              <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
                <h2 className="font-bold text-3xl text-gray-800 cursor-pointer hover:text-deep-purple transition-colors duration-200">
                  Popular News
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularNews.map((news: NewsArticle, index: number) => (
                  <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                      {news.image ? (
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-white text-sm">No image</p>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {news.excerpt.length > 80 ? news.excerpt.substring(0, 80) + '...' : news.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{news.date ? new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                        </div>
                        <Link
                          href={`/post/${news.slug}`}
                          className="inline-flex items-center text-deep-purple hover:text-white text-sm font-medium transition-all duration-300 hover:bg-deep-purple px-3 py-1.5 rounded-full border border-deep-purple/20 hover:border-deep-purple group hover:shadow-md cursor-pointer"
                        >
                          <span>Read More</span>
                          <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      <div className="pb-24"></div>
    </div>
  );
}