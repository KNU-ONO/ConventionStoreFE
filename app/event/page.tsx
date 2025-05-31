"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import axios from "axios"

export default function EventPage() {
  const [activeStore, setActiveStore] = useState("CU")
  const [activeCategory, setActiveCategory] = useState("1+1")
  const [products, setProducts] = useState([])

  const storeToId: Record<string, number> = {
    CU: 1,
    GS25: 2,
    세븐일레븐: 3,
  }

  const categoryToEnum: Record<string, string | null> = {
    "1+1": "ONEPLUS",
    "2+1": "TWOPLUS",
    전체: null,
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: any = {}
        const franchiseId = storeToId[activeStore]
        const discountType = categoryToEnum[activeCategory]

        if (franchiseId) params.franchiseId = franchiseId
        if (discountType) params.discountType = discountType

        const res = await axios.get("http://localhost:8080/api/items", { params })
        setProducts(res.data.filter(data => data.discountType != "NONE"))
      } catch (err) {
        console.error("❌ 상품 불러오기 실패:", err)
      }
    }

    fetchProducts()
  }, [activeStore, activeCategory])

  return (
    <div
      className="relative bg-white overflow-hidden mx-auto"
      style={{ width: "375px", height: "812px" }}
    >
      {/* Header */}
      <div
        className="absolute flex items-center justify-between"
        style={{ width: "375px", top: "54px", height: "37px" }}
      >
        <button
          onClick={() => window.history.back()}
          className="absolute"
          style={{ left: "9px", width: "37px", height: "37px" }}
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1
          className="absolute text-black"
          style={{
            width: "59px",
            height: "27px",
            left: "calc(50% - 59px/2)",
            fontFamily: "Pretendard",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "27px",
            letterSpacing: "-0.015em",
          }}
        >
          할인행사
        </h1>
      </div>

      {/* Store Tabs */}
      <div className="absolute" style={{ top: "122px", width: "375px", height: "27px" }}>
        {["CU", "GS25", "세븐일레븐"].map((store, idx) => (
          <button
            key={store}
            onClick={() => setActiveStore(store)}
            className="absolute transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              left: idx === 0 ? "49px" : idx === 1 ? "calc(47% - 21px)" : "271px",
              width: store.length * 16 + "px",
              height: "27px",
              fontFamily: "Pretendard",
              fontWeight: activeStore === store ? 600 : 400,
              fontSize: "16px",
              lineHeight: "27px",
              color: "#000000",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {store}
          </button>
        ))}
      </div>

      {/* Active Tab Indicator */}
      <div className="absolute" style={{ top: "165px", width: "375px" }}>
        <div
          className="absolute"
          style={{
            width: "375px",
            borderBottom: "1px solid #DBDBDB",
          }}
        />
        <div
          className="absolute transition-all duration-300 ease-in-out"
          style={{
            width: "126px",
            height: "2px",
            background: "#B81E22",
            top: "-2px",
            left:
              activeStore === "CU"
                ? "0px"
                : activeStore === "GS25"
                ? "calc(50% - 63px)"
                : "calc(100% - 126px)",
          }}
        />
      </div>

      {/* Category Tabs */}
      <div
        className="absolute"
        style={{
          top: "165px",
          width: "375px",
          height: "45px",
          background: "#F7F7F7",
        }}
      >
        {["전체", "1+1", "2+1"].map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="absolute transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              top: "7px",
              left: `${i === 0 ? 40 : i === 1 ? 160 : 270}px`,
              width: "50px",
              height: "27px",
              background: activeCategory === cat ? "#FFDBDC" : "transparent",
              color: activeCategory === cat ? "#B81E22" : "#C4C4C4",
              fontWeight: 600,
              fontSize: "16px",
              border: "none",
              borderRadius: "13px",
              fontFamily: "Pretendard",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div
        className="absolute overflow-y-auto"
        style={{ top: "210px", width: "375px", height: "602px" }}
      >
        <div className="transition-all duration-500 ease-in-out">
          {products.map((product: any, index) => (
            <div
              key={product.itemId}
              className="relative transition-all duration-300 ease-in-out hover:bg-gray-50"
              style={{
                width: "375px",
                height: "150.5px",
                background: "#FFFFFF",
                animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Product Image */}
              <div
                className="absolute transition-transform duration-300 hover:scale-105"
                style={{ left: "27px", top: "30px", width: "100px", height: "100px" }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.itemName}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Badge */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: "188px",
                  top: "27px",
                  width: "47px",
                  height: "27px",
                  background: product.discountType === "ONEPLUS" ? "#B81E22" : "#FF6B35",
                  borderRadius: "13px",
                  color: "#FFF",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {product.discountType === "ONEPLUS" ? "1+1" : "2+1"}
              </div>

              {/* Name */}
              <div
                className="absolute"
                style={{
                  left: "140px",
                  top: "70px",
                  fontSize: "17px",
                  fontWeight: 400,
                  color: "#000",
                  fontFamily: "Pretendard",
                }}
              >
                {product.itemName}
              </div>

              {/* Price */}
              <div
                className="absolute"
                style={{
                  left: "140px",
                  top: "100px",
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#000",
                  fontFamily: "Pretendard",
                }}
              >
                {product.price.toLocaleString()} 원
              </div>

              {/* Divider */}
              {index < products.length - 1 && (
                <div
                  className="absolute"
                  style={{
                    left: "calc(50% - 160px)",
                    top: "150px",
                    width: "320px",
                    borderBottom: "0.5px solid #D3D3D3",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}
