"use client";

import { useEffect, useRef } from "react";

type YouTubePlayer = {
  mute: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
};

type YouTubePlayerEvent = {
  target: YouTubePlayer;
};

type YouTubeNamespace = {
  Player: new (
    element: HTMLIFrameElement,
    options: { events: { onReady: (event: YouTubePlayerEvent) => void } },
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let activeAutoplayPlayer: YouTubePlayer | null = null;
let youtubeApiPromise: Promise<YouTubeNamespace> | null = null;

function loadYouTubeApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise<YouTubeNamespace>((resolve, reject) => {
      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        if (window.YT?.Player) {
          resolve(window.YT);
        }
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => reject(new Error("YouTube player API failed to load"));
        document.head.appendChild(script);
      }
    });
  }

  return youtubeApiPromise;
}

type YouTubeShortProps = {
  autoPlay?: boolean;
  id: string;
  index: string;
  label: string;
  title: string;
};

export function YouTubeShort({ autoPlay = false, id, index, label, title }: YouTubeShortProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!autoPlay || !frameRef.current || !iframeRef.current) {
      return;
    }

    let cancelled = false;
    let player: YouTubePlayer | null = null;
    let isVisible = false;

    const updatePlayback = () => {
      if (!player) {
        return;
      }

      if (isVisible) {
        if (activeAutoplayPlayer && activeAutoplayPlayer !== player) {
          activeAutoplayPlayer.pauseVideo();
        }
        activeAutoplayPlayer = player;
        player.mute();
        player.playVideo();
      } else {
        player.pauseVideo();
        if (activeAutoplayPlayer === player) {
          activeAutoplayPlayer = null;
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.55;
        updatePlayback();
      },
      { threshold: [0, 0.55, 1] },
    );

    observer.observe(frameRef.current);

    loadYouTubeApi()
      .then((youtube) => {
        if (cancelled || !iframeRef.current) {
          return;
        }

        player = new youtube.Player(iframeRef.current, {
          events: {
            onReady: (event) => {
              player = event.target;
              updatePlayback();
            },
          },
        });
      })
      .catch(() => {
        // The native YouTube play button remains available if autoplay is blocked.
      });

    return () => {
      cancelled = true;
      observer.disconnect();
      if (activeAutoplayPlayer === player) {
        activeAutoplayPlayer = null;
      }
      player?.pauseVideo();
    };
  }, [autoPlay]);

  const playerParameters = autoPlay
    ? "rel=0&enablejsapi=1&playsinline=1&mute=1"
    : "rel=0";

  return (
    <article
      className="video-card short-video-card"
      data-scroll-autoplay={autoPlay ? "true" : undefined}
    >
      <div className="short-video-frame" ref={frameRef}>
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${id}?${playerParameters}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
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
