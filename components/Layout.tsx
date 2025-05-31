import type React from "react"
import Header from "./Header"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className={`flex min-h-screen flex-col ${inter.className}`}>
        <Header />
        <main className="flex-1 pb-16">{children}</main>
        <MobileNavigation />
      </div>
    </ThemeProvider>
  )
}

function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t md:hidden">
      <div className="grid h-full grid-cols-4">
        <a
          href="/store-map"
          className="flex flex-col items-center justify-center text-xs font-medium text-gray-500 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>주변 편의점</span>
        </a>
        <a
          href="/event"
          className="flex flex-col items-center justify-center text-xs font-medium text-gray-500 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
          <span>행사 상품</span>
        </a>
        <a
          href="/combo-list"
          className="flex flex-col items-center justify-center text-xs font-medium text-gray-500 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>꿀 조합</span>
        </a>
        <a
          href="/community"
          className="flex flex-col items-center justify-center text-xs font-medium text-gray-500 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
          <span>커뮤니티</span>
        </a>
      </div>
    </div>
  )
}
