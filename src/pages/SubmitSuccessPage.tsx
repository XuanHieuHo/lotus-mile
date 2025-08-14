import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Topbar from "@/components/Topbar";
import { useToast } from "@/components/Toast";

export default function SubmitSuccessPage() {
  const nav = useNavigate();
  const toast = useToast();
  const { state } = useLocation() as { state?: { claimId?: string } };
  const claimId =
    state?.claimId ??
    "CL" +
      Math.floor(Math.random() * 1e6)
        .toString()
        .padStart(6, "0");

  useEffect(() => {
    toast.success("Claim submitted successfully!", {
      title: "Success",
      appearance: "solid",
      duration: 2500,
    });
    const t = setTimeout(() => nav("/dashboard"), 2000);
    return () => clearTimeout(t);
  }, [nav, toast]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />
      <main className="mx-auto max-w-xl px-4 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
            ✔️
          </div>
          <h1 className="mb-2 text-center text-lg font-semibold text-slate-800">
            Claim Submitted Successfully!
          </h1>
          <p className="mb-6 text-center text-slate-600">
            Your claim has been submitted and is being reviewed. You'll receive
            an email confirmation shortly.
          </p>

          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <span className="font-semibold text-slate-700">
              Claim ID: {claimId}
            </span>
            <p className="mt-1 text-slate-500">
              Please save this ID for your records. You can use it to track your
              claim status.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Link
              to="/claims"
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Back to Claims
            </Link>
            <Link
              to="/claims/new"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Submit Another Claim
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
