import { useEffect, useMemo, useRef, useState } from "react";
import type { Claim, ClaimStatus } from "@/api/claims.api";
import { getClaims } from "@/api/claims.api";
import { useToast } from "@/components/Toast";

type TimeFilter = "All" | "30d" | "90d" | "1y";

export function useClaims() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | ClaimStatus>("All");
  const [time, setTime] = useState<TimeFilter>("All");

  // Pagination state (đi vào params API)
  const [page, _setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Server data (chưa lọc q/time)
  const [serverItems, setServerItems] = useState<Claim[]>([]);
  const [serverTotal, setServerTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // Helpers
  function resetPage() {
    _setPage(1);
  }
  function setPage(p: number) {
    _setPage(Math.max(1, Math.floor(p || 1)));
  }

  // Debounce cho search
  const [debouncedQ, setDebouncedQ] = useState(q);
  const debounceTimer = useRef<number | null>(null);
  useEffect(() => {
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, [q]);

  // Gọi API: chỉ truyền { status, page, size }
  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: any = {
          status: status === "All" ? undefined : status,
          page,
          size: pageSize,
        };
        const res = await getClaims(params);
        // Kỳ vọng: { items, total }
        if (res && Array.isArray((res as any).items)) {
          const { items, total } = res as { items: Claim[]; total: number };
          if (!cancelled) {
            setServerItems(items ?? []);
            setServerTotal(total ?? items?.length ?? 0);
          }
        } else if (Array.isArray(res)) {
          if (!cancelled) {
            setServerItems(res as Claim[]);
            setServerTotal((res as Claim[]).length);
          }
        } else {
          if (!cancelled) {
            setServerItems([]);
            setServerTotal(0);
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          const message =
            e?.response?.data?.message || e?.message || "Failed to load claims";
          setError(message);
          setServerItems([]);
          setServerTotal(0);
          toast.error(message, {
            title: "Error",
            appearance: "solid",
            duration: 1000,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [status, page, pageSize]);

  // Lọc client-side theo q + time (date range)
  const items = useMemo(() => {
    const now = new Date();
    const filterTime = (d: string) => {
      if (time === "All") return true;
      const dt = new Date(d);
      const diffDays = (now.getTime() - dt.getTime()) / (1000 * 3600 * 24);
      if (time === "30d") return diffDays <= 30;
      if (time === "90d") return diffDays <= 90;
      return diffDays <= 365; // 1y
    };

    const qlower = debouncedQ.trim().toLowerCase();
    return serverItems.filter(
      (c) =>
        filterTime(c.claim_date) &&
        (qlower === "" ||
          c.invoice_no.toLowerCase().includes(qlower) ||
          c.note.toLowerCase().includes(qlower))
    );
  }, [serverItems, debouncedQ, time]);

  // Lưu ý: totalPages dựa trên serverTotal (tổng của server trước khi lọc q/time)
  const total = serverTotal;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  // Điều hướng trang (điều khiển params gọi API)
  function nextPage() {
    setPage(currentPage + 1);
  }
  function prevPage() {
    setPage(currentPage - 1);
  }
  function goTo(p: number) {
    setPage(p);
  }

  return {
    // filters
    q,
    setQ: (v: string) => {
      setQ(v);
      resetPage();
    }, // tuỳ bạn có muốn resetPage cho q/time không, nhưng params không đổi
    status,
    setStatus: (v: "All" | ClaimStatus) => {
      setStatus(v);
      resetPage();
    },
    time,
    setTime: (v: TimeFilter) => {
      setTime(v); /* giữ nguyên page vì không ảnh hưởng params */
    },

    // data & state
    items, // đã lọc theo q + time
    total, // tổng theo server (không áp q/time)
    loading,
    error,

    // pagination (đi vào params)
    page: currentPage,
    pageSize,
    setPageSize: (n: number) => {
      setPageSize(n);
      resetPage();
    },
    totalPages,
    nextPage,
    prevPage,
    goTo,
  };
}
