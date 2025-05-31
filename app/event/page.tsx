"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function EventPage() {
  const [activeStore, setActiveStore] = useState("CU")
  const [activeCategory, setActiveCategory] = useState("1+1")

  const products = [
    {
      id: 1,
      name: "롯데)밀키스P500ml",
      price: "2,200 원",
      category: "1+1",
      store: "CU",
      image: "/placeholder.svg?height=107&width=36&query=milk bottle",
    },
    {
      id: 2,
      name: "농심)멘토스레인보우",
      price: "900 원",
      category: "1+1",
      store: "CU",
      image: "/placeholder.svg?height=37&width=120&query=mentos candy",
    },
    {
      id: 3,
      name: "동원)양반호박죽",
      price: "4,500 원",
      category: "1+1",
      store: "CU",
      image: "/placeholder.svg?height=89&width=127&query=pumpkin porridge",
    },
    {
      id: 4,
      name: "동원)양반영양닭죽",
      price: "4,500 원",
      category: "1+1",
      store: "CU",
      image: "/placeholder.svg?height=78&width=117&query=chicken porridge",
    },
    {
      id: 5,
      name: "코카콜라 500ml",
      price: "1,800 원",
      category: "2+1",
      store: "CU",
      image: "/placeholder.svg?height=107&width=36&query=coca cola bottle",
    },
    {
      id: 6,
      name: "새우깡 90g",
      price: "1,500 원",
      category: "2+1",
      store: "CU",
      image: "/placeholder.svg?height=37&width=120&query=shrimp crackers",
    },
  ]

  const filteredProducts = products.filter(
    (product) => product.store === activeStore && (activeCategory === "전체" || product.category === activeCategory),
  )

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
            top: "(0-44)px",
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
            top: "(5-44)px",
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
        {/* CU */}
        <button
          onClick={() => setActiveStore("CU")}
          className="absolute transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            width: "24px",
            height: "27px",
            left: "49px",
            top: "0px",
            fontFamily: "Pretendard",
            fontWeight: activeStore === "CU" ? 600 : 400,
            fontSize: "16px",
            lineHeight: "27px",
            display: "flex",
            alignItems: "center",
            letterSpacing: "-0.015em",
            color: "#000000",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          CU
        </button>

        {/* GS25 */}
        <button
          onClick={() => setActiveStore("GS25")}
          className="absolute transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            width: "42px",
            height: "27px",
            left: "calc(50% - 42px/2 - 2.5px)",
            top: "0px",
            fontFamily: "Pretendard",
            fontWeight: activeStore === "GS25" ? 600 : 400,
            fontSize: "16px",
            lineHeight: "27px",
            display: "flex",
            alignItems: "center",
            letterSpacing: "-0.015em",
            color: "#000000",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          GS25
        </button>

        {/* 세븐일레븐 */}
        <button
          onClick={() => setActiveStore("세븐일레븐")}
          className="absolute transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            width: "73px",
            height: "27px",
            left: "276px",
            top: "0px",
            fontFamily: "Pretendard",
            fontWeight: activeStore === "세븐일레븐" ? 600 : 400,
            fontSize: "16px",
            lineHeight: "27px",
            display: "flex",
            alignItems: "center",
            letterSpacing: "-0.015em",
            color: "#000000",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          세븐일레븐
        </button>
      </div>

      
      {/* Tab Border and Indicator */}
<div className="absolute" style={{ top: "165px", width: "375px" }}>
  {/* Tab Underline */}
  <div
    className="absolute"
    style={{
      width: "377px",
      height: "0px",
      left: "0px",
      top: "0px",
      border: "1px solid #DBDBDB",
    }}
  />

  {/* Active Tab Sliding Indicator */}
  <div
    className="absolute transition-all duration-300 ease-in-out"
    style={{
      width: "126px",
      height: "2px",
      top: "-2px",
      background: "#B81E22",
      left:
        activeStore === "CU"
          ? "0px"
          : activeStore === "GS25"
          ? "calc(50% - 63px)"
          : "calc(100% - 126px)",
    }}
  />
</div>

      {/* Category Filter */}
      <div
        className="absolute"
        style={{
          width: "375px",
          height: "45px",
          left: "0px",
          top: "165px",
          background: "#F7F7F7",
        }}
      >
        {/* 전체 */}
        <button
          onClick={() => setActiveCategory("전체")}
          className="absolute transition-all duration-300 ease-out hover:scale-110 active:scale-95"
          style={{
            width: "30px",
            height: "27px",
            left: "calc(50% - 3px/2 - 138.5px)",
            top: "7px",
            fontFamily: "Pretendard",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "27px",
            display: "flex",
            alignItems: "center",
            letterSpacing: "-0.015em",
            color: activeCategory === "전체" ? "#B81E22" : "#C4C4C4",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            transform: activeCategory === "전체" ? "scale(1.1)" : "scale(1)",
          }}
        >
          전체
        </button>

        {/* 1+1 */}
        <div className="absolute" style={{ left: "calc(50% - 51px/2)", top: "7px" }}>
          <div
            className="absolute transition-all duration-500 ease-out"
            style={{
              width: activeCategory === "1+1" ? "51px" : "27px",
              height: "27px",
              left: activeCategory === "1+1" ? "0px" : "12px",
              top: "0px",
              background: activeCategory === "1+1" ? "#FFDBDC" : "transparent",
              borderRadius: "13px",
              transform: activeCategory === "1+1" ? "scale(1.05)" : "scale(1)",
              boxShadow: activeCategory === "1+1" ? "0 2px 8px rgba(184, 30, 34, 0.2)" : "none",
            }}
          />
          <button
            onClick={() => setActiveCategory("1+1")}
            className="absolute transition-all duration-300 ease-out hover:scale-110 active:scale-95"
            style={{
              width: "27px",
              height: "27px",
              left: "calc(50% + 20px/2)",
              top: "0px",
              fontFamily: "Pretendard",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "27px",
              display: "flex",
              alignItems: "center",
              letterSpacing: "-0.015em",
              color: activeCategory === "1+1" ? "#B81E22" : "#C4C4C4",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              zIndex: 1,
              transform: activeCategory === "1+1" ? "scale(1.1)" : "scale(1)",
            }}
          >
            1+1
          </button>
        </div>

        {/* 2+1 */}
        <div className="absolute" style={{ left: "calc(50% - 51px/2 + 121px)", top: "7px" }}>
          <div
            className="absolute transition-all duration-500 ease-out"
            style={{
              width: activeCategory === "2+1" ? "51px" : "29px",
              height: "27px",
              left: activeCategory === "2+1" ? "0px" : "11px",
              top: "0px",
              background: activeCategory === "2+1" ? "#FFDBDC" : "transparent",
              borderRadius: "13px",
              transform: activeCategory === "2+1" ? "scale(1.05)" : "scale(1)",
              boxShadow: activeCategory === "2+1" ? "0 2px 8px rgba(184, 30, 34, 0.2)" : "none",
            }}
          />
          <button
            onClick={() => setActiveCategory("2+1")}
            className="absolute transition-all duration-300 ease-out hover:scale-110 active:scale-95"
            style={{
              width: "29px",
              height: "27px",
              left: "calc(50% + 25px/2)",
              top: "0px",
              fontFamily: "Pretendard",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "27px",
              display: "flex",
              alignItems: "center",
              letterSpacing: "-0.015em",
              color: activeCategory === "2+1" ? "#B81E22" : "#C4C4C4",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              zIndex: 1,
              transform: activeCategory === "2+1" ? "scale(1.1)" : "scale(1)",
            }}
          >
            2+1
          </button>
        </div>
      </div>

      {/* Product List */}
      <div
        className="absolute overflow-y-auto"
        style={{
          top: "210px",
          width: "375px",
          height: "602px",
        }}
      >
        <div className="transition-all duration-500 ease-in-out">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="relative transition-all duration-300 ease-in-out hover:bg-gray-50"
              style={{
                width: "375px",
                height: "150.5px",
                background: "#FFFFFF",
                marginBottom: index < filteredProducts.length - 1 ? "0px" : "0px",
                opacity: 1,
                transform: "translateY(0px)",
                animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Product Image */}
              <div
                className="absolute transition-transform duration-300 hover:scale-105"
                style={{
                  left: product.id === 1 || product.id === 5 ? "75px" : "27px",
                  top:
                    product.id === 1 || product.id === 5
                      ? "21px"
                      : product.id === 2 || product.id === 6
                        ? "57px"
                        : product.id === 3
                          ? "37px"
                          : "38px",
                  width:
                    product.id === 1 || product.id === 5
                      ? "36px"
                      : product.id === 2 || product.id === 6
                        ? "120px"
                        : product.id === 3
                          ? "127px"
                          : "117px",
                  height:
                    product.id === 1 || product.id === 5
                      ? "107px"
                      : product.id === 2 || product.id === 6
                        ? "37px"
                        : product.id === 3
                          ? "89px"
                          : "78px",
                }}
              >
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
              </div>

              {/* Badge */}
              <div
                className="absolute transition-all duration-300 hover:scale-110"
                style={{ left: "188px", top: "27px" }}
              >
                {/* Badge Background */}
                <div
                  className="absolute"
                  style={{
                    width: "47px",
                    height: "27px",
                    left: "0px",
                    top: "0px",
                    background: product.category === "1+1" ? "#B81E22" : "#FF6B35",
                    borderRadius: "13px",
                  }}
                />
                {/* Badge Text */}
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    width: "47px",
                    height: "27px",
                    left: "0px",
                    textAlign: "center",
                    fontFamily: "Pretendard",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "27px",
                    letterSpacing: "-0.015em",
                    color: "#FFFFFF",
                  }}
                >
                  {product.category}
                </div>
                {/* Badge Arrow */}
                <div
                  className="absolute"
                  style={{
                    width: "11px",
                    height: "11px",
                    left: "25.53px",
                    top: "19px",
                    background: product.category === "1+1" ? "#B81E22" : "#FF6B35",
                    borderRadius: "0.5px",
                    transform: "rotate(45deg)",
                  }}
                />
              </div>

              {/* Product Name */}
              <div
                className="absolute"
                style={{
                  width: "166px",
                  height: "29px",
                  left: "calc(50% - 166px/2 + 83.5px)",
                  top: "67px",
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontSize: "17px",
                  lineHeight: "27px",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "-0.015em",
                  color: "#000000",
                }}
              >
                {product.name}
              </div>

              {/* Product Price */}
              <div
                className="absolute"
                style={{
                  width: "135px",
                  height: "29px",
                  left: "calc(50% - 135px/2 + 68px)",
                  top: "94px",
                  fontFamily: "Pretendard",
                  fontWeight: 600,
                  fontSize: "19px",
                  lineHeight: "27px",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "-0.015em",
                  color: "#000000",
                }}
              >
                {product.price}
              </div>

              {/* Divider Line */}
              {index < filteredProducts.length - 1 && (
                <div
                  className="absolute"
                  style={{
                    width: "321.5px",
                    height: "0px",
                    left: "calc(50% - 321.5px/2 + 0.25px)",
                    top: "150px",
                    border: "0.5px solid #D3D3D3",
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
