import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Testimonials | Sania Asif",
  description: "Anonymous written and video testimonial placeholders for Sania Asif's practice.",
};

const testimonials = [
  "Placeholder testimonial about feeling heard, respected, and supported throughout the recovery process.",
  "Placeholder testimonial about receiving practical help during a difficult period of anxiety or depression.",
  "Placeholder testimonial from a family member about gaining clarity, boundaries, and hope.",
];

export default function TestimonialsPage() {
  return (
    <main>
      <SiteHeader current="testimonials" />
      <section className="inner-hero inner-hero-lavender">
        <p className="eyebrow">Testimonials</p>
        <h1>Words shared in confidence.</h1>
        <p>Names and identifying details can remain anonymous while preserving the meaning of each story.</p>
      </section>

      <section className="testimonial-page-section" id="stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Written stories</p>
            <h2>Experiences in their own words.</h2>
          </div>
          <p>Replace each placeholder with approved anonymous testimonial text.</p>
        </div>
        <div className="testimonial-story-grid">
          {testimonials.map((testimonial, index) => (
            <blockquote key={testimonial}>
              <span>0{index + 1}</span>
              <p>&ldquo;{testimonial}&rdquo;</p>
              <cite>Anonymous past patient</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="video-testimonial-section" id="video-stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Video stories</p>
            <h2>Listen to their experiences.</h2>
          </div>
          <p>MP4 testimonials can be placed over an approved still image here.</p>
        </div>
        <div className="video-grid testimonial-video-grid">
          {["Video testimonial one", "Video testimonial two"].map((title, index) => (
            <article className="video-card" key={title}>
              <div className="video-poster">
                <span className="video-index">0{index + 1}</span>
                <span className="play-button" aria-hidden="true" />
                <span className="video-duration">MP4 placeholder</span>
              </div>
              <div className="video-meta"><h3>{title}</h3><span>Anonymous</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section compact-contact">
        <div><p className="eyebrow">Your story can change too</p><h2>Begin with a private conversation.</h2></div>
        <div className="contact-copy"><a className="button button-light" href="/#contact">Contact Sania</a></div>
      </section>
      <SiteFooter />
    </main>
  );
}
