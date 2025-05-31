"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-red-600">편의점세일</span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container mx-auto px-4 py-2 bg-white border-t">
          <nav className="space-y-2">
            <Link
              href="/store-map"
              className="block px-2 py-1 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              편의점 찾기
            </Link>
            <Link
              href="/combo-list"
              className="block px-2 py-1 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              꿀 조합
            </Link>
            <Link
              href="/community"
              className="block px-2 py-1 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              커뮤니티
            </Link>
            <Link
              href="/event"
              className="block px-2 py-1 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              행사 상품
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
