"use client"

export default function HotPostsList() {
  const hotPosts = [
    {
      id: 1,
      rank: 1,
      title: "니네가 생각하는 편의점 도시락 1티어는 뭐임",
      subtitle: "난 혜자도시락",
    },
    {
      id: 2,
      rank: 2,
      title: "하 야식 먹 말",
      subtitle: "편의점 갈까말까 진짜 ㅈㄴ 고민된다",
    },
    {
      id: 3,
      rank: 3,
      title: "바나나 우유 유통기한 7일 지났는데",
      subtitle: "먹어도 되나? 배탈 나려나",
    },
  ]

  return (
    <div className="relative" style={{ width: "323px", height: "204px" }}>
      {hotPosts.map((post, index) => (
        <button
          key={post.id}
          onClick={() => (window.location.href = `/community/${post.id}`)}
          className="absolute flex items-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            width: "323px",
            height: "57px",
            left: "0px",
            top: `${index * 68}px`,
            backgroundColor: "#F6F6F6",
            borderRadius: "8px",
            padding: "12px",
            boxSizing: "border-box",
          }}
        >
          {/* 순위 숫자 */}
          <div
            className="absolute flex items-center"
            style={{
              width: "16px",
              height: "30px",
              left: "15px",
              top: "9px",
              fontFamily: "Pretendard",
              fontWeight: 600,
              fontSize: "25px",
              lineHeight: "30px",
              color: "#000000",
              letterSpacing: "-0.015em",
            }}
          >
            {post.rank}
          </div>

          {/* 텍스트 영역 */}
          <div
            className="absolute"
            style={{
              left: "40px",
              top: "12px",
              width: "253px",
              height: "36px",
            }}
          >
            {/* 제목 */}
            <div
              className="absolute flex items-center"
              style={{
                width: "253px",
                height: "18px",
                left: "0px",
                top: "0px",
                fontFamily: "Pretendard",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "18px",
                color: "#000000",
                letterSpacing: "-0.015em",
              }}
            >
              {post.title}
            </div>

            {/* 부제목 */}
            <div
              className="absolute flex items-center"
              style={{
                height: "14px",
                left: "0px",
                top: "22px",
                fontFamily: "Pretendard",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "14px",
                color: "#000000",
                opacity: 0.5,
                letterSpacing: "-0.015em",
              }}
            >
              {post.subtitle}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
