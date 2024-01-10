import DashboardSideMenu from "@/components/dashboard/DashboardSideMenu";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div>
        {/* <DashboardSideMenu/> */}
        {children}
    </div>
  )
}
