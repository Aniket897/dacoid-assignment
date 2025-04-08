import { useForm } from "react-hook-form";
import * as zod from "zod";
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
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "@/utils/axios";
import { toast } from "sonner";
import ButtonLoader from "../loaders/ButtonLoader";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/auth";

const loginFormSchema = zod.object({
  email: zod.string().email("Enter valid email").min(1, "email is required"),
  password: zod
    .string()
    .min(1, "password is required")
    .min(7, "password should be at least 7 letters")
    .max(10, "password should not be greater that 10 letters"),
});

function LoginForm() {
  const form = useForm<zod.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: zod.infer<typeof loginFormSchema>) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/login", values);
      dispatch(setUser(data.userData));
      toast.success("Logged in successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-[500px] max-w-[90vw]"
      >
        <h1 className="font-bold text-3xl underline underline-offset-8 text-center flex items-center justify-center gap-3">
          <Lock />
          Login to your account
        </h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {loading ? (
            <ButtonLoader />
          ) : (
            <>
              Login <ArrowRight />
            </>
          )}
        </Button>

        <div>
          <p>
            Not a user?{" "}
            <Link
              className="text-blue-500 hover:underline underline-offset-8"
              to={"/register"}
            >
              Register now
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
