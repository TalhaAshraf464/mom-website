import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { YouTubeShort } from "../components/YouTubeShort";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials | Sania Asif",
  description: "Written and video testimonials from clients of Sania Asif's practice.",
};

const videoTestimonials = [
  { id: "hEHHrs-zUdE", number: "01", title: "Client testimonial 01" },
  { id: "cFPRjL5qYJ8", number: "02", title: "Client testimonial 02" },
];

export default function TestimonialsPage() {
  return (
    <main>
      <SiteHeader current="testimonials" />
      <section className="inner-hero inner-hero-lavender testimonial-page-hero">
        <p className="eyebrow">Testimonials</p>
        <h1>Words shared in confidence.</h1>
        <p>Names and identifying details can remain anonymous while preserving the meaning of each story.</p>
      </section>

      <section className="video-testimonial-section" id="video-stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Video stories</p>
            <h2>Listen to their experiences.</h2>
          </div>
          <p>Client experiences shared with care and dignity.</p>
        </div>
        <div className="video-grid testimonial-video-grid shorts-grid">
          {videoTestimonials.map((video) => (
            <YouTubeShort
              id={video.id}
              index={video.number}
              key={video.id}
              label="Client story"
              title={video.title}
            />
          ))}
        </div>
      </section>

      <section className="contact-section compact-contact">
        <div><p className="eyebrow">Your story can change too</p><h2>Begin with a private conversation.</h2></div>
        <div className="contact-copy"><Link className="button button-light" href="/#contact">Contact Sania</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
