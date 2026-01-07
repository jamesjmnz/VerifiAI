// app/console/layout.tsx
import ConsoleSidebar from "@/components/layout/ConsoleSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

  



export default async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers()
  const session = await auth.api.getSession({headers: headersList})

  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
      <ConsoleSidebar />
      
      <main className="flex-1 p-6 bg-muted/40">
        {children}
      </main>
      </SidebarProvider>
    </div>
  );
}
