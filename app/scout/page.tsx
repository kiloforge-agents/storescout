import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScoutClient from "./ScoutClient";

export const metadata = {
  title: "In-store mode — StoreScout",
};

export default function ScoutPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <ScoutClient />
      </main>
      <SiteFooter />
    </>
  );
}
