import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";

export async function compileMdxContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return content;
}
