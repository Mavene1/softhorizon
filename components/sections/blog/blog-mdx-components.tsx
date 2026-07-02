import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const blogMdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-xl font-bold tracking-tight text-balance" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-relaxed text-muted-foreground" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-2 border-primary pl-5 text-base leading-relaxed italic text-foreground" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  a: ({ href, ...props }) => (
    <Link
      href={href ?? "#"}
      className="font-semibold text-primary underline underline-offset-4 hover:no-underline"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />
  ),
};
