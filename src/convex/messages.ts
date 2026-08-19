import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";

/**
 * Simpan pesan dari form kontak.
 * Publik — siapa pun bisa mengirim.
 */
export const send = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, { name, email, message }) => {
    const clean = (s: string) => s.trim().slice(0, 2000);
    await ctx.db.insert("messages", {
      name: clean(name).slice(0, 200),
      email: clean(email).slice(0, 300),
      message: clean(message),
    });
  },
});

/**
 * Baca semua pesan (internal — hanya dipanggil dari action ber-password).
 */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").take(200);
  },
});

/**
 * Buka inbox: verifikasi passcode di sisi server (env INBOX_PASSCODE,
 * diisi lewat tab Keys), lalu kembalikan daftar pesan.
 */
export const listByPasscode = action({
  args: { passcode: v.string() },
  handler: async (
    ctx,
    { passcode },
  ): Promise<Doc<"messages">[]> => {
    const expected = process.env.INBOX_PASSCODE;
    if (!expected || passcode !== expected) {
      throw new Error("Kode akses salah.");
    }
    return await ctx.runQuery(api.messages.listAll);
  },
});
