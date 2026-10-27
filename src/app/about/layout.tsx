import type { Metadata } from "next"

const description = "A little about Ana Rita Diogo, the engineer, traveler, and collector behind this corner of the internet."

export const metadata: Metadata = {
  title: "About",
  description,
  openGraph: {
    title: "About | Ana Rita Diogo",
    description,
    type: "website",
  },
}

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children
}
