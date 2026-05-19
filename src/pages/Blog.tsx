import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    title: "How AI is Transforming Indian SMEs in 2024",
    excerpt: "Discover how small and medium enterprises across India are leveraging AI to automate operations, reduce costs, and compete with larger players.",
    category: "AI & Automation",
    author: "Arun Krishnan",
    date: "Dec 2, 2024",
    readTime: "5 min read",
    slug: "ai-transforming-indian-smes-2024",
  },
  {
    title: "The Complete Guide to Cloud Migration for Indian Businesses",
    excerpt: "Step-by-step guide to planning and executing your cloud migration strategy, with special considerations for Indian regulatory requirements.",
    category: "Cloud Services",
    author: "Priya Menon",
    date: "Nov 28, 2024",
    readTime: "8 min read",
    slug: "cloud-migration-guide-india",
  },
  {
    title: "Digital Marketing Trends That Will Dominate 2025",
    excerpt: "From AI-powered personalization to voice search optimization, explore the trends that will shape digital marketing in the coming year.",
    category: "Digital Marketing",
    author: "Rahul Sharma",
    date: "Nov 25, 2024",
    readTime: "6 min read",
    slug: "digital-marketing-trends-2025",
  },
  {
    title: "Why React Native is the Best Choice for Startups",
    excerpt: "A comprehensive comparison of mobile development frameworks and why React Native offers the best ROI for early-stage companies.",
    category: "Mobile Development",
    author: "Sneha Patel",
    date: "Nov 20, 2024",
    readTime: "7 min read",
    slug: "react-native-startups-guide",
  },
  {
    title: "Building a Career in DevOps: A Complete Roadmap",
    excerpt: "Everything you need to know about starting and growing your DevOps career, from essential skills to certification paths.",
    category: "Career & Training",
    author: "Vikram Singh",
    date: "Nov 15, 2024",
    readTime: "10 min read",
    slug: "devops-career-roadmap",
  },
  {
    title: "Cybersecurity Best Practices for Remote Work",
    excerpt: "Essential security measures every organization should implement to protect remote workers and sensitive data.",
    category: "Cybersecurity",
    author: "Anita Desai",
    date: "Nov 10, 2024",
    readTime: "6 min read",
    slug: "cybersecurity-remote-work",
  },
];

const categories = [
  "All",
  "AI & Automation",
  "Cloud Services",
  "Digital Marketing",
  "Mobile Development",
  "Career & Training",
  "Cybersecurity",
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog & Insights | TechNova Solutions - Tech News & Tips</title>
        <meta name="description" content="Stay updated with the latest insights on AI, cloud computing, digital marketing, DevOps, and career guidance from TechNova's expert team." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="hero-gradient section-padding">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Blog & Insights</span>
                <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
                  Latest Trends & Expert Insights
                </h1>
                <p className="text-lg text-muted-foreground">
                  Stay ahead of the curve with our expert articles on technology, digital transformation, and career development.
                </p>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-8 border-b border-border">
            <div className="container-custom">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      index === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <article
                    key={index}
                    className="bg-card rounded-xl border border-border overflow-hidden card-hover group"
                  >
                    <div className="aspect-video bg-muted/50 flex items-center justify-center">
                      <div className="text-4xl font-bold text-muted-foreground/20">
                        {post.category.charAt(0)}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="hero-outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-8">
                  Subscribe to our newsletter and get the latest insights delivered directly to your inbox every week.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="hero" size="lg">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
