import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Tictic",
  description: "⏱️ 타이머가 돌아간다 — 당신의 지식을 증명하라!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/x-icon" href="/tictic-icon.ico" sizes="56x56" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
