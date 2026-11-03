import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { YouTubeShort } from "./components/YouTubeShort";
import { getPublishedPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const videos = [
  { id: "PAVBdSP2xRw", number: "01", title: "Emotional Abuse" },
  { id: "FXht3EScIIQ", number: "02", title: "Video about Depression" },
  { id: "Nyqhzf3zhxw", number: "03", title: "Why intelligent kids struggle with simple tasks" },
];

const videoTestimonials = [
  { id: "hEHHrs-zUdE", number: "01", title: "Client testimonial 01" },
  { id: "cFPRjL5qYJ8", number: "02", title: "Client testimonial 02" },
];

export default async function Home() {
  const blogPosts = await getPublishedPosts();
  return (
    <main>
      <SiteHeader current="home" />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-credentials">
            Psychologist | Addiction Recovery Specialist | 18+ Years of Clinical Experience
          </p>
          <h1>Sania Asif</h1>
          <p className="hero-role">Clinical Psychologist</p>
          <p className="hero-intro">
            With over 18 years of clinical experience, I combine individual
            counselling, family guidance and personalised aftercare to help
            individuals and families deal with issues such as depression,
            anxiety, OCD, addiction, schizophrenia, behavioural concerns,
            parenting and relationship difficulties.
          </p>
          <p className="hero-availability">Private &amp; Online Sessions | By Appointment Only</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Let’s find a way forward <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#about">Explore her approach <span aria-hidden="true">&#8595;</span></a>
          </div>
          <div className="session-note">
            <span aria-hidden="true" className="status-dot" />
            Online worldwide <span aria-hidden="true">&middot;</span> In-person in Karachi
          </div>
        </div>

        <div className="hero-portrait">
          <div className="portrait-accent" aria-hidden="true" />
          <figure>
            <Image
              src="/sania-asif-portrait.jpeg"
              alt="Sania Asif, Clinical Psychologist"
              width={720}
              height={900}
              unoptimized
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>
              <span>Clinical practice</span>
              <strong>Since 2008</strong>
            </figcaption>
          </figure>
        </div>

        <a className="scroll-cue" href="#videos">
          <span>Scroll to watch</span>
          <span className="scroll-cue-line" aria-hidden="true" />
        </a>
      </section>

      <section className="video-section video-section-featured" id="videos">
        <div className="section-heading video-heading">
          <div>
            <p className="eyebrow">Watch &amp; learn</p>
            <h2>Let&apos;s talk about it.</h2>
          </div>
          <p>
            Short, thoughtful guidance from Sania on emotional wellbeing,
            mental health, and the challenges families can face.
          </p>
        </div>

        <div className="video-grid video-grid-featured shorts-grid">
          {videos.map((video) => (
            <YouTubeShort
              id={video.id}
              index={video.number}
              key={video.id}
              label="YouTube Short"
              title={video.title}
            />
          ))}
        </div>
      </section>

      <section className="testimonial-gateway testimonial-home" id="testimonials">
        <div className="testimonial-home-inner">
          <div className="testimonial-home-intro">
            <div className="testimonial-gateway-copy">
              <p className="eyebrow">Shared in confidence</p>
              <h2>Stories of growth and recovery.</h2>
            </div>
          </div>

          <div className="testimonial-subheading testimonial-video-heading">
            <p className="eyebrow">Video stories</p>
            <h3>Listen to their experiences.</h3>
          </div>
          <div className="video-grid testimonial-home-video-grid shorts-grid">
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
        </div>
      </section>

      {blogPosts.length > 0 && <section className="blog-preview" id="blog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the blog</p>
            <h2>Clear guidance for difficult moments.</h2>
          </div>
          <div className="section-side-copy">
            <p>Thoughtful perspectives on recovery, relationships, and caring for your emotional wellbeing.</p>
            <Link className="text-link" href="/blog">View all articles <span aria-hidden="true">&#8599;</span></Link>
          </div>
        </div>

        <div className="blog-grid">
          {blogPosts.slice(0, 3).map((post, index) => (
            <article className="blog-card" key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <span className="blog-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="blog-category">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="blog-read">Read article <i aria-hidden="true">&#8599;</i></span>
              </a>
            </article>
          ))}
        </div>
      </section>}

      <section className="practice-strip" aria-label="Practice overview">
        <div><strong>18+</strong><span>Years of experience</span></div>
        <div><strong>Worldwide</strong><span>Confidential online care</span></div>
        <div><strong>Karachi</strong><span>In-person sessions</span></div>
        <div><strong>Urdu/English</strong><span>Session languages</span></div>
      </section>

      <section className="intro-section" id="about">
        <div className="section-kicker">A warm, thoughtful approach</div>
        <div className="intro-heading">
          <h2>A steadier path forward, built around you.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Reaching out can feel like a big step. Whether you are navigating
            something new or carrying a concern for a long time, our work
            begins with understanding your experience.
          </p>
          <p>
            Together, we can explore what matters to you, build practical ways
            to cope, and move towards change at a pace that feels manageable.
            Your privacy, dignity, and individual needs come first.
          </p>
        </div>
      </section>

      <section className="approach-band">
        <p className="eyebrow">Her approach</p>
        <h2>You don’t have to navigate it all alone.</h2>
        <p className="approach-description">A space to be heard. Support to move forward. Care that meets you where you are.</p>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Take the first step</p>
          <h2>Reach out when you feel ready.</h2>
        </div>
        <div className="contact-copy">
          <p>
            For appointments or more information about online and in-person
            sessions, you are welcome to contact Sania directly by phone call
            or WhatsApp.
          </p>
          <a className="contact-number" href="tel:+923002025956">
            +92 300 202 5956
          </a>
          <div className="contact-actions">
            <a className="button button-light" href="tel:+923002025956">Call Sania</a>
            <a className="button button-outline" href="https://wa.me/923002025956" target="_blank" rel="noreferrer">WhatsApp Sania</a>
          </div>
          <a className="instagram-contact" href="https://www.instagram.com/opentalkcounselling/" target="_blank" rel="noreferrer"><span>Stay connected on Instagram</span><strong>@opentalkcounselling ↗</strong></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
