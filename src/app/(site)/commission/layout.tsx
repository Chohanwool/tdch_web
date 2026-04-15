import type { ReactNode } from "react";
import PageHeader from "@/components/page-header";
import Breadcrumb from "@/components/breadcrumb";

export default function CommissionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col bg-white">
      <PageHeader
        title="지상명령"
        subtitle="THE GREAT COMMISSION"
        backgroundImageUrl="/images/main_bg/main_bg_sec1.png"
      />
      <Breadcrumb />
      {children}
    </div>
  );
}
