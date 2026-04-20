import type { ReactNode } from "react";
import Breadcrumb from "@/components/breadcrumb";
import PageHeader from "@/components/page-header";

interface SitePageShellProps {
  title: string;
  subtitle: string;
  backgroundImageUrl?: string;
  showHeader?: boolean;
  showBreadcrumb?: boolean;
  children: ReactNode;
}

export default function SitePageShell({
  title,
  subtitle,
  backgroundImageUrl = "/images/main_bg/main_bg_sec1.png",
  showHeader = true,
  showBreadcrumb = true,
  children,
}: SitePageShellProps) {
  return (
    <div className="flex w-full flex-col bg-white">
      {showHeader && (
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundImageUrl={backgroundImageUrl}
        />
      )}
      {showBreadcrumb && <Breadcrumb />}
      {children}
    </div>
  );
}
