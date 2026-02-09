import { useState } from "react";
import type { Filters, FilterType, Transform } from "../../types/editor";
import { FilterList } from "../filters/FilterList";

interface SidebarProps {
  filters: Filters;
  transform: Transform;
  onFilterChange: (name: FilterType, value: number) => void;
  onTransformChange: (changes: Partial<Transform>) => void;
  onCrop: (aspectRatio: number | "original") => void;
}

export function Sidebar({ filters, transform, onFilterChange, onTransformChange, onCrop }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"adjust" | "transform" | "crop">("adjust");

  return (
    <aside className="sidebar">
      <div className="tabs">
        <button
          className={activeTab === "adjust" ? "active" : ""}
          onClick={() => setActiveTab("adjust")}
        >
          <i className="ri-equalizer-line"></i>
          Adjust
        </button>
        <button
          className={activeTab === "transform" ? "active" : ""}
          onClick={() => setActiveTab("transform")}
        >
          <i className="ri-aspect-ratio-line"></i>
          Transform
        </button>
        <button
          className={activeTab === "crop" ? "active" : ""}
          onClick={() => setActiveTab("crop")}
        >
          <i className="ri-crop-line"></i>
          Crop
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "adjust" && (
          <FilterList filters={filters} onFilterChange={onFilterChange} />
        )}
        {activeTab === "transform" && (
          <div className="transform-controls">
            <h3>Rotation</h3>
            <div className="btn-group">
              <button onClick={() => onTransformChange({ rotate: (transform.rotate - 90 + 360) % 360 })}>
                <i className="ri-rotate-left-line"></i> -90°
              </button>
              <button onClick={() => onTransformChange({ rotate: (transform.rotate + 90) % 360 })}>
                <i className="ri-rotate-right-line"></i> +90°
              </button>
            </div>

            <h3>Flip</h3>
            <div className="btn-group">
              <button 
                className={transform.flipH ? "active" : ""}
                onClick={() => onTransformChange({ flipH: !transform.flipH })}
              >
                <i className="ri-reflect-vertical"></i> Flip H
              </button>
              <button 
                className={transform.flipV ? "active" : ""}
                onClick={() => onTransformChange({ flipV: !transform.flipV })}
              >
                <i className="ri-reflect-horizontal"></i> Flip V
              </button>
            </div>
          </div>
        )}
        {activeTab === "crop" && (
          <div className="crop-controls">
            <h3>Aspect Ratio</h3>
            <div className="btn-group-grid">
              <button onClick={() => onCrop("original")}>Original</button>
              <button onClick={() => onCrop(1)}>1:1 Square</button>
              <button onClick={() => onCrop(4/3)}>4:3 Standard</button>
              <button onClick={() => onCrop(16/9)}>16:9 Widescreen</button>
              <button onClick={() => onCrop(3/2)}>3:2 Classic</button>
              <button onClick={() => onCrop(2/3)}>2:3 Portrait</button>
            </div>
            <p className="hint">Note: Cropping currently centers the area and resets history.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
