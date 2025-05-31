import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CombinationsPage() {
  const combinations = [
    {
      id: 1,
      title: "다이어트 조합",
      description: "건강한 다이어트를 위한 조합",
      items: ["샐러드", "닭가슴살", "물"],
    },
    {
      id: 2,
      title: "야식 조합",
      description: "야식으로 딱 좋은 조합",
      items: ["라면", "소주", "안주"],
    },
    {
      id: 3,
      title: "아침 식사 조합",
      description: "간단한 아침 식사",
      items: ["샌드위치", "우유", "바나나"],
    },
    {
      id: 4,
      title: "간식 조합",
      description: "간식으로 딱 좋은 조합",
      items: ["과자", "콜라", "아이스크림"],
    },
  ]

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">골 조합 찾기</h1>

      <div className="grid grid-cols-1 gap-4">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">다이어트 조합</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">MY PICK 조합</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">오늘의 추천 조합</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">자취 고수 조합</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">더보기</Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">다이어트 조합</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {combinations.map((combo) => (
            <Card key={combo.id}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{combo.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{combo.description}</p>
                <div className="flex mt-4 space-x-2">
                  {combo.items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mb-1">
                        <Image src={`/placeholder.svg?height=40&width=40`} alt={item} width={40} height={40} />
                      </div>
                      <span className="text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                    자세히 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
