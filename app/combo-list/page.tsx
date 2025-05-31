"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import axios from "axios"

type ComboItem = {
  itemId: number
  itemName: string
  imageUrl: string
  franchiseId: number
  discountType: string
  price: number
}

type Combo = {
  combinationId: number
  title: string
  franchiseId: number
  likeCount: number
  itemList: ComboItem[]
}

export default function ComboListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"인기순" | "등록순">("인기순")
  const [combos, setCombos] = useState<Combo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sortMap = {
    인기순: "POPULAR",
    등록순: "RECENT",
  }

  const getBannerSrc = (category: string | null) => {
    if (category === "HOT_CHALLENGE") return "/images/hot.png"
    if (category === "LOW_PRICE") return "/images/cheap.png"
    if (category === "DIET") return "/images/diet.png"
    if (category === "FAMOUS") return "/images/popular.png"
    if (category) return `/images/category-banners/${category}.png`
    return ""
  }

  useEffect(() => {
    const fetchCombos = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await axios.get("http://localhost:8080/api/combos", {
          params: {
            tagName: selectedCategory || undefined,
            sort: sortMap[sortOrder],
          },
        })
        console.log(res.data)
        setCombos(res.data)
      } catch (err) {
        setError("조합을 불러오는 데 실패했습니다.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCombos()
  }, [selectedCategory, sortOrder])

  return (
    <div className="relative bg-white overflow-hidden mx-auto" style={{ width: "375px", height: "812px" }}>
      {/* Header */}
      <div className="absolute" style={{ top: "58px", left: "9px", width: "37px", height: "37px" }}>
        <button onClick={() => window.history.back()}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
      </div>

      <h1
        className="absolute text-black flex items-center"
        style={{
          width: "44px",
          height: "27px",
          left: "calc(50% - 44px/2 + 0.5px)",
          top: "63px",
          fontFamily: "Pretendard",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "27px",
          letterSpacing: "-0.015em",
        }}
      >
        꿀조합
      </h1>

      {/* 카테고리 버튼들 */}
      {[
        { name: "LOW_PRICE", left: 19, icon: "group-36.png" },
        { name: "HOT_CHALLENGE", left: 105, icon: "group-37.png" },
        { name: "DIET", left: 191, icon: "group-38.png" },
        { name: "FAMOUS", left: 277, icon: "group-39.png" },
      ].map((cat) => (
        <button
          key={cat.name}
          onClick={() => setSelectedCategory(cat.name)}
          className="absolute transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ width: "80px", height: "80px", left: `${cat.left}px`, top: "111px" }}
        >
          <div className="relative w-full h-full rounded-lg bg-gray-100">
            <Image
              src={`/images/category-icons/${cat.icon}`}
              alt={cat.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </button>
      ))}

      {/* 대표 이미지 & 정렬 탭 */}
      {selectedCategory === null ? (
        <>
          <Image
            src="/images/combination_main.png"
            alt="오늘 뭐 먹노?"
            width={180}
            height={20}
            className="absolute"
            style={{ left: "calc(50% - 90px + 0.5px)", top: "220px" }}
          />
          <Image
            src="/images/comb_Frame.png"
            alt="실시간 HOT 꿀조합"
            width={200}
            height={22}
            className="absolute"
            style={{ left: "calc(50% - 100px)", top: "265px" }}
          />
        </>
      ) : (
        <>
          <Image
            src={getBannerSrc(selectedCategory)}
            alt={`${selectedCategory} 배너`}
            width={180}
            height={20}
            className="absolute"
            style={{ left: "calc(50% - 90px + 0.5px)", top: "220px" }}
          />

          {/* 정렬 탭 */}
          <div
            className="absolute"
            style={{
              top: "269px",
              left: "calc(50% - 93px)",
              width: "186px",
              height: "36px",
              borderRadius: "9999px",
              backgroundColor: "#F2F2F2",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              padding: "4px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "4px",
                left: sortOrder === "인기순" ? "4px" : "92px",
                width: "90px",
                height: "28px",
                borderRadius: "9999px",
                backgroundColor: "#B82424",
                transition: "left 0.3s ease",
                zIndex: 0,
              }}
            />
            {["인기순", "등록순"].map((label) => (
              <button
                key={label}
                onClick={() => setSortOrder(label as "인기순" | "등록순")}
                style={{
                  width: "90px",
                  height: "28px",
                  borderRadius: "9999px",
                  fontWeight: 700,
                  fontSize: "13px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: sortOrder === label ? "#FFFFFF" : "#000000",
                  zIndex: 1,
                  position: "relative",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 카드 리스트 */}
      {isLoading ? (
        <p className="absolute top-[320px] left-1/2 -translate-x-1/2 text-sm text-gray-500">불러오는 중...</p>
      ) : error ? (
        <p className="absolute top-[320px] left-1/2 -translate-x-1/2 text-sm text-red-500">{error}</p>
      ) : (
        combos.map((combo, index) => {
          const top = 305 + index * 170
          return (
            <div
              key={combo.combinationId}
              className="absolute"
              style={{ width: "324px", height: "150px", left: "26px", top: `${top}px` }}
            >
              <div
                className="absolute bg-gray-100 rounded-lg"
                style={{ width: "324px", height: "113.4px", top: "37px" }}
              />
              <div
                className="absolute text-black"
                style={{
                  left: "5px",
                  top: "10px",
                  fontFamily: "Pretendard",
                  fontWeight: 600,
                  fontSize: "15px",
                  letterSpacing: "-0.015em",
                }}
              >
                {combo.title}
              </div>

              {combo.itemList.slice(0, 3).map((item, i) => (
                <div
                  key={item.itemId}
                  className="absolute bg-white rounded-lg shadow-md overflow-hidden"
                  style={{
                    width: "91.8px",
                    height: "91.8px",
                    left: `${11.88 + i * 103.68}px`,
                    top: "47.8px",
                  }}
                >
                  <Image src={item.imageUrl} alt={item.itemName} width={92} height={92} className="object-cover" />
                </div>
              ))}
            </div>
          )
        })
      )}
    </div>
  )
}
