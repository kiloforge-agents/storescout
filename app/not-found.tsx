import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 mx-auto max-w-[820px] px-5 sm:px-8 py-32 text-center">
        <span className="tag mb-3 inline-flex">404 · off the map</span>
        <h1 className="font-display text-6xl sm:text-7xl leading-[1.0]">This aisle doesn&apos;t exist.</h1>
        <p className="mt-4 text-[var(--color-ink)]/70 max-w-md mx-auto">
          We checked the floorplan twice. The page you&apos;re looking for might
          have moved to a different shelf.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back to entrance</Link>
          <Link href="/scout" className="btn-ghost">Open the scout</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
