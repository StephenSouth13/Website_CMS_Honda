import { Phone, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function FloatingButtons() {
  return (
    <div className="floating-btn space-y-4">
      {/* Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Zalo Chat Button */}
      <a
        href={COMPANY_INFO.social.zalo}
        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
