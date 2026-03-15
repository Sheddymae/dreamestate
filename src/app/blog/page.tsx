import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Real Estate Insights',
  description: 'Property market insights, buying guides, and real estate tips for Kenya.',
}

const POSTS = [
  {
    slug: 'buying-first-home-nairobi',
    category: 'Buying Guide',
    title: 'The Complete Guide to Buying Your First Home in Nairobi',
    excerpt: 'Everything you need to know — from budgeting and mortgage options to choosing the right neighbourhood and closing the deal.',
    date: 'March 10, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  },
  {
    slug: 'best-neighbourhoods-nairobi-2026',
    category: 'Market Insights',
    title: 'The 10 Best Neighbourhoods to Live in Nairobi in 2026',
    excerpt: 'From the leafy Karen suburbs to the buzzing Westlands district — we rank Nairobi\'s top neighbourhoods by lifestyle, value, and growth.',
    date: 'March 5, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
  },
  {
    slug: 'rental-investment-guide-kenya',
    category: 'Investment',
    title: 'How to Build a Rental Property Portfolio in Kenya',
    excerpt: 'A practical guide to getting started with rental property investment — financing, property selection, tenant management, and returns.',
    date: 'February 28, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800',
  },
  {
    slug: 'tenant-rights-kenya',
    category: 'Legal',
    title: 'Know Your Rights as a Tenant in Kenya',
    excerpt: 'A clear breakdown of the Landlord and Tenant (Shops, Hotels and Catering Establishments) Act and what it means for renters.',
    date: 'February 20, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
  },
  {
    slug: 'property-prices-kenya-2026',
    category: 'Market Insights',
    title: 'Kenya Property Market Report: Q1 2026',
    excerpt: 'Prices, trends, and forecasts for residential and commercial real estate across Nairobi, Mombasa, Kisumu, and Nakuru.',
    date: 'February 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
  },
  {
    slug: 'home-staging-tips',
    category: 'Selling Tips',
    title: '10 Home Staging Tips That Help Properties Sell Faster',
    excerpt: 'Simple, cost-effective changes that make your property more attractive to buyers and help you achieve a better selling price.',
    date: 'February 8, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
  },
]

const CATEGORIES = ['All', 'Buying Guide', 'Market Insights', 'Investment', 'Legal', 'Selling Tips']

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <section className="pt-32 pb-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="badge badge-teal mb-6 inline-block">Real Estate Insights</span>
          <h1 className="section-title mb-4">
            The DreamEstate <span className="text-gradient">Blog</span>
          </h1>
          <p className="section-subtitle">
            Property market insights, buying guides, investment tips, and real estate news
            for Kenya.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="pb-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all
                ${cat === 'All'
                  ? 'bg-brand-coral text-white'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Featured post */}
          <div className="card rounded-2xl overflow-hidden mb-8 group">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={POSTS[0].image} alt={POSTS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="badge badge-coral mb-4 self-start">{POSTS[0].category}</span>
                <h2 className="font-display text-2xl font-bold text-white mb-3 leading-snug">
                  {POSTS[0].title}
                </h2>
                <p className="font-body text-sm text-white/50 mb-6 leading-relaxed">{POSTS[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white/30 text-xs font-body">
                    <span>{POSTS[0].date}</span>
                    <span>·</span>
                    <Clock size={11} />
                    <span>{POSTS[0].readTime}</span>
                  </div>
                  <Link href={`/blog/${POSTS[0].slug}`}
                    className="flex items-center gap-1.5 text-brand-coral text-sm font-medium hover:gap-2.5 transition-all">
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="card rounded-2xl overflow-hidden group block">
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="badge badge-teal text-xs mb-3 inline-block">{post.category}</span>
                  <h3 className="font-display text-base font-bold text-white mb-2 leading-snug
                                 group-hover:text-brand-coral transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-xs text-white/40 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-white/25 text-xs font-body">
                    <span>{post.date}</span>
                    <span>·</span>
                    <Clock size={10} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
