"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/auth-card";
import { registerUser } from "@/lib/actions/auth";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ email, username, password });
      
      toast.success("Account created! Signing you in...");
      
      // Auto sign-in after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Join the ecosystem"
      subtitle="Connect with builders, founders, and engineers"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <AuthInput
          type="text"
          placeholder="Username (unique)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <AuthInput
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          type="password"
          placeholder="Choose a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthButton type="submit" loading={loading}>
          Create your professional profile
        </AuthButton>
      </form>
    </AuthCard>
  );
}