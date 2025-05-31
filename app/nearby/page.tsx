"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import Image from "next/image"

export default function NearbyPage() {
  const [selectedStore, setSelectedStore] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const stores = [
    {
      id: 1,
      name: "GS25 북구신화점",
      address: "대구 북구 경대로5길 24-1",
      image: "/images/store_1.jpg",
      type: "GS25",
    },
    {
      id: 2,
      name: "CU 경북대백문점",
      address: "대구 북구 대현로길 39 (산격동)",
      image: "/images/store_2.jpg",
      type: "CU",
    },
    {
      id: 3,
      name: "세븐일레븐 대구북현점",
      address: "대구 북구 영진로 7",
      image: "/images/store_3.jpg",
      type: "세븐일레븐",
    },
  ]

  if (selectedStore) {
    return (
      <div
        className="relative bg-white overflow-hidden mx-auto"
        style={{
          width: "375px",
          height: "812px",
        }}
      >
        {/* Header */}
        <div
          className="absolute flex items-center justify-between"
          style={{ width: "375px", top: "54px", height: "37px" }}
        >
          {/* Back Button */}
          <button
            onClick={() => setSelectedStore(null)}
            className="absolute"
            style={{
              left: "9px",
              top: "0px",
              width: "37px",
              height: "37px",
            }}
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>

          {/* Title */}
          <h1
            className="absolute text-black flex items-center"
            style={{
              width: "59px",
              height: "27px",
              left: "calc(50% - 59px/2)",
              top: "5px",
              fontFamily: "Pretendard",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "27px",
              letterSpacing: "-0.015em",
            }}
          >
            매장찾기
          </h1>
        </div>

        {/* Store Image */}
        <div
          className="absolute"
          style={{
            width: "375px",
            height: "280px",
            left: "0px",
            top: "110px",
          }}
        >
          <Image
            src={selectedStore.image || "/placeholder.svg"}
            alt={selectedStore.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Store Info */}
        <div
          className="absolute"
          style={{
            width: "375px",
            left: "0px",
            top: "410px",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontFamily: "Pretendard",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "30px",
              color: "#000000",
              marginBottom: "8px",
            }}
          >
            {selectedStore.name}
          </h2>
          <p
            style={{
              fontFamily: "Pretendard",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "20px",
              color: "#666666",
              marginBottom: "20px",
            }}
          >
            {selectedStore.address}
          </p>
        </div>

        {/* Kakao Map */}
        <div
          className="absolute"
          style={{
            width: "375px",
            height: "300px",
            left: "0px",
            top: "512px",
          }}
        >
          <iframe
            src="https://map.kakao.com/link/map/GS25 북구신화점,35.8914,128.6014"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative bg-white overflow-hidden mx-auto"
      style={{
        width: "375px",
        height: "812px",
      }}
    >
      {/* Header */}
      <div
        className="absolute flex items-center justify-between"
        style={{ width: "375px", top: "54px", height: "37px" }}
      >
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute"
          style={{
            left: "9px",
            top: "0px",
            width: "37px",
            height: "37px",
          }}
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>

        {/* Title */}
        <h1
          className="absolute text-black flex items-center"
          style={{
            width: "59px",
            height: "27px",
            left: "calc(50% - 59px/2)",
            top: "5px",
            fontFamily: "Pretendard",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "27px",
            letterSpacing: "-0.015em",
          }}
        >
          매장찾기
        </h1>
      </div>

      {/* Search Bar */}
      <div
        className="absolute"
        style={{
          width: "343px",
          height: "40px",
          left: "16px",
          top: "110px",
          background: "#F5F5F5",
          borderRadius: "8px",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="매장명을 검색하세요"
          className="flex-1 bg-transparent outline-none text-sm"
          style={{
            fontFamily: "Pretendard",
            fontSize: "14px",
            color: "#333333",
          }}
        />
      </div>

      {/* Filter Tabs */}
      <div
        className="absolute flex"
        style={{
          left: "16px",
          top: "170px",
          gap: "20px",
        }}
      >
        <button
          style={{
            fontFamily: "Pretendard",
            fontWeight: 600,
            fontSize: "16px",
            color: "#000000",
            background: "transparent",
            border: "none",
            borderBottom: "2px solid #000000",
            paddingBottom: "4px",
          }}
        >
          가까운 매장
        </button>
        <button
          style={{
            fontFamily: "Pretendard",
            fontWeight: 400,
            fontSize: "16px",
            color: "#999999",
            background: "transparent",
            border: "none",
            paddingBottom: "4px",
          }}
        >
          자주 가는 매장
        </button>
      </div>

      {/* Store List */}
      <div
        className="absolute"
        style={{
          top: "220px",
          width: "375px",
          height: "592px",
          overflowY: "auto",
        }}
      >
        {stores.map((store, index) => (
          <button
            key={store.id}
            onClick={() => setSelectedStore(store)}
            className="w-full text-left hover:bg-gray-50 transition-colors"
            style={{
              padding: "16px",
              borderBottom: "1px solid #F0F0F0",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Store Image */}
            <div
              className="relative rounded-lg overflow-hidden mr-4"
              style={{
                width: "80px",
                height: "80px",
                flexShrink: 0,
              }}
            >
              <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
            </div>

            {/* Store Info */}
            <div className="flex-1">
              <h3
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#000000",
                  marginBottom: "4px",
                }}
              >
                {store.name}
              </h3>
              <p
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#666666",
                }}
              >
                {store.address}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
