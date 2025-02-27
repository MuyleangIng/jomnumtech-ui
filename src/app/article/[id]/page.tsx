import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react"
import { RelatedArticles } from "@/components/related-articles"
import {ShareArticle} from "@/components/share-article";

// This would typically come from a database or API
const getArticleData = (id: string) => {
  return {
    id,
    title: "The Beginner's Guide to Docker",
    subtitle: "A Step-by-Step Introduction to Docker",
    coverImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Kq1Bdi2x-BIJCK-ytxBbqw.png",
    content: `
      <p>Docker has revolutionized how developers build, ship, and run applications. If you're new to containerization, this guide will walk you through the fundamentals of Docker and help you get started with your first containers.</p>

      <h2>What is Docker?</h2>
      <p>Docker is an open platform for developing, shipping, and running applications. It enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications.</p>

      <h2>Why Use Docker?</h2>
      <p>Docker provides several key benefits:</p>
      <ul>
        <li><strong>Consistency:</strong> "It works on my machine" becomes a thing of the past</li>
        <li><strong>Isolation:</strong> Applications run in their own environment without conflicts</li>
        <li><strong>Portability:</strong> Build once, run anywhere (development, staging, production)</li>
        <li><strong>Efficiency:</strong> Containers share the host OS kernel and use fewer resources than VMs</li>
        <li><strong>Scalability:</strong> Easily scale applications horizontally by adding more container instances</li>
      </ul>

      <h2>Core Docker Concepts</h2>
      <h3>1. Images</h3>
      <p>A Docker image is a lightweight, standalone, executable package that includes everything needed to run an application: code, runtime, libraries, environment variables, and configuration files.</p>
      <p>Images are built from a set of instructions written in a Dockerfile. Each instruction creates a layer in the image, and layers are cached to speed up future builds.</p>

      <h3>2. Containers</h3>
      <p>A container is a running instance of an image. You can create, start, stop, move, or delete containers using the Docker API or CLI. Containers are isolated from each other and the host system.</p>

      <h3>3. Dockerfile</h3>
      <p>A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using the <code>docker build</code> command, users can create an automated build that executes several command-line instructions in succession.</p>

      <div class="code-block">
      <pre><code>FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]</code></pre>
      </div>

      <h3>4. Docker Hub</h3>
      <p>Docker Hub is a cloud-based registry service that allows you to link to code repositories, build your images, test them, and distribute them to the Docker community or your team.</p>

      <h2>Getting Started with Docker</h2>
      <h3>Step 1: Install Docker</h3>
      <p>First, download and install Docker Desktop for your operating system from the <a href="https://www.docker.com/products/docker-desktop">official Docker website</a>.</p>

      <h3>Step 2: Verify Installation</h3>
      <p>Open a terminal and run:</p>
      <div class="code-block">
      <pre><code>docker --version
docker run hello-world</code></pre>
      </div>

      <h3>Step 3: Pull Your First Image</h3>
      <p>Let's pull the official Nginx web server image:</p>
      <div class="code-block">
      <pre><code>docker pull nginx</code></pre>
      </div>

      <h3>Step 4: Run a Container</h3>
      <p>Now, let's run a container from the Nginx image:</p>
      <div class="code-block">
      <pre><code>docker run --name my-nginx -p 8080:80 -d nginx</code></pre>
      </div>
      <p>This command:</p>
      <ul>
        <li>Creates a container named "my-nginx"</li>
        <li>Maps port 8080 on your host to port 80 in the container</li>
        <li>Runs the container in detached mode (in the background)</li>
      </ul>

      <h3>Step 5: Interact with Your Container</h3>
      <p>Visit <a href="http://localhost:8080">http://localhost:8080</a> in your browser to see the Nginx welcome page.</p>
      <p>To see running containers:</p>
      <div class="code-block">
      <pre><code>docker ps</code></pre>
      </div>
      <p>To stop the container:</p>
      <div class="code-block">
      <pre><code>docker stop my-nginx</code></pre>
      </div>

      <h2>Docker Compose: Managing Multi-Container Applications</h2>
      <p>Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services, networks, and volumes.</p>

      <p>Here's a simple example of a <code>docker-compose.yml</code> file for a web application with a database:</p>
      <div class="code-block">
      <pre><code>version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: mongo
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:</code></pre>
      </div>

      <h2>Best Practices</h2>
      <div class="best-practices">
        <ul>
          <li><strong>Use official images</strong> when possible</li>
          <li><strong>Keep images small and focused</strong> to reduce attack surface and improve performance</li>
          <li><strong>Use multi-stage builds</strong> to reduce image size</li>
          <li><strong>Don't run containers as root</strong> for better security</li>
          <li><strong>Use volumes for persistent data</strong> to prevent data loss</li>
          <li><strong>Use environment variables</strong> for configuration</li>
          <li><strong>Implement health checks</strong> to ensure your containers are running properly</li>
          <li><strong>Scan images for vulnerabilities</strong> before deployment</li>
        </ul>
      </div>

      <h2>Conclusion</h2>
      <p>Docker has transformed how we develop, deploy, and run applications. By containerizing your applications, you gain consistency, portability, and efficiency. This guide has only scratched the surface of what's possible with Docker.</p>

      <p>As you continue your Docker journey, explore topics like container orchestration with Kubernetes, continuous integration/continuous deployment (CI/CD) pipelines, and container security.</p>
    `,
    publishedAt: "Jan 28, 2024",
    readTime: "11 min read",
    author: {
      id: 1,
      name: "Jean F Beaulieu",
      username: "jeanfbeaulieu",
      bio: "DevOps engineer and container enthusiast. I write about Docker, Kubernetes, and cloud-native technologies.",
      image: "/placeholder.svg?height=100&width=100",
      initials: "JB",
      followers: 1240,
    },
    tags: ["Docker", "Containers", "DevOps", "Web Development", "Tutorial"],
    likes: 162,
    comments: 14,
    excerpt: "Learn the fundamentals of Docker containerization with this step-by-step guide for beginners.",
  }
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticleData(params?.id)

  return (
      <div className="mx-auto max-w-full bg-white">
        <div className="container max-w-[728px] py-10">
          <article className="space-y-8">
            {/* Article Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-serif tracking-tight sm:text-4xl">{article.title}</h1>
              <p className="text-xl text-muted-foreground">{article.subtitle}</p>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>{article.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link href={`/@${article.author.username}`} className="font-medium hover:underline">
                      {article.author.name}
                    </Link>
                    <Button variant="outline" size="sm" className="h-7 rounded-full text-xs">
                      Follow
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>{article.readTime}</span>
                    <span>·</span>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                    <ShareArticle article={article} />
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <Image
                src={article.coverImage || "/placeholder.svg"}
                alt={article.title}
                width={1200}
                height={600}
                className="rounded-lg object-cover"
                priority
            />

            {/* Article Content */}
            <div
                className="prose prose-lg max-w-none font-serif article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {article.tags.map((tag) => (
                  <Button
                      key={tag}
                      variant="secondary"
                      size="sm"
                      className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                      asChild
                  >
                    <Link href={`/tag/${tag.toLowerCase().replace(" ", "-")}`}>{tag}</Link>
                  </Button>
              ))}
            </div>

            {/* Article Actions */}
            <div className="flex items-center justify-between border-y py-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="h-5 w-5" />
                  <span>{article.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>{article.comments}</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Author Info */}
            <div className="rounded-lg border p-6 bg-gray-50">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>{article.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href={`/@${article.author.username}`} className="text-lg font-medium hover:underline">
                      {article.author.name}
                    </Link>
                    <Button className="rounded-full">Follow</Button>
                  </div>
                  <p className="text-muted-foreground">{article.author.bio}</p>
                  <p className="text-sm text-muted-foreground">{article.author.followers.toLocaleString()} followers</p>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <Separator className="my-10" />
          <div className="space-y-6">
            <h2 className="text-xl font-bold">More from Medium</h2>
            <RelatedArticles currentArticleId={article.id} />
          </div>
        </div>
      </div>
  )
}

