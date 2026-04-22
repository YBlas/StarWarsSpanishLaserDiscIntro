import "./globals.css";
import localFont from "next/font/local";

const newsGothic = localFont({
  src: [
    {
      path: "../fonts/NewsGothic-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/NewsGothic-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-news-gothic",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={newsGothic.variable} lang="en">
      <body>{children}</body>
    </html>
  );
}
