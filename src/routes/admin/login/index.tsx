import { createFileRoute, useRouter, Navigate } from "@tanstack/react-router";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Header } from "~/components/ui/Header";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTRPC } from "~/trpc/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "~/stores/authStore";

export const Route = createFileRoute("/admin/login/")({
  component: AdminLoginPage,
});

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

function AdminLoginPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const { login, isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/blog" />;
  }

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
    },
  });

  const loginMutation = useMutation(trpc.adminLogin.mutationOptions({
    onSuccess: (data) => {
      login(data.token);
      toast.success('Successfully logged in!');
      router.navigate({ to: '/admin/blog' });
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    },
  }));

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Container className="py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                <p className="mt-2 text-gray-600">
                  Enter your admin password to access the publishing tools
                </p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...form.register('password')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter admin password..."
                  />
                  {form.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
