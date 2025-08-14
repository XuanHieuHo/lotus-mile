import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRegister } from "@/hooks/useRegister";
import { useToast } from "@/components/Toast";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(""); // yyyy-mm-dd
  const toast = useToast();
  const navigate = useNavigate();

  const [showPw, setShowPw] = useState(false);
  const { mutate, isPending } = useRegister();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { username, password, email, birthday },
      {
        onSuccess: () => {
          toast.success("Registration successful! Please log in.", {
            title: "Registration Complete",
            appearance: "solid",
            duration: 1500,
          });
          navigate("/login");
        },
        onError: (err: any) => {
          const message =
            err?.response?.data?.message ||
            err?.response?.message ||
            "Registration failed";
          toast.error(message, {
            title: "Registration Error",
            appearance: "solid",
          });
        },
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-11 rounded-xl"
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="Create a secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 rounded-xl pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPw((s) => !s)}
          className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
          aria-label="Toggle password visibility"
          title="Show/Hide"
        >
          👁️
        </button>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 rounded-xl"
      />

      <Input
        label="Birthday"
        type="date"
        placeholder="YYYY-MM-DD"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        className="h-11 rounded-xl"
      />

      <Button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-xl"
      >
        {isPending ? "Creating…" : "Create Account"}
      </Button>
    </form>
  );
}
