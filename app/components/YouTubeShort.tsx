type YouTubeShortProps = {
  id: string;
  index: string;
  label: string;
  title: string;
};

export function YouTubeShort({ id, index, label, title }: YouTubeShortProps) {
  return (
    <article className="video-card short-video-card">
      <div className="short-video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
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
