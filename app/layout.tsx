import type { Metadata } from "next";
import "./globals.css";

const title = "Sania Asif | Clinical Psychologist";
const description =
  "Clinical psychology support for addiction recovery, anxiety, depression, OCD, and related concerns online worldwide and in-person in Karachi.";

// Set NEXT_PUBLIC_SITE_URL to the live address so link previews show the image.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const imageUrl = `${siteUrl.replace(/\/$/, "")}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
  openGraph: {
    title,
    description,
    images: [{ url: imageUrl, width: 1731, height: 909 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
