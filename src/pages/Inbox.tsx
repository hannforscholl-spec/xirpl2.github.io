import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  ArrowLeft,
  Inbox as InboxIcon,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { cn } from "@/lib/utils";

type Message = Doc<"messages">;

const STORAGE_KEY = "xirpl2_inbox_unlocked";

function formatDate(ts: number) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(ts);
}

function LockedView({
  onUnlock,
}: {
  onUnlock: (messages: Message[]) => void;
}) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const listByPasscode = useAction(api.messages.listByPasscode);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const messages = await listByPasscode({ passcode });
      sessionStorage.setItem(STORAGE_KEY, "1");
      sessionStorage.setItem("xirpl2_inbox_code", passcode);
      onUnlock(messages);
    } catch {
      setError("Kode akses salah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="relative overflow-hidden rounded-2xl border bg-card p-8 text-center">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/25 blur-3xl" />
          <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40">
            <Lock className="size-7" />
          </span>
          <h1 className="relative mt-5 font-display text-2xl font-bold tracking-tight">
            Kotak Masuk
          </h1>
          <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
            Halaman ini khusus pemegang situs. Masukkan kode akses untuk
            membaca pesan dari pengunjung.
          </p>

          <form
            onSubmit={handleSubmit}
            className="relative mt-6 space-y-3 text-left"
          >
            <label htmlFor="passcode" className="text-sm font-medium">
              Kode Akses
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="h-11 pl-9"
                disabled={loading}
                required
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full rounded-full"
              size="lg"
              disabled={loading || passcode.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Memeriksa...
                </>
              ) : (
                <>
                  Buka Inbox
                  <ShieldCheck className="size-4" />
                </>
              )}
            </Button>
          </form>

          <p className="relative mt-6 border-t border-dashed pt-4 font-mono text-[11px] text-muted-foreground">
            Kode diatur lewat tab Keys → INBOX_PASSCODE
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function MessageDetail({
  message,
  onBack,
}: {
  message: Message;
  onBack: () => void;
}) {
  return (
    <motion.div
      key={message._id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col"
    >
      <div className="flex items-center justify-between gap-3 border-b p-4 sm:p-5">
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold">
            {message.name}
          </p>
          <p className="flex items-center gap-1.5 truncate font-mono text-xs text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{message.email}</span>
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="shrink-0 rounded-full lg:hidden"
        >
          <ArrowLeft className="size-4" />
          Kembali
        </Button>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {formatDate(message._creationTime)}
        </p>
        <p className="text-sm leading-7 whitespace-pre-wrap text-foreground sm:text-base">
          {message.message}
        </p>
      </div>
    </motion.div>
  );
}

export default function Inbox() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === "1",
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const listByPasscode = useAction(api.messages.listByPasscode);

  const selected = useMemo(
    () => messages.find((m) => m._id === selectedId) ?? null,
    [messages, selectedId],
  );

  async function refresh() {
    setRefreshing(true);
    try {
      const result = await listByPasscode({
        passcode: sessionStorage.getItem("xirpl2_inbox_code") ?? "",
      });
      if (result) {
        setMessages(result);
        setSelectedId((id) => id ?? result[0]?._id ?? null);
      }
    } catch {
      // kode sesi hilang — minta buka kunci lagi
      sessionStorage.removeItem(STORAGE_KEY);
      setUnlocked(false);
    } finally {
      setRefreshing(false);
    }
  }

  function handleUnlock(result: Message[]) {
    setMessages(result);
    setSelectedId(result[0]?._id ?? null);
    setUnlocked(true);
  }

  if (!unlocked) {
    return <LockedView onUnlock={handleUnlock} />;
  }

  return (
    <div className="grain flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm">
              <InboxIcon className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Kotak <span className="text-muted-foreground">Masuk</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Muat ulang pesan"
              onClick={refresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY);
                setUnlocked(false);
              }}
            >
              <Lock className="size-4" />
              <span className="hidden sm:inline">Kunci</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Pesan Pengunjung
            </h1>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {messages.length} pesan · terbaru di atas
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Ke Beranda
            </Link>
          </Button>
        </div>

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card py-20 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40">
              <InboxIcon className="size-7" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold">
              Belum ada pesan
            </h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Pesan dari form kontak di beranda akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-[320px_1fr]">
            {/* Daftar pesan */}
            <div
              className={cn(
                "max-h-[70vh] overflow-y-auto border-b lg:max-h-[calc(100vh-13rem)] lg:border-b-0 lg:border-r",
                selected && "hidden lg:block",
              )}
            >
              {messages.map((m) => (
                <button
                  key={m._id}
                  onClick={() => setSelectedId(m._id)}
                  className={cn(
                    "block w-full border-b px-4 py-4 text-left transition-colors last:border-b-0",
                    selectedId === m._id
                      ? "bg-accent/15"
                      : "hover:bg-accent/10",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{m.name}</p>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "numeric",
                        month: "short",
                      }).format(m._creationTime)}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                    {m.email}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {m.message}
                  </p>
                </button>
              ))}
            </div>

            {/* Isi pesan */}
            <div className="hidden lg:block">
              {selected ? (
                <MessageDetail
                  message={selected}
                  onBack={() => setSelectedId(null)}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center py-20 text-center">
                  <Mail className="size-8 text-muted-foreground/50" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Pilih pesan untuk membacanya
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tampilan seluler: detail pesan full */}
        {selected && (
          <div className="mt-4 rounded-2xl border bg-card lg:hidden">
            <MessageDetail
              message={selected}
              onBack={() => setSelectedId(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
