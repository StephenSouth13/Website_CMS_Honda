import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { Motorcycle } from "@shared/schema";

interface ProductCardProps {
  motorcycle: Motorcycle;
}

export default function ProductCard({ motorcycle }: ProductCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN").format(parseInt(price)) + "đ";
  };

  const getBadgeColor = () => {
    if (motorcycle.isNew) return "bg-honda-red text-white";
    return "bg-green-500 text-white";
  };

  const getBadgeText = () => {
    if (motorcycle.isNew) return "Mới";
    return "Khuyến mãi";
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
      <div className="aspect-video relative">
        <img
          src={motorcycle.imageUrl || ""}
          alt={motorcycle.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-honda-black">{motorcycle.name}</h3>
          <Badge className={getBadgeColor()}>{getBadgeText()}</Badge>
        </div>
        <p className="text-honda-gray mb-4 line-clamp-2">{motorcycle.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-honda-red">
            {formatPrice(motorcycle.price)}
          </span>
          {motorcycle.originalPrice && (
            <span className="text-sm text-honda-gray line-through">
              {formatPrice(motorcycle.originalPrice)}
            </span>
          )}
        </div>
        <Link href={`/product/${motorcycle.slug}`}>
          <Button className="w-full btn-honda text-white">
            <Eye className="mr-2 h-4 w-4" />
            Xem chi tiết
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
