"use client";

import * as React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

// shadcn/ui components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);

    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onRequest: () => setIsLoading(true),
          onError: () => {
            toast('Registration Failed')
          },
          onSuccess: async () => {
            router.replace("/admin/dashboard");
          },
        },
      );
    } catch (error) {
      console.error("Registration error:", error);
      toast('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign Up</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sean Tan" disabled={isLoading} {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="sean@gmail.com"
                      disabled={isLoading}
                      {...field}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <div className="mt-2 flex items-center gap-1 text-[0.8rem]">
          <p>Already have an account?</p>
          <Link href="/auth/sign-in" className="text-blue-500 underline">
            Sign in.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
