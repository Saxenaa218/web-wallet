"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { hashString } from "@/helpers/cryptoUtil";
import { PASSKEY } from "@/helpers/constants";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { setSessionStorage } from "@/helpers/clientStorage";

const formSchema = z
  .object({
    password1: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    password2: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

export default function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password1: "",
      password2: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const encryptedPassword = hashString(values.password1);
    setSessionStorage(PASSKEY, encryptedPassword);
    toast({ title: "New Password Created!" });
    router.push("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center m-10 lg:m-20">
        <div className="w-[300px]">
          <h2 className="font-semibold text-3xl mb-5">Create new passkey</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new passkey"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new passkey"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
