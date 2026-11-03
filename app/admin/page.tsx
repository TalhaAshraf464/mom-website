import type { Metadata } from "next";
import { AdminWorkspace } from "./workspace";

export const metadata: Metadata = {
  title: "Writing studio | Sania Asif",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminWorkspace />;
}
