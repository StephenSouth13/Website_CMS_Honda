import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";
import { MOTORCYCLE_CATEGORIES } from "@/lib/constants";
import type { Motorcycle } from "@shared/schema";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: motorcycles, isLoading } = useQuery<Motorcycle[]>({
    queryKey: selectedCategory === "all" ? ["/api/motorcycles"] : [`/api/motorcycles?category=${selectedCategory}`],
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="py-20 bg-honda-gray-light min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
            Sản phẩm
          </h1>
          <p className="text-xl text-honda-gray max-w-2xl mx-auto">
            Khám phá bộ sưu tập xe máy Honda đa dạng với nhiều phân khúc và mức giá
          </p>
        </div>

        {/* Product Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={() => handleCategoryChange("all")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-honda-red text-white"
                : "bg-white text-honda-gray hover:bg-honda-red hover:text-white"
            }`}
          >
            Tất cả
          </Button>
          {MOTORCYCLE_CATEGORIES.map((category) => (
            <Button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === category.key
                  ? "bg-honda-red text-white"
                  : "bg-white text-honda-gray hover:bg-honda-red hover:text-white"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : motorcycles && motorcycles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {motorcycles.map((motorcycle) => (
              <ProductCard key={motorcycle.id} motorcycle={motorcycle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏍️</div>
            <h3 className="text-2xl font-bold text-honda-black mb-4">
              Không tìm thấy sản phẩm nào
            </h3>
            <p className="text-honda-gray mb-8">
              Hiện tại không có sản phẩm nào trong danh mục này. Vui lòng thử lại sau.
            </p>
            <Button
              onClick={() => handleCategoryChange("all")}
              className="btn-honda text-white"
            >
              Xem tất cả sản phẩm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
