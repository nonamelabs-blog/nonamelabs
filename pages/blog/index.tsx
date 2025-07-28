import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllPosts, PostMeta } from '../../scripts/getPosts';

interface BlogProps {
  posts: PostMeta[];
}

export default function BlogIndex({ posts }: BlogProps) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.summary}</p>
            <small>{new Date(post.publishedAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};
