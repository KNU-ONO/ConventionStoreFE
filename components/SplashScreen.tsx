"use client"

import { useEffect, useState } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 300)
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-50 transition-opacity duration-300 opacity-0" />
    )
  }

  return (
    <div className="fixed inset-0 z-50 transition-opacity duration-300 bg-[#b91c1c]">
      {/* 화면 중앙 정렬, iPhone 375x812 기준 */}
      <img
        src="/images/main%201.png"
        alt="Splash"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none w-[375px] h-[812px]"
      />
    </div>
  )
}
