import Link from "next/link"

export default function Footer() {
  return (
    <footer className="hidden md:block border-t bg-white">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-red-600">
              편의점
            </Link>
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} 편의점 상품 조합 서비스</span>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              이용약관
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              고객센터
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
