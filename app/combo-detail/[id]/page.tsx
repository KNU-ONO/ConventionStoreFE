"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Heart, Share2, Bookmark } from "lucide-react"

export default function ComboDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // 실제로는 params.id를 사용하여 데이터를 가져와야 합니다
  const combo = {
    id: params.id,
    title: "헬시 다이어트 조합",
    price: "3,500원",
    description: "건강한 다이어트를 위한 저칼로리 조합",
    items: [
      {
        name: "닭가슴살 샐러드",
        price: "2,500원",
        image: "/placeholder.svg?height=120&width=120",
        calories: "150kcal",
      },
      { name: "제로콜라", price: "1,000원", image: "/placeholder.svg?height=120&width=120", calories: "0kcal" },
    ],
    totalCalories: "150kcal",
    category: "다이어트",
    author: "헬스마니아",
    date: "2025.05.22",
    likes: 89,
    saves: 45,
    tags: ["다이어트", "저칼로리", "건강식"],
    nutritionInfo: {
      protein: "25g",
      carbs: "8g",
      fat: "3g",
      fiber: "5g",
    },
    reviews: [
      { id: 1, author: "다이어터", content: "정말 맛있고 포만감도 좋아요!", rating: 5, date: "2025.05.20" },
      { id: 2, author: "헬스러버", content: "다이어트 중인데 딱 좋네요", rating: 4, date: "2025.05.19" },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="mb-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => window.history.back()}>
          ← 뒤로가기
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">{combo.category}</span>
              <h1 className="text-2xl font-bold mt-2">{combo.title}</h1>
              <p className="text-gray-600 mt-1">{combo.description}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-600 border-red-600" : ""}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
                className={isSaved ? "text-blue-600 border-blue-600" : ""}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl text-red-600">{combo.price}</span>
              <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">{combo.totalCalories}</span>
            </div>
          </div>

          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="items">구성품</TabsTrigger>
              <TabsTrigger value="nutrition">영양정보</TabsTrigger>
              <TabsTrigger value="reviews">리뷰</TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="mt-4">
              <div className="space-y-4">
                {combo.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} width={50} height={50} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.price}</p>
                      <p className="text-xs text-green-600">{item.calories}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">단백질</p>
                  <p className="font-bold text-lg">{combo.nutritionInfo.protein}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">탄수화물</p>
                  <p className="font-bold text-lg">{combo.nutritionInfo.carbs}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">지방</p>
                  <p className="font-bold text-lg">{combo.nutritionInfo.fat}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">식이섬유</p>
                  <p className="font-bold text-lg">{combo.nutritionInfo.fiber}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {combo.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{review.author}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex space-x-2">
            {combo.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
            <span>
              ❤️ {combo.likes + (isLiked ? 1 : 0)} · 💾 {combo.saves + (isSaved ? 1 : 0)}
            </span>
            <span>
              {combo.author} · {combo.date}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">이 조합으로 주문하기</Button>
    </div>
  )
}
