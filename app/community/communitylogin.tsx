"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"

export default function CommunityCreatePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요")
      return
    }

    try {
      setIsLoading(true)
      await axios.post("http://localhost:8080/api/posts", {
        title,
        content,
        author: "익명 사용자", // TODO: 사용자 정보 연동 시 수정
        category: "일상글", // 또는 꿀조합/인기글 분기 처리 가능
      })
      alert("게시글이 등록되었습니다")
      window.history.back()
    } catch (err) {
      console.error(err)
      alert("등록에 실패했습니다")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative bg-white mx-auto" style={{ width: "375px", height: "812px" }}>
      {/* 상단 헤더 */}
      <div className="absolute flex items-center" style={{ top: "54px", left: "9px", height: "37px" }}>
        <button onClick={() => window.history.back()}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1
          className="text-black ml-4"
          style={{ fontFamily: "Pretendard", fontWeight: 500, fontSize: "16px", lineHeight: "27px" }}
        >
          글쓰기
        </h1>
      </div>

      {/* 입력폼 */}
      <div className="absolute px-5" style={{ top: "120px", width: "100%" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm"
          style={{ fontFamily: "Pretendard" }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          rows={10}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
          style={{ fontFamily: "Pretendard" }}
        />
      </div>

      {/* 등록 버튼 */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="absolute w-[335px] left-[20px] bottom-[40px] bg-red-600 hover:bg-red-700 text-white text-lg"
        style={{ borderRadius: "9999px", height: "48px" }}
      >
        {isLoading ? "등록 중..." : "등록하기"}
      </Button>
    </div>
  )
}
