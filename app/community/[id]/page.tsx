"use client"

import { use } from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowLeft, MoreHorizontal, Heart, MessageCircle, User, Send, X } from "lucide-react"
import Image from "next/image"
import axios from "axios"

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [post, setPost] = useState<any>(null)
  const [likes, setLikes] = useState(0) // 초기값을 0으로 변경
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isLikeProcessing, setIsLikeProcessing] = useState(false) // 좋아요 처리 중 상태 추가
  const inputRef = useRef<HTMLInputElement>(null)

  // 게시글 정보 가져오기
  useEffect(() => {
    if (!id) return
    
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`)
        setPost(response.data)
        
        // 서버에서 좋아요 수와 사용자의 좋아요 상태를 받아온다면
        if (response.data.likeCount !== undefined) {
          setLikes(response.data.likeCount)
        }
        if (response.data.isLiked !== undefined) {
          setIsLiked(response.data.isLiked)
        }
      } catch (error) {
        console.error("게시글 불러오기 실패:", error)
        alert("게시글을 불러오는데 실패했습니다.")
      }
    }
    
    fetchPost()
  }, [id])

  // 댓글 목록 가져오기
  useEffect(() => {
    if (!id) return
    
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}/comments`)
        setComments(response.data)
      } catch (error) {
        console.error("댓글 불러오기 실패:", error)
      }
    }
    
    fetchComments()
  }, [id])

  // 개선된 좋아요 토글 함수
  const toggleLike = async () => {
    if (isLikeProcessing) return // 중복 요청 방지
    
    setIsLikeProcessing(true)
    
    // 낙관적 업데이트 (사용자 경험 향상)
    const prevLikes = likes
    const prevIsLiked = isLiked
    
    try {
      if (isLiked) {
        // UI 먼저 업데이트
        setLikes(prev => Math.max(0, prev - 1)) // 0 이하로 내려가지 않도록
        setIsLiked(false)
        
        // 좋아요 취소 API 호출
        await axios.delete(`http://localhost:8080/api/posts/${id}/like`)
        console.log("좋아요 취소 성공")
      } else {
        // UI 먼저 업데이트
        setLikes(prev => prev + 1)
        setIsLiked(true)
        
        // 좋아요 등록 API 호출
        await axios.post(`http://localhost:8080/api/posts/${id}/like`)
        console.log("좋아요 등록 성공")
      }
    } catch (error) {
      // 실패 시 이전 상태로 롤백
      setLikes(prevLikes)
      setIsLiked(prevIsLiked)
      
      console.error("좋아요 처리 실패:", error)
      
      // 에러 타입에 따른 상세한 메시지 제공
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("로그인이 필요합니다.")
        } else if (error.response?.status === 404) {
          alert("게시글을 찾을 수 없습니다.")
        } else if (error.response?.status >= 500) {
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
        } else {
          alert(error.response?.data?.message || "좋아요 처리 중 오류가 발생했습니다.")
        }
      } else {
        alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.")
      }
    } finally {
      setIsLikeProcessing(false)
    }
  }

  const handleCommentIcon = () => {
    inputRef.current?.focus()
  }

  // 댓글 작성 API 호출
  const addComment = async () => {
    if (newComment.trim() === "" || newPassword.trim() === "" || isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      const response = await axios.post(`http://localhost:8080/api/posts/${id}/comments`, {
        authorName: "익명",
        content: newComment,
        password: newPassword
      })
      
      // 성공시 댓글 목록 새로고침
      const commentsResponse = await axios.get(`http://localhost:8080/api/posts/${id}/comments`)
      setComments(commentsResponse.data)
      
      // 입력창 초기화
      setNewComment("")
      setNewPassword("")
      
      alert(response.data.message || "댓글이 등록되었습니다.")
    } catch (error) {
      console.error("댓글 작성 실패:", error)
      alert("댓글 작성에 실패했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // 댓글 삭제 API 호출
  const deleteComment = async (commentId: number) => {
    const password = prompt("댓글 삭제를 위해 비밀번호를 입력하세요")
    if (!password) return
    
    try {
      const response = await axios.delete(`http://localhost:8080/api/posts/${id}/comments/${commentId}`, {
        data: { password }
      })
      
      // 성공시 댓글 목록에서 제거
      setComments(comments.filter(comment => comment.commentId !== commentId))
      alert("댓글이 삭제되었습니다.")
      console.log("댓글 삭제 성공:", response.data)
    } catch (error) {
      console.error("댓글 삭제 실패:", error)
      alert("비밀번호가 일치하지 않거나 삭제에 실패했습니다.")
    }
  }

  // 게시글 수정 API
  const editPost = async () => {
    const title = prompt("새로운 제목을 입력하세요:", post?.title || "")
    if (!title) return
    
    const content = prompt("새로운 내용을 입력하세요:", post?.content || "")
    if (!content) return
    
    const password = prompt("비밀번호를 입력하세요:")
    if (!password) return
    
    try {
      await axios.put(`http://localhost:8080/api/posts/${id}`, {
        title,
        content,
        password
      })
      alert("게시글이 수정되었습니다.")
      // 게시글 정보 새로고침
      const response = await axios.get(`http://localhost:8080/api/posts/${id}`)
      setPost(response.data)
      setShowMenu(false)
    } catch (error) {
      console.error("게시글 수정 실패:", error)
      alert("게시글 수정에 실패했습니다.")
    }
  }

  // 게시글 삭제 API
  const deletePost = async () => {
    const password = prompt("게시글 삭제를 위해 비밀번호를 입력하세요:")
    if (!password) return
    
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return
    
    try {
      const response = await axios.delete(`http://localhost:8080/api/posts/${id}`, {
        data: { password }
      })
      alert("게시글이 삭제되었습니다.")
      console.log("게시글 삭제 성공:", response.data)
      window.history.back()
    } catch (error) {
      console.error("게시글 삭제 실패:", error)
      alert("게시글 삭제에 실패했습니다.")
    }
  }

  return (
    <div className="relative mx-auto bg-white" style={{ width: "375px", height: "812px" }}>
      {/* Header */}
      <div className="absolute flex items-center justify-between" style={{ width: "375px", top: "10px", height: "37px" }}>
        <button onClick={() => window.history.back()} className="absolute" style={{ left: "9px", top: "0px", width: "37px", height: "37px" }}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="absolute text-black flex items-center" style={{ left: "calc(50% - 59px/2)", top: "5px", fontFamily: "Pretendard", fontWeight: 500, fontSize: "16px" }}>커뮤니티</h1>
        <button onClick={() => setShowMenu(!showMenu)} className="absolute" style={{ right: "9px", top: "0px", width: "37px", height: "37px" }}>
          <MoreHorizontal className="w-6 h-6 text-black" />
        </button>
        
        {/* 더보기 메뉴 */}
        {showMenu && (
          <div className="absolute right-2 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
            <button 
              onClick={editPost}
              className="w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-50 border-b border-gray-100"
            >
              게시글 수정
            </button>
            <button 
              onClick={deletePost}
              className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-gray-50"
            >
              게시글 삭제
            </button>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="absolute overflow-y-auto" style={{ top: "66px", width: "375px", height: "686px", paddingBottom: "100px" }}>
        {post ? (
          <>
            {/* 게시글 본문 */}
            <div className="px-5 py-4">
              <div className="flex items-center mb-3">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-black">{post.authorName || "익명"}</div>
                  <div className="text-xs text-gray-500">05/23 01:04</div>
                </div>
              </div>
              <div className="text-base font-semibold text-black mb-2">{post.title}</div>
              <div className="text-sm text-black leading-5 whitespace-pre-line">{post.content}</div>
            </div>

            {/* 공감, 댓글 수 */}
            <div className="flex items-center px-5 mb-4">
              <button
                className={`flex items-center mr-6 transition-all duration-300 ease-out active:scale-125 ${isLikeProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={toggleLike}
                disabled={isLikeProcessing}
              >
                <Heart className={`w-4 h-4 mr-1 transition-all duration-200 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                <span className={`text-sm transition-colors duration-200 ${isLiked ? "text-[#B81E22]" : "text-gray-500"}`}>
                  공감 {likes}
                </span>
              </button>
              <button
                className="flex items-center transition-transform duration-300 ease-out active:scale-110"
                onClick={handleCommentIcon}
              >
                <MessageCircle className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">댓글 {comments.length}</span>
              </button>
            </div>

            {/* 배너 */}
            <div className="relative mx-5 rounded-xl overflow-hidden h-[120px] mb-6">
              <Image src="/images/banner_image3.png" alt="배너" fill className="object-cover" />
            </div>

            {/* 댓글 목록 */}
            <div>
              {comments.map((comment) => (
                <div key={comment.commentId} className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="ml-2 text-sm font-semibold text-black">{comment.authorName || "익명"}</div>
                    </div>
                    <button onClick={() => deleteComment(comment.commentId)} className="text-gray-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-black mb-1">{comment.content}</div>
                  <div className="text-xs text-gray-500">{comment.createdAt || comment.date}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-sm text-gray-400 py-10">불러오는 중...</div>
        )}
      </div>

      {/* 댓글 입력창 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[375px] bg-white border-t border-gray-200 px-4 py-2 flex flex-col gap-2 z-50">
        <input
          ref={inputRef}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full outline-none"
          onKeyDown={(e) => e.key === "Enter" && !isSubmitting && addComment()}
          disabled={isSubmitting}
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="비밀번호 설정"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full outline-none"
          onKeyDown={(e) => e.key === "Enter" && !isSubmitting && addComment()}
          disabled={isSubmitting}
        />
        <button 
          onClick={addComment} 
          disabled={isSubmitting}
          className={`self-end w-9 h-9 ${isSubmitting ? 'bg-gray-400' : 'bg-[#B81E22]'} rounded-full text-white flex items-center justify-center`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}