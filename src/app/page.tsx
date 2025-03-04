import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FeaturedArticles } from "@/components/featured-articles"
import { TrendingArticles } from "@/components/trending-articles"
import { RecommendedTopics } from "@/components/recommended-topics"
import { WhoToFollow } from "@/components/who-to-follow"
// import Lottie from "lottie-react";
// import animationData from "../../public/lotties/article.json";
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
                <Button size="lg" className="rounded-full px-8">
                  Start reading
                </Button>
              </div>
            </div>
            {/*<div className="hidden md:block">*/}
            {/*  <Lottie*/}
            {/*      animationData={animationData}*/}
            {/*      loop={true}*/}
            {/*      className="w-[500px] h-[400px] rounded-lg"*/}
            {/*  />*/}
            {/*</div>*/}
            <div className="hidden md:block">
              <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Hero image"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                  priority
              />
            </div>
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

