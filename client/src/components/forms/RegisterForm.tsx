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
import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import axios from "@/utils/axios";
import { toast } from "sonner";
import ButtonLoader from "../loaders/ButtonLoader";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/auth";

const registerFormSchema = zod.object({
  name: zod.string().min(1, "name is required"),
  email: zod.string().email("Enter valid email").min(1, "email is required"),
  password: zod
    .string()
    .min(1, "password is required")
    .min(7, "password should be at least 7 letters")
    .max(10, "password should not be greater that 10 letters"),
});

function RegisterForm() {
  const form = useForm<zod.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: zod.infer<typeof registerFormSchema>) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/register", values);
      dispatch(setUser(data.userData));
      toast.success("registered successfully");
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
          Create a new account
        </h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="john doe" {...field} />
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
              Register <ArrowRight />
            </>
          )}
        </Button>

        <div>
          <p>
            Already a user?{" "}
            <Link
              className="text-blue-500 hover:underline underline-offset-8"
              to={"/login"}
            >
              Login now
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
