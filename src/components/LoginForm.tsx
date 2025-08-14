import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import { Link } from "react-router-dom";
import { useToast } from "@/components/Toast";
import { useNavigate } from "react-router-dom";

function PlaneIcon() {
  return (
    <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-sky-50">
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-blue-700">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-2.5V19l-2 1.5V22l3-1 3 1v-1.5L13 19v-5.5l8 2.5Z" />
      </svg>
    </div>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { mutate, isPending } = useLogin();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (res: any) => {
          // token handling can be added here
          const token = res?.data?.token || res?.token;
          if (token) {
            localStorage.setItem("access_token", token);
          }
          toast.success("Welcome back!", {
            title: "Login successful!",
            appearance: "solid",
            duration: 2000,
          });
          navigate("/dashboard", { replace: true });
        },
        onError: (err: any) => {
          const message =
            err?.response?.data?.message || err?.message || "Login failed";
          toast.error(message, {
            title: "Login error",
            appearance: "solid",
          });
        },
      }
    );
  };

  return (
    <>
      <PlaneIcon />
      <h1 className="text-center text-[28px] font-bold text-slate-900">
        Welcome to LoyaltyHub
      </h1>
      <p className="mt-1 text-center text-[15px] text-slate-500">
        Access your member portal
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <Input
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl border-gray-200 placeholder:text-slate-400"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-xl border-gray-200 placeholder:text-slate-400"
        />

        <div className="flex items-center gap-3">
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span className="text-sm text-slate-700">Remember me</span>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-xl"
        >
          {isPending ? "Logging in…" : "Log In"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Link
          to="/forgot"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs uppercase tracking-wide text-slate-400">
          or
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <Button
        variant="outline"
        type="button"
        className="h-12 w-full rounded-xl"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M44.5 20H24v8.5h11.8C34.9 32.9 30.1 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.4 2.9l6-6C34.8 4 29.7 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4Z"
            fill="#FFC107"
          />
          <path
            d="M6.3 14.7l7 5.1C15 16 19.1 13 24 13c3.1 0 6 .9 8.4 2.9l6-6C34.8 4 29.7 2 24 2 16 2 8.9 6.6 6.3 14.7Z"
            fill="#FF3D00"
          />
          <path
            d="M24 46c6 0 11.4-2 15.2-5.4l-7-5.7C30.9 36.5 27.7 37 24 37c-6 0-10.9-3.8-12.8-9.2l-7 5.4C7.7 41.8 15.3 46 24 46Z"
            fill="#4CAF50"
          />
          <path
            d="M44.5 20H24v8.5h11.8c-1 4.4-4.9 7.5-11.8 7.5-6 0-10.9-3.8-12.8-9.2l-7 5.4C7.7 41.8 15.3 46 24 46c12.2 0 22-8 22-22 0-1.3-.2-2.7-.5-4Z"
            fill="#1976D2"
          />
        </svg>
        Continue with Google
      </Button>
    </>
  );
}
