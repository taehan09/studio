// src/app/login/page.tsx
import { AuthProvider } from "@/context/auth-context";
import LoginForm from "@/components/login-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
       <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-primary">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
            <AuthProvider>
                <LoginForm />
            </AuthProvider>
        </CardContent>
      </Card>
    </div>
  );
}