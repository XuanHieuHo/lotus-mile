import { httpAuth } from "@/services/http";

export type ClaimStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Claim = {
  id: number;
  user_id: number;
  invoice_no: string;
  claim_date: string; // "yyyy-mm-dd"
  requested_points: number;
  attachment_url: string;
  note: string;
  status: ClaimStatus;
  admin_note: string;
  created_at: string; // ISO
};

export type GetClaimsParams = {
  status?: ClaimStatus; // chỉ filter status
  size?: number; // page size
  page?: number; // page index (1-based/0-based theo BE của bạn)
};

export type AdminReviewClaim = {
  id: number;
  points: number;
  action: string;
  note: string;
};

export type AdminReviewClaimResponse = {
  id: number;
  status: string;
  affected_points: number;
};

export async function adminReviewClaim(data: AdminReviewClaim) {
  const res = await httpAuth.put<AdminReviewClaimResponse>(
    `/admin/claims/${data.id}`,
    {
      action: data.action,
      note: data.note,
      points: data.points,
    }
  );
  return res.data;
}

export async function getClaims(params: GetClaimsParams = {}) {
  const res = await httpAuth.get<{ items: Claim[] }>("/member/claims", {
    params,
  });
  return res.data;
}

export async function getAdminClaims(params: GetClaimsParams = {}) {
  const res = await httpAuth.get<{ items: Claim[] }>("/admin/claims", {
    params,
  });
  return res.data;
}

export type NewClaimStep = 1 | 2 | 3;

export type NewClaimForm = {
  invoice_no: string; // required
  claim_date: string; // yyyy-mm-dd (set now ở hook)
  requested_points: number; // required > 0
  note: string; // required, non-empty
  attachment: File | null; // required, one file
};

export async function newClaims(form: NewClaimForm) {
  // FE-level validate (tránh request rác)
  if (!form.invoice_no.trim()) throw new Error("invoice_no is required");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.claim_date))
    throw new Error("claim_date is invalid (yyyy-mm-dd)");
  if (!Number.isFinite(form.requested_points) || form.requested_points <= 0)
    throw new Error("requested_points must be > 0");
  if (!form.note.trim()) throw new Error("note is required");
  if (!(form.attachment instanceof File))
    throw new Error("attachment (File) is required");

  const fd = new FormData();
  fd.append("invoice_no", form.invoice_no.trim());
  fd.append("claim_date", form.claim_date);
  fd.append("requested_points", String(form.requested_points));
  fd.append("note", form.note.trim());
  // 👇 field name PHẢI trùng với FileInterceptor('attachment') phía BE
  fd.append("attachment", form.attachment, form.attachment.name);

  const res = await httpAuth.post<{
    item: { id: number; status: ClaimStatus };
  }>("/member/claims", fd, {
    // ❗️Rất quan trọng: để browser tự set boundary.
    // Nếu bạn set 'multipart/form-data' thủ công sẽ mất boundary → server không thấy file.
    transformRequest: (d) => d,
    headers: {
      /* không set Content-Type ở đây */
    },
  });
  return res.data;
}
