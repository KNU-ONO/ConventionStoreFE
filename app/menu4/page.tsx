import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Menu4Page() {
  const discounts = [
    {
      id: 1,
      title: "음료 1+1",
      store: "CU",
      period: "2025.05.20 ~ 2025.05.31",
      description: "모든 음료 1+1 행사",
    },
    {
      id: 2,
      title: "과자 2+1",
      store: "GS25",
      period: "2025.05.15 ~ 2025.05.25",
      description: "모든 과자 2+1 행사",
    },
    {
      id: 3,
      title: "아이스크림 할인",
      store: "세븐일레븐",
      period: "2025.05.22 ~ 2025.06.05",
      description: "모든 아이스크림 20% 할인",
    },
    {
      id: 4,
      title: "도시락 할인",
      store: "이마트24",
      period: "2025.05.18 ~ 2025.05.28",
      description: "모든 도시락 500원 할인",
    },
  ]

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">할인 정보</h1>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="cu">CU</TabsTrigger>
          <TabsTrigger value="gs25">GS25</TabsTrigger>
          <TabsTrigger value="seven">세븐일레븐</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {discounts.map((discount) => (
          <Card key={discount.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-red-600 font-medium mb-1">{discount.store}</div>
                  <h2 className="text-lg font-medium">{discount.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{discount.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">{discount.period}</span>
                  <Button variant="outline" size="sm" className="mt-2 text-red-600 border-red-600">
                    자세히 보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
