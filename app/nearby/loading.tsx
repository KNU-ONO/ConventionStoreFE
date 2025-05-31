import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container py-6 flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
      <p className="text-lg text-muted-foreground">지도를 불러오는 중...</p>
    </div>
  )
}
