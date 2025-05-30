import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

interface Params {
  slug: string
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPosts().find((p) => p.slug === id)

  if (!post) {
    return { title: 'Not found' }
  }

  const { title, publishedAt, summary: description, image } = post.metadata
  const ogImage = image
    ? `${baseUrl}${image}`
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: publishedAt,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  const {slug} = await params;
  const post = getBlogPosts().find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post!.metadata.title,
            datePublished: post!.metadata.publishedAt,
            dateModified: post!.metadata.publishedAt,
            description: post!.metadata.summary,
            image: post!.metadata.image
              ? `${baseUrl}${post!.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post!.metadata.title)}`,
            url: `${baseUrl}/blog/${post!.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />

      <h1 className="text-3xl font-bold">{post!.metadata.title}</h1>

      <time
        dateTime={post!.metadata.publishedAt}
        className="block mt-2 text-sm text-neutral-600 dark:text-neutral-400"
      >
        {formatDate(post!.metadata.publishedAt)}
      </time>

      {post!.metadata.image && (
        <img
          src={post!.metadata.image}
          alt={post!.metadata.title}
          className="my-6 rounded-lg"
        />
      )}

      <article className="prose dark:prose-invert">
        {post.content}
      </article>
    </section>
  )
}
