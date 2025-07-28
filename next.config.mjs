import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'

// Custom remark plugin to strip out YAML frontmatter nodes
function stripFrontmatter() {
  return (tree) => {
    if (tree.children.length > 0 && tree.children[0].type === 'yaml') {
      tree.children.shift()
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure MDX and TSX files are treated as pages
  pageExtensions: ['mdx', 'tsx'],
}

const withMDX = createMDX({
  // Add markdown plugins here
  options: {
    remarkPlugins: [remarkFrontmatter, stripFrontmatter],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
