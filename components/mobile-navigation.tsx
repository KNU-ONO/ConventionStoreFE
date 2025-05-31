"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Package, Users, Tag } from "lucide-react"

export default function MobileNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "주변 편의점 찾기",
      href: "/nearby",
      icon: Home,
    },
    {
      name: "골조합 찾기",
      href: "/combinations",
      icon: Package,
    },
    {
      name: "게시판",
      href: "/community",
      icon: Users,
    },
    {
      name: "메뉴 4",
      href: "/menu4",
      icon: Tag,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t md:hidden">
      <div className="grid h-full grid-cols-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center text-xs font-medium",
              pathname === item.href ? "text-red-600" : "text-gray-500 hover:text-red-600",
            )}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
