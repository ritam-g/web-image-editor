import type { RefObject } from "react";

interface CanvasPreviewProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  hasImage: boolean;
  onPlaceholderClick: () => void;
}


export function CanvasPreview({ canvasRef, hasImage, onPlaceholderClick }: CanvasPreviewProps) {
  return (
    <div className="bottom" onClick={!hasImage ? onPlaceholderClick : undefined}>
      {!hasImage && (
        <div className="placeholder" style={{ visibility: "visible" }}>
          <i className="ri-image-line"></i>
          <p>No Image Chosen</p>
        </div>
      )}
      <canvas
        id="image-canvas"
        ref={canvasRef}
        style={{ display: hasImage ? "block" : "none" }}
      ></canvas>
    </div>
  );
}
