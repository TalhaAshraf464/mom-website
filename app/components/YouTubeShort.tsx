"use client";

import { useState } from "react";

type YouTubeShortProps = {
  id: string;
  index: string;
  label: string;
  title: string;
};

export function YouTubeShort({ id, index, label, title }: YouTubeShortProps) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="video-card short-video-card">
      <div className="short-video-frame">
        {playing ? <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        /> : <button className="video-play-cover" aria-label={`Play ${title}`} onClick={() => setPlaying(true)}>
          {/* YouTube's thumbnail is already sized for this small video card. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="video-play-icon" aria-hidden="true">▶</span>
          <span className="video-play-label">Watch video</span>
        </button>}
      </div>
      <div className="video-meta">
        <div>
          <span className="video-number">{index}</span>
          <h3>{title}</h3>
        </div>
        <span>{label}</span>
      </div>
    </article>
  );
}
