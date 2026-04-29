import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

export const metadata = { title: "Manifesto — StoreScout" };

export default function ManifestoPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="mx-auto max-w-[820px] px-5 sm:px-8 py-20">
          <span className="tag mb-4 inline-flex">Manifesto · 2025</span>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.0]">
            We&apos;re not building <em className="italic text-[var(--color-moss)]">another</em> shopping app.
          </h1>
          <div className="mt-10 prose prose-lg max-w-none text-[var(--color-ink)]/85 [&>p]:mb-5 [&>p]:leading-relaxed [&>h2]:font-display [&>h2]:text-3xl [&>h2]:mt-12 [&>h2]:mb-3">
            <p>
              For thirty years, retail tech has tried to drag stores online. The
              cart, the checkout, the loyalty graph — all faithfully ported to
              glass and a thumb. And it worked, mostly. E-commerce won the long
              tail.
            </p>
            <p>
              But shoppers still walk into stores. Two-thirds of all retail
              dollars still close inside a building. And once they cross the
              threshold, every digital affordance evaporates. The reviews, the
              wishlist, the coupon — gone. They&apos;re back to wandering, asking,
              squinting at price tags.
            </p>
            <h2>The missing layer.</h2>
            <p>
              StoreScout is the in-store layer. It travels with the shopper.
              It tells them where the thing is, what it costs <em>right now</em>,
              and whether the size in their saved list lives in the back room.
              It puts AR on the shelf, deals on the floor, and an associate
              behind a tap.
            </p>
            <p>
              We chose a PWA on purpose. Stores deserve software that ships in
              days, not the next platform release. Shoppers deserve to keep
              their bag light. A QR sticker by the door is enough.
            </p>
            <h2>What we believe.</h2>
            <p>
              Privacy is a feature. Position is processed on device. We never
              brokered a shopper&apos;s footsteps and we never will.
            </p>
            <p>
              Design is the strategy. A retail app is the front door, the
              greeter, the concierge. Make it feel like all three.
            </p>
            <p>
              Stores are wonderful. Online is fine. But there&apos;s nothing like
              walking into a place that knows you&apos;re there.
            </p>
            <p className="font-display italic text-2xl mt-12">— The StoreScout team</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/scout" className="btn-primary">Try the demo</Link>
            <Link href="/brands" className="btn-ghost">For brands</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
