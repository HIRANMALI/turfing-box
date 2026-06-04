import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(190,242,100,0.1),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,_rgba(190,242,100,0.1),transparent_60%)]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md glass-card p-8 rounded-2xl animate-in fade-in zoom-in-95 duration-500">
          <Link 
            href="/login" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
            <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-secondary/50 border border-input rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
