import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Stock Team Analyzer",
  description: "AI-Powered Multi-Agent Stock Analysis Framework",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}