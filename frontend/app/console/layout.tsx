// app/console/layout.tsx
import ConsoleSidebar from "@/components/layout/ConsoleSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

  


export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
