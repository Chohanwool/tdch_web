import type { Metadata } from "next";
import { AdminToastProvider } from "./(cms)/components/admin-toast-provider";

export const metadata: Metadata = {
  title: {
    default: "관리자 | The 제자교회",
    template: "%s | 관리자 · The 제자교회",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminToastProvider>
      <div className="min-h-screen bg-[#0f1c2e] font-[var(--font-sans)] antialiased">
        {children}
      </div>
    </AdminToastProvider>
  );
}
