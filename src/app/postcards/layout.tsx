import type { Metadata } from "next"

const description = "Browse Ana Rita Diogo's postcard collection, digitized and annotated one scan at a time."

export const metadata: Metadata = {
  title: "Postcards",
  description,
  openGraph: {
    title: "Postcards | Ana Rita Diogo",
    description,
    type: "website",
  },
}

export default function PostcardsLayout({ children }: LayoutProps<"/postcards">) {
  return children
}
