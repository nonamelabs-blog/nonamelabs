import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
}

export function getAllPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), 'pages/blog');
  const files = fs.readdirSync(postsDir);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title,
        summary: data.summary,
        publishedAt: data.publishedAt,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
