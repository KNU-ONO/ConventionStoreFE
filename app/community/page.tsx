"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Heart, MessageCircle, Plus, ArrowLeft, User } from "lucide-react"

export default function CommunityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("일상글")
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
  }, [])

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "꿀조합") return post.combinationId
    if (activeTab === "일상글") return !post.combinationId
    return true
  })

  return (
    <div className="flex flex-col mx-auto bg-white" style={{ width: "375px", height: "812px" }}>
      
      {/* Header */}
      <div className="relative flex items-center justify-between" style={{ height: "91px" }}>
        <button onClick={() => window.history.back()} className="absolute left-2 top-[54px] w-[37px] h-[37px]">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 top-[59px] text-black font-medium text-[16px] leading-[27px]">
          커뮤니티
        </h1>
        <button className="absolute right-2 top-[54px] w-[37px] h-[37px]">
          <User className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Tabs */}
      <div className="relative h-[43px]">
        {['인기글', '꿀조합', '일상글'].map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="absolute"
            style={{
              left: i === 0 ? "40px" : i === 1 ? "calc(50% - 22px - 1.5px)" : "289px",
              top: "0px",
              width: "44px",
              height: "27px",
              fontWeight: activeTab === tab ? 600 : 400,
              fontSize: "15px",
              color: "#000000",
            }}
          >
            {tab}
          </button>
        ))}
        <div className="absolute top-[36px] w-full border-b border-[#DBDBDB]" />
        <div
          className="absolute top-[34px] h-[2px] bg-[#B81E22] transition-all duration-500 ease-in-out"
          style={{
            width: "126px",
            left: activeTab === "인기글"
              ? "0px"
              : activeTab === "꿀조합"
              ? "calc(50% - 63px)"
              : "calc(100% - 126px)"
          }}
        />
      </div>

      {/* Scrollable Post List */}
      <div className="flex-1 overflow-y-auto">
        {filteredPosts.map((post) => (
          <div
            key={post.postId}
            className="relative w-full border-b border-gray-200 h-[186.51px] hover:bg-gray-50 transition-colors"
            onClick={() => router.push(`/community/${post.postId}`)}
          >
            <div className="absolute top-[18.83px] left-[18.34px] w-[37.7px] h-[38.34px] bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="absolute top-[23.83px] left-[60.12px] text-[12px] text-[#5C5C5C] font-semibold">
              {post.authorName}
            </div>
            <div className="absolute top-[65.28px] left-[23.44px] text-[14px] text-black font-semibold">
              {post.title}
            </div>
            <div className="absolute top-[93.25px] left-[23.44px] text-[14px] text-black font-normal">
              {post.content}
            </div>
            <div className="absolute top-[150.24px] left-[332px] text-[12px] text-[#BFBFBF] font-semibold">
              {post.createdAt}
            </div>
            <div className="absolute top-[144.03px] left-[23.44px] flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="w-4 h-4" />
              <span>{post.likeCount}</span>
              <MessageCircle className="w-4 h-4 ml-2" />
              <span>{post.comments}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => router.push("/community/create")}
        className="absolute bottom-2 right-2 w-[65px] h-[65px] bg-red-600 rounded-full flex items-center justify-center"
      >
        <Plus className="w-8 h-8 text-white" />
      </button>
    </div>
  )
}
