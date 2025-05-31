import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CombinationDetailPage({ params }: { params: { id: string } }) {
  // 실제로는 params.id를 사용하여 데이터를 가져와야 합니다
  const combination = {
    id: params.id,
    title: "난 돈이 없을 이럴 때에",
    price: "1,430원",
    description: "돈이 없어서 어쩔 수 없 좋음!",
    items: [
      { name: "콜라", price: "800원", image: "/placeholder.svg?height=100&width=100" },
      { name: "삼각김밥", price: "630원", image: "/placeholder.svg?height=100&width=100" },
    ],
    franchise: "CU",
    author: "편의점러버",
    date: "2025.05.22",
    likes: 148,
    comments: [
      { id: 1, author: "사용자1", content: "배달이 빨라서좋아요", date: "2025.05.20" },
      { id: 2, author: "사용자2", content: "가성비 최고입니다!", date: "2025.05.19" },
    ],
  }

  return (
    <div className="container py-6">
      <div className="mb-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          ← 꿀조합 찾아보기
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold mb-2">{combination.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{combination.price} 골조합</p>
          <p className="mb-6">{combination.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {combination.items.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="mb-2"
                />
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm">난 돈이 없을 이럴 때에#{combination.likes}</span>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">좋아요 ({combination.likes})</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">조합에 대한 피드백</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {combination.comments.map((comment) => (
                <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">비슷한 조합 추천</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">아침 식사 조합</h3>
              <p className="text-sm text-muted-foreground mb-4">1,800원 꿀꿀조합</p>
              <div className="flex mt-4 space-x-2">
                <Image src="/placeholder.svg?height=60&width=60" alt="샌드위치" width={60} height={60} />
                <Image src="/placeholder.svg?height=60&width=60" alt="우유" width={60} height={60} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">야식 조합</h3>
              <p className="text-sm text-muted-foreground mb-4">3,500원 꿀꿀조합</p>
              <div className="flex mt-4 space-x-2">
                <Image src="/placeholder.svg?height=60&width=60" alt="라면" width={60} height={60} />
                <Image src="/placeholder.svg?height=60&width=60" alt="소주" width={60} height={60} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
