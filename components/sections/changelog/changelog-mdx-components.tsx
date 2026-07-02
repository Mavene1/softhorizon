import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const changelogMdxComponents: MDXComponents = {
  p: (props) => <p className="text-sm leading-relaxed text-muted-foreground" {...props} />,
  a: ({ href, ...props }) => (
    <Link
      href={href ?? "#"}
      className="font-semibold text-primary underline underline-offset-4 hover:no-underline"
      {...props}
    />
  ),
};
