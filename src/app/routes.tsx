import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import DashboardPage from "@/pages/DashboardPage";
import ClaimsListPage from "@/pages/ClaimsListPage";
import SubmitSuccessPage from "@/pages/SubmitSuccessPage";
import ProfilePage from "@/pages/ProfilePage";
import ClaimDetailPage from "@/pages/ClaimDetailPage";
import AdminClaimsPage from "@/pages/AdminClaimsPage";
import AdminClaimReviewPage from "@/pages/AdminClaimReviewPage";
import AdminTransactionsPage from "@/pages/AdminTransactionsPage";
import AdminTxnCreatePage from "@/pages/AdminTxnCreatePage";
import AdminTxnSuccessPage from "@/pages/AdminTxnSuccessPage";

export const router = createBrowserRouter([
  { path: "/", element: <div className="p-6">Home</div> },

  // user routes
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/claims", element: <ClaimsListPage /> },
  { path: '/claims/submit-success', element: < SubmitSuccessPage/> },
  { path: '/claims/:code', element: <ClaimDetailPage /> },
  { path: '/profile', element: <ProfilePage /> },

  // auth routes
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/forgot", element: <ForgotPasswordPage /> },

  // admin routes
  { path: "/admin/claims", element: <AdminClaimsPage /> },
  { path: '/admin/transactions', element: <AdminTransactionsPage /> },
  { path: '/admin/transactions/new', element: <AdminTxnCreatePage /> },
  { path: '/admin/transactions/success', element: <AdminTxnSuccessPage /> },
  { path: '/admin/claims/:code/review', element: <AdminClaimReviewPage /> },
]);
