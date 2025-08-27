import { useEffect, useMemo, useState } from "react";
import { type ClaimStatus, type Claim, getAdminClaims } from "@/api/claims.api";

export function useAdminClaims() {
  const [status, setStatus] = useState<"All" | ClaimStatus>("All");

  // Pagination state (server-side)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Data state
  const [items, setItems] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch mỗi khi status/page/pageSize đổi
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const resp = await getAdminClaims({
          status: status === "All" ? undefined : status,
          size: pageSize,
          page,
        });
        if (cancelled) return;
        setItems(Array.isArray(resp.items) ? resp.items : []);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? "Failed to fetch claims");
        setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, page, pageSize]);

  // reset về trang 1 khi thay filter
  function resetPage() {
    setPage(1);
  }

  // server không trả tổng -> suy ra khả năng có trang sau
  const hasNext = items.length === pageSize;
  const canPrev = page > 1;

  function nextPage() {
    setPage((p) => (hasNext ? p + 1 : p));
  }
  function prevPage() {
    setPage((p) => (canPrev ? p - 1 : p));
  }
  function goTo(p: number) {
    if (p < 1) return;
    setPage(p);
  }

  // indices để UI hiển thị "showing x–y"
  const startIndex = useMemo(
    () => (items.length > 0 ? (page - 1) * pageSize + 1 : 0),
    [page, pageSize, items.length]
  );
  const endIndex = useMemo(
    () => (items.length > 0 ? (page - 1) * pageSize + items.length : 0),
    [page, pageSize, items.length]
  );

  return {
    // filter duy nhất khi gọi API
    status,
    setStatus: (v: "All" | ClaimStatus) => {
      setStatus(v);
      resetPage();
    },

    // data
    items,
    loading,
    error,

    // pagination (server-side)
    page,
    pageSize,
    setPageSize: (n: number) => {
      setPageSize(n);
      resetPage();
    },
    // server không trả tổng -> trả null để UI tự xử lý phù hợp
    total: null as number | null,
    totalPages: null as number | null,
    startIndex,
    endIndex,

    hasNext,
    canPrev,
    nextPage,
    prevPage,
    goTo,
  };
}
