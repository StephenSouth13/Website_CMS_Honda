import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";
import { Bike, Eye, EyeOff, Mail, Lock } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập tên đăng nhập hoặc email"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface User {
  id: number;
  role: string | null;
  email: string;
  username: string;
  password: string;
  fullName: string;
  phone: string | null;
  createdAt: Date | null;
}

export default function LoginPage() {
  const { toast } = useToast();
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
  setIsLoading(true);
  try {
    const res = await apiRequest("POST", "/api/login", data); // ✅ Sửa tại đây
    const user: User = await res.json(); // 👈 giữ nguyên nếu apiRequest chỉ trả Response

    toast({
      title: "Đăng nhập thành công!",
      description: `Chào mừng ${user.fullName} trở lại Honda Mỹ Huyền`,
    });

    login(user);
    setLocation(user.role === "admin" ? "/admin" : "/");
  } catch (error: any) {
    let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại.";
    if (error.message?.includes("401")) {
      errorMessage = "Tên đăng nhập hoặc mật khẩu không chính xác.";
    }
    toast({
      title: "Đăng nhập thất bại",
      description: errorMessage,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="py-20 bg-honda-gray-light min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Bike className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-honda-black">Đăng nhập</CardTitle>
              <p className="text-honda-gray">Đăng nhập vào tài khoản Honda Mỹ Huyền của bạn</p>
            </CardHeader>

            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Tên đăng nhập hoặc Email</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên đăng nhập hoặc email" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Lock className="h-4 w-4" />
                          <span>Mật khẩu</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Nhập mật khẩu"
                              {...field}
                              value={field.value ?? ""}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-honda-gray" />
                              ) : (
                                <Eye className="h-4 w-4 text-honda-gray" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-honda text-white py-3 font-semibold"
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-honda-gray">
                  Chưa có tài khoản?{" "}
                  <Link href="/register">
                    <span className="text-honda-red hover:underline cursor-pointer font-medium">
                      Đăng ký ngay
                    </span>
                  </Link>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-honda-black mb-3">Lợi ích khi có tài khoản:</h4>
                <ul className="space-y-2 text-sm text-honda-gray">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-honda-red rounded-full"></div>
                    <span>Theo dõi lịch sử mua hàng và bảo hành</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-honda-red rounded-full"></div>
                    <span>Nhận thông báo khuyến mãi đặc biệt</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-honda-red rounded-full"></div>
                    <span>Đặt lịch bảo trì và sửa chữa online</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-honda-red rounded-full"></div>
                    <span>Hỗ trợ khách hàng ưu tiên</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}