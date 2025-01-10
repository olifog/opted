import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/trpc/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OPTED",
  description: "Your AI Calendar Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
