"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"

export default function CommunityCreatePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [authorName, setAuthorName] = useState("익명")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    // 입력값 검증
    if (!title.trim()) {
      alert("제목을 입력해주세요")
      return
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요")
      return
    }
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요")
      return
    }

    try {
      setIsLoading(true)
      
      const response = await axios.post("http://localhost:8080/api/posts", {
        title: title.trim(),
        content: content.trim(),
        authorName: authorName.trim() || "익명",
        password: password,
        franchiseId: 1 // 필요에 따라 동적으로 설정
      })

      // 성공 응답 처리
      console.log("게시글 등록 성공:", response.data)
      alert("게시글이 등록되었습니다")
      
      // 커뮤니티 목록 페이지로 이동
      router.push("/community")
      
    } catch (error) {
      console.error("게시글 작성 실패:", error)
      
      // 에러 타입별 처리
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 서버에서 응답을 받았지만 에러 상태코드
          const status = error.response.status
          const message = error.response.data?.message || "등록에 실패했습니다"
          
          switch (status) {
            case 400:
              alert(`입력값이 올바르지 않습니다: ${message}`)
              break
            case 401:
              alert("인증이 필요합니다")
              break
            case 403:
              alert("권한이 없습니다")
              break
            case 500:
              alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요")
              break
            default:
              alert(`등록에 실패했습니다: ${message}`)
          }
        } else if (error.request) {
          // 요청은 보냈지만 응답을 받지 못함 (네트워크 오류, CORS 등)
          alert("서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요")
        } else {
          alert("요청 처리 중 오류가 발생했습니다")
        }
      } else {
        alert("예상치 못한 오류가 발생했습니다")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative bg-white mx-auto" style={{ width: "375px", height: "812px" }}>
      {/* Header */}
      <div className="absolute flex items-center" style={{ top: "54px", left: "9px", height: "37px" }}>
        <button onClick={() => router.back()} disabled={isLoading}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1
          className="text-black ml-4"
          style={{ fontFamily: "Pretendard", fontWeight: 500, fontSize: "16px", lineHeight: "27px" }}
        >
          글쓰기
        </h1>
      </div>

      {/* Form */}
      <div className="absolute px-5" style={{ top: "120px", width: "100%" }}>
        {/* 작성자명 입력 */}
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="작성자명 (선택사항)"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
          style={{ fontFamily: "Pretendard" }}
          disabled={isLoading}
        />
        
        {/* 제목 입력 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
          style={{ fontFamily: "Pretendard" }}
          disabled={isLoading}
        />
        
        {/* 내용 입력 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          rows={8}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm resize-none"
          style={{ fontFamily: "Pretendard" }}
          disabled={isLoading}
        />
        
        {/* 비밀번호 입력 */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요 (수정/삭제시 필요)"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          style={{ fontFamily: "Pretendard" }}
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !title.trim() || !content.trim() || !password.trim()}
        className="absolute w-[335px] left-[20px] bottom-[40px] bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-lg"
        style={{ borderRadius: "9999px", height: "48px" }}
      >
        {isLoading ? "등록 중..." : "등록하기"}
      </Button>
    </div>
  )
}