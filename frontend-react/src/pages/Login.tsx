import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../hooks/useUser";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

import { Checkbox } from "../components/Checkbox";
import { InputText } from "../components/Input";

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });
  const [rememberPassword, setRememberPassword] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);
    } catch (error) {
      console.error(error);
      toast.error("Invalid username or password");
    }
  };

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[400px]">
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
          <div className="p-5">
            <h1 className="text-4xl mb-5">Sign in</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <InputText
                type="text"
                label="Username"
                {...register("username")}
                error={formState.errors.username?.message}
              />

              <InputText
                type="password"
                label="Password"
                {...register("password")}
                error={formState.errors.password?.message}
              />

              {/* TODO: Implement remember password */}
              <Checkbox
                label="Remember your password"
                checked={rememberPassword}
                onChange={(checked) => setRememberPassword(checked)}
              />

              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition-all"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
