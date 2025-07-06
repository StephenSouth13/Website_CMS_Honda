import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertUserSchema } from "@shared/schema";
import { Link } from "wouter";
import { Bike, Eye, EyeOff, Mail, Lock, User, Phone, Check } from "lucide-react";
import type { InsertUser } from "@shared/schema";

// Extend the schema to include password confirmation
const registerSchema = insertUserSchema.extend({
  confirmPassword: insertUserSchema.shape.password,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type RegisterFormData = InsertUser & { confirmPassword: string };

export default function RegisterPage() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      const response = await apiRequest("POST", "/api/register", data);
      return response.json();
    },
    onSuccess: (user) => {
      toast({
        title: "Đăng ký thành công!",
        description: `Chào mừng ${user.fullName} đến với Honda Mỹ Huyền`,
      });
      setIsSuccess(true);
    },
    onError: (error: any) => {
      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";
      
      if (error.message.includes("400")) {
        errorMessage = "Tên đăng nhập hoặc email đã tồn tại.";
      }
      
      toast({
        title: "Đăng ký thất bại",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  if (isSuccess) {
    return (
      <div className="py-20 bg-honda-gray-light min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-honda-black mb-4">
                Đăng ký thành công!
              </h2>
              <p className="text-honda-gray mb-8">
                Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.
              </p>
              <Link href="/login">
                <Button className="btn-honda text-white w-full">
                  Đăng nhập ngay
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-honda-gray-light min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Bike className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-honda-black">
                Đăng ký tài khoản
              </CardTitle>
              <p className="text-honda-gray">
                Tạo tài khoản Honda Mỹ Huyền để nhận nhiều ưu đãi
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Họ và tên *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập họ và tên đầy đủ"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên đăng nhập *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập tên đăng nhập"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Số điện thoại</span>
                        </FormLabel>
                        <FormControl>
                          <Input
  type="tel"
  placeholder="Nhập số điện thoại"
  {...field}
  value={field.value ?? ""}
/>
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
                          <span>Mật khẩu *</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Nhập mật khẩu"
                              {...field}
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Lock className="h-4 w-4" />
                          <span>Xác nhận mật khẩu *</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Nhập lại mật khẩu"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
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
                    disabled={registerMutation.isPending}
                    className="w-full btn-honda text-white py-3 font-semibold"
                  >
                    {registerMutation.isPending ? "Đang tạo tài khoản..." : "Đăng ký"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-honda-gray">
                  Đã có tài khoản?{" "}
                  <Link href="/login">
                    <span className="text-honda-red hover:underline cursor-pointer font-medium">
                      Đăng nhập ngay
                    </span>
                  </Link>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-honda-black mb-3">
                  Lợi ích khi đăng ký tài khoản:
                </h4>
                <ul className="space-y-2 text-sm text-honda-gray">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Theo dõi lịch sử mua hàng và bảo hành</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Nhận thông báo khuyến mãi đặc biệt</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Đặt lịch bảo trì và sửa chữa online</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
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
