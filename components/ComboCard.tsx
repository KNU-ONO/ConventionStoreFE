import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ComboCardProps {
  id: string
  title: string
  price: string
  description: string
  items: {
    name: string
    price: string
    image: string
  }[]
  likeCount: number
  store: string
}

export default function ComboCard({ id, title, price, description, items, likeCount, store }: ComboCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col">
          <div className="text-sm text-muted-foreground mb-1">{store}</div>
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{price} 골조합</p>
          <p className="text-sm mb-4 line-clamp-2">{description}</p>

          <div className="flex mt-2 space-x-2">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mb-1 relative overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">좋아요 {likeCount}</span>
            </div>
            <Link href={`/combo-detail/${id}`}>
              <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                자세히 보기
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
