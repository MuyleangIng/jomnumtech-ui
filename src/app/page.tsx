import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeaturedArticles } from "@/components/featured-articles"
import { TrendingArticles } from "@/components/trending-articles"
import { RecommendedTopics } from "@/components/recommended-topics"
import { WhoToFollow } from "@/components/who-to-follow"
import LottieHomePage from "@/app/login/LottieHomePage";
export default function Home() {
  return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="border-b">
          <div className="container grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:py-16 lg:py-20">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Stay curious.</h1>
              <p className="text-xl text-muted-foreground">
                Discover stories, thinking, and expertise from writers on any topic.
              </p>
              <div className="mt-4">
                <Link href="/login">
                  <Button size="lg" className="rounded-full px-8">
                    Start reading
                  </Button>
                </Link>
              </div>
            </div>

            <LottieHomePage/>
          </div>
        </section>

        {/* Trending Section */}
        <section className="border-b py-10">
          <div className="container">
            <TrendingArticles />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-10">
          <div className="container grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="col-span-2">
              <FeaturedArticles />
            </div>
            <div className="space-y-10">
              <RecommendedTopics />
              <WhoToFollow />
              <div className="sticky top-20 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Help
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Status
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Writers
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Blog
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Careers
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Privacy
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Terms
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}

