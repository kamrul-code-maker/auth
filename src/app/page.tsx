"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, KeyRound, Users, Mail, Lock } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-900 p-6">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Hero Section */}
        <h1
          className={cn(
            "text-5xl md:text-5xl font-bold text-white drop-shadow-lg",
            font.className
          )}
        >
          🔐 Modern Auth System
        </h1>
        <p className="text-lg text-gray-100">
          Secure authentication with Next.js 15, NextAuth v5, and cutting-edge features like 2FA, Email Verification, Role Management & more.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="shadow-lg">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="shadow-lg"
            onClick={() => alert("Dummy login clicked")}
          >
            Sign In
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
        <FeatureCard
          icon={<ShieldCheck className="w-8 h-8 text-sky-500" />}
          title="Two-Factor Authentication"
          desc="Add an extra layer of security with email & 2FA verification."
        />
        <FeatureCard
          icon={<KeyRound className="w-8 h-8 text-green-500" />}
          title="OAuth Providers"
          desc="Login with Google, GitHub, or use email credentials."
        />
        <FeatureCard
          icon={<Users className="w-8 h-8 text-purple-500" />}
          title="Role Management"
          desc="Admins & users get custom access with role-based gates."
        />
        <FeatureCard
          icon={<Mail className="w-8 h-8 text-pink-500" />}
          title="Email Verification"
          desc="Verify email addresses with secure links before login."
        />
        <FeatureCard
          icon={<Lock className="w-8 h-8 text-yellow-500" />}
          title="Password Reset"
          desc="Easily reset forgotten passwords with secure tokens."
        />
        <FeatureCard
          icon={<ShieldCheck className="w-8 h-8 text-red-500" />}
          title="Protected Routes"
          desc="Restrict pages, API routes & server actions to admins."
        />
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="bg-white/90 backdrop-blur-md shadow-lg border-0 hover:shadow-xl transition">
      <CardHeader className="flex flex-col items-center text-center space-y-2">
        <div className="p-3 rounded-full bg-gray-100">{icon}</div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-600 text-sm text-center">
        {desc}
      </CardContent>
    </Card>
  );
}
