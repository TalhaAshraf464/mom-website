import { Fragment, type ReactNode } from "react";

function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .map((part, index) =>
      part.startsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : part.startsWith("*") ? (
        <em key={index}>{part.slice(1, -1)}</em>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
}

// A deliberately small, safe writing format. HTML is always rendered as text.
export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="article-prose">
      {content
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((block, index) => {
          if (block.startsWith("## "))
            return <h2 key={index}>{inline(block.slice(3))}</h2>;
          if (block.startsWith("### "))
            return <h3 key={index}>{inline(block.slice(4))}</h3>;
          if (block.split("\n").every((line) => line.startsWith("- ")))
            return (
              <ul key={index}>
                {block.split("\n").map((line, i) => (
                  <li key={i}>{inline(line.slice(2))}</li>
                ))}
              </ul>
            );
          if (block.startsWith("> "))
            return (
              <blockquote key={index}>{inline(block.slice(2))}</blockquote>
            );
          return <p key={index}>{inline(block)}</p>;
        })}
    </div>
  );
}
