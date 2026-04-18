import Link from "next/link";
import { Home, Search, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-brand-cream">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-serif font-bold text-primary/20 mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-brand-dark mb-3 font-serif">
          页面走丢了
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          您要找的页面可能已经被移除、更名，或暂时不可用。
          <br />
          不如去发现更多旅居好去处？
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            返回首页
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-colors font-medium"
          >
            <Search className="w-5 h-5" />
            搜索房源
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
          >
            <MapPin className="w-5 h-5" />
            探索目的地
          </Link>
        </div>
      </div>
    </div>
  );
}
