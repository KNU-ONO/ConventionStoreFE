import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PostItemProps {
  id: string
  title: string
  content: string
  author: string
  date: string
  likes: number
  comments: number
}

export default function PostItem({ id, title, content, author, date, likes, comments }: PostItemProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <Link href={`/post-detail/${id}`}>
          <h2 className="text-lg font-medium hover:text-red-600 mb-2">{title}</h2>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{content}</p>
      </CardContent>
      <CardFooter className="px-4 py-2 border-t flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Avatar className="h-5 w-5">
              <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <span>{author}</span>
          </div>
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>좋아요 {likes}</span>
          <span>댓글 {comments}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
