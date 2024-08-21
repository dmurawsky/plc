import "react-toastify/dist/ReactToastify.css";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main data-soil-id="AppLayout" className="z-10 relative">
      {children}
    </main>
  );
}
