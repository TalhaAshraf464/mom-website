import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <p className="eyebrow">A different direction</p>
        <h1>Let’s find your way back.</h1>
        <p>
          This page isn’t available. You can return home or reach out for a
          conversation.
        </p>
        <Link className="button button-primary" href="/">
          Back to home →
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
