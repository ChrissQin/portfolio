"use client";

import { useState } from "react";

import { PlaceholderMedia } from "@/components/media/PlaceholderMedia";
import type { Project } from "@/lib/projects";
import { getEmbedSrc } from "@/lib/video";

type ProjectMediaProps = {
  project: Project;
};

export function ProjectMedia({ project }: ProjectMediaProps) {
  const [activated, setActivated] = useState(false);
  const orientation = project.orientation;
  const aspectRatio = orientation === "vertical" ? "9 / 16" : "16 / 9";
  const embedSrc = getEmbedSrc(project.videoProvider, project.videoUrl);
  const isLocal =
    project.videoProvider === "local" || project.videoProvider === "external";
  const hasPlayable =
    Boolean(embedSrc) || (isLocal && Boolean(project.videoUrl));

  return (
    <div
      className={`project-media project-media--${orientation}${activated ? " project-media--active" : ""}`}
    >
      {!activated || !hasPlayable ? (
        <div className="project-media__poster">
          <PlaceholderMedia
            src={project.thumbnail}
            alt={`${project.title} poster`}
            label={project.title}
            hint="Poster needed"
            aspectRatio={aspectRatio}
            motif={orientation === "vertical" ? "vertical" : "frame"}
            className="project-media__image"
            sizes={
              orientation === "vertical"
                ? "(max-width: 899px) 80vw, 28vw"
                : "(max-width: 899px) 100vw, 80vw"
            }
          />
          {hasPlayable ? (
            <button
              type="button"
              className="project-media__play"
              onClick={() => setActivated(true)}
            >
              Play video
            </button>
          ) : (
            <p className="project-media__unavailable">Video needed</p>
          )}
        </div>
      ) : embedSrc ? (
        <div className="project-media__frame" style={{ aspectRatio }}>
          <iframe
            className="project-media__iframe"
            src={`${embedSrc}${embedSrc.includes("?") ? "&" : "?"}autoplay=1`}
            title={`${project.title} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : project.videoUrl ? (
        <div className="project-media__frame" style={{ aspectRatio }}>
          <video
            className="project-media__video"
            src={project.videoUrl}
            controls
            playsInline
            autoPlay
            preload="metadata"
          >
            Your browser does not support embedded video.
          </video>
        </div>
      ) : null}
    </div>
  );
}
