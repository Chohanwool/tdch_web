import PageHeader from "@/components/page-header";
import Breadcrumb from "@/components/breadcrumb";

export default function SermonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col pb-20">
      <PageHeader
        title="예배"
        subtitle="WORSHIP"
        backgroundImageUrl="/images/main_bg/main_bg_sec1.png"
      />
      <Breadcrumb />
      <main className="section-shell pt-10 md:pt-16 pb-20">{children}</main>
    </div>
  );
}
