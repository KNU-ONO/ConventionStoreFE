"use client"
import { MapPin } from "lucide-react"

interface StoreMarkerProps {
  type: "CU" | "GS25" | "세븐일레븐" | "이마트24" | string
  isSelected?: boolean
  onClick?: () => void
}

export default function StoreMarker({ type, isSelected = false, onClick }: StoreMarkerProps) {
  const getColor = () => {
    switch (type) {
      case "CU":
        return "bg-purple-600"
      case "GS25":
        return "bg-blue-600"
      case "세븐일레븐":
        return "bg-green-600"
      case "이마트24":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div
      className={`relative cursor-pointer transition-transform ${isSelected ? "scale-125 z-10" : ""}`}
      onClick={onClick}
    >
      <div className={`${getColor()} p-1 rounded-full text-white`}>
        <MapPin className="h-5 w-5" />
      </div>
      {isSelected && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
          {type}
        </div>
      )}
    </div>
  )
}
