import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getAdminMenuTree } from "@/lib/admin-menu-api";
import MenuManagementClient from "./_components/menu-management-client";
import AdminBreadcrumb from "../components/admin-breadcrumb";

export default async function AdminMenuPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/menu");
  }

  const actorId = session.user.id ?? "";
  const menuTree = await getAdminMenuTree(actorId);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "운영" }, { label: "메뉴 관리" }]} />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">메뉴 관리</h1>
        <p className="text-[13px] text-[#5d6f86]">
          로컬에서 구조를 정리한 뒤 한 번에 저장하는 배치 저장형 편집기입니다.
        </p>
      </div>

      <MenuManagementClient
        initialItems={menuTree.items}
      />
    </div>
  );
}
