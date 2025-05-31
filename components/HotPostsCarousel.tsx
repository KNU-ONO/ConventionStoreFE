"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, MessageSquare, ThumbsUp } from "lucide-react"

interface Post {
  id: string
  title: string
  content: string
  author: string
  likes: number
  comments: number
}

export default function HotPostsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 실제로는 API에서 가져올 데이터
  const hotPosts: Post[] = [
    {
      id: "1",
      title: "CU 신상 삼각김밥 리뷰",
      content: "오늘 CU에서 출시된 신상 삼각김밥을 먹어봤는데 정말 맛있어요!",
      author: "편의점러버",
      likes: 128,
      comments: 32,
    },
    {
      id: "2",
      title: "GS25 1+1 행사 정보 공유",
      content: "이번 주 GS25에서 음료 1+1 행사 중인데 꼭 확인하세요.",
      author: "알뜰족",
      likes: 95,
      comments: 24,
    },
    {
      id: "3",
      title: "세븐일레븐 도시락 추천",
      content: "세븐일레븐 신상 도시락 중에 이건 꼭 드셔보세요. 가성비 최고!",
      author: "맛집탐험가",
      likes: 87,
      comments: 19,
    },
    {
      id: "4",
      title: "편의점 야식 조합 추천",
      content: "야식으로 딱 좋은 편의점 음식 조합을 소개합니다.",
      author: "야식킹",
      likes: 76,
      comments: 28,
    },
    {
      id: "5",
      title: "이마트24 할인 정보",
      content: "이마트24에서 이번 주 특별 할인 행사 중입니다. 놓치지 마세요!",
      author: "세일헌터",
      likes: 65,
      comments: 15,
    },
  ]

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hotPosts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [hotPosts.length])

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? hotPosts.length - 1 : prevIndex - 1))
  }

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hotPosts.length)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
            🔥 실시간 인기글
          </span>
        </h2>
        <Link href="/community" className="text-sm text-red-600 font-medium hover:underline">
          더보기
        </Link>
      </div>

      <div className="overflow-hidden relative rounded-xl shadow-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {hotPosts.map((post) => (
            <div key={post.id} className="w-full flex-shrink-0">
              <Link href={`/community/${post.id}`}>
                <Card className="border-0 hover:bg-gray-50 transition-colors">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* 네비게이션 버튼 */}
        <button
          className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center mt-3 space-x-1">
        {hotPosts.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index ? "w-6 bg-gradient-to-r from-red-500 to-orange-500" : "w-2 bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
