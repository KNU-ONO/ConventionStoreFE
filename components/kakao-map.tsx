"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

declare global {
  interface Window {
    kakao: any
  }
}

interface KakaoMapProps {
  width?: string
  height?: string
  stores?: {
    id: number
    name: string
    address: string
    lat: number
    lng: number
    type: string
  }[]
  onStoreSelect?: (store: any) => void
}

export default function KakaoMap({ width = "100%", height = "400px", stores = [], onStoreSelect }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=KAKAO_MAP_API_KEY&autoload=false&libraries=services`
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          initializeMap()
        }
      })
    }

    script.onerror = () => {
      setError("카카오맵 로드 중 오류가 발생했습니다.")
      setIsLoading(false)
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다:", error)
          // 기본 위치 설정 (서울 강남)
          setUserLocation({
            lat: 37.498095,
            lng: 127.02761,
          })
        },
      )
    } else {
      setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.")
      // 기본 위치 설정 (서울 강남)
      setUserLocation({
        lat: 37.498095,
        lng: 127.02761,
      })
    }
  }, [])

  // 지도 초기화
  const initializeMap = () => {
    if (!userLocation) return

    try {
      const options = {
        center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        level: 3,
      }

      const newMap = new window.kakao.maps.Map(mapRef.current, options)
      setMap(newMap)

      // 사용자 위치 마커 추가
      const userMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        map: newMap,
      })

      // 사용자 위치 인포윈도우 추가
      const userInfowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;font-size:12px;">내 위치</div>',
      })
      userInfowindow.open(newMap, userMarker)

      setIsLoading(false)
    } catch (err) {
      console.error("지도 초기화 중 오류가 발생했습니다:", err)
      setError("지도를 불러오는데 실패했습니다.")
      setIsLoading(false)
    }
  }

  // 사용자 위치가 변경되면 지도 다시 초기화
  useEffect(() => {
    if (userLocation && window.kakao && window.kakao.maps) {
      initializeMap()
    }
  }, [userLocation])

  // 편의점 마커 추가
  useEffect(() => {
    if (!map || !stores.length) return

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null))
    const newMarkers: any[] = []

    // 편의점 마커 이미지 설정
    const getMarkerImage = (type: string) => {
      let imageSrc
      switch (type) {
        case "CU":
          imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
          break
        case "GS25":
          imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
          break
        case "세븐일레븐":
          imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
          break
        default:
          imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
      }

      const imageSize = new window.kakao.maps.Size(24, 35)
      return new window.kakao.maps.MarkerImage(imageSrc, imageSize)
    }

    // 각 편의점에 마커 추가
    stores.forEach((store) => {
      const markerPosition = new window.kakao.maps.LatLng(store.lat, store.lng)
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
        title: store.name,
        image: getMarkerImage(store.type),
      })

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;width:150px;">
                    <strong>${store.name}</strong><br/>
                    <span style="font-size:11px;color:#888;">${store.address}</span>
                  </div>`,
      })

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker)
        if (onStoreSelect) {
          onStoreSelect(store)
        }
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)

    // 모든 마커가 보이도록 지도 범위 재설정
    if (newMarkers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds()

      // 사용자 위치도 범위에 포함
      if (userLocation) {
        bounds.extend(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng))
      }

      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition())
      })
      map.setBounds(bounds)
    }
  }, [map, stores, userLocation])

  // 현재 위치로 이동 함수
  const moveToCurrentLocation = () => {
    if (!map || !userLocation) return

    map.setCenter(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng))
    map.setLevel(3)
  }

  if (error) {
    return (
      <div style={{ width, height }} className="flex items-center justify-center bg-gray-100 rounded-lg border">
        <div className="text-center p-4">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div style={{ width, height }} className="flex items-center justify-center bg-gray-100 rounded-lg border">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">지도를 불러오는 중...</span>
        </div>
      )}
      <div
        ref={mapRef}
        style={{ width, height, display: isLoading ? "none" : "block" }}
        className="rounded-lg border"
      ></div>
      {!isLoading && (
        <Button
          onClick={moveToCurrentLocation}
          className="absolute bottom-4 right-4 bg-white text-black hover:bg-gray-100 shadow-md"
          size="sm"
        >
          내 위치
        </Button>
      )}
    </div>
  )
}
