import { useRef } from "react";

interface ToolbarProps {
  onImageSelect: (file: File) => void;
  onReset: () => void;
  onDownload: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onCompareChange: (isComparing: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  isComparing: boolean;
}

export function Toolbar({ 
  onImageSelect, 
  onReset, 
  onDownload, 
  onUndo, 
  onRedo, 
  onCompareChange,
  canUndo, 
  canRedo,
  isComparing
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <header className="app-header">
      <div className="logo">
        <i className="ri-image-edit-line"></i>
        <span>Image Editor Pro</span>
      </div>

      <div className="actions">
        <button 
          className="btn-icon" 
          onClick={onUndo} 
          disabled={!canUndo}
          title="Undo"
        >
          <i className="ri-arrow-go-back-line"></i>
        </button>
        <button 
          className="btn-icon" 
          onClick={onRedo} 
          disabled={!canRedo}
          title="Redo"
        >
          <i className="ri-arrow-go-forward-line"></i>
        </button>
        <div className="divider"></div>
        <button 
          className={`btn-icon ${isComparing ? "active" : ""}`}
          onMouseDown={() => onCompareChange(true)}
          onMouseUp={() => onCompareChange(false)}
          onMouseLeave={() => onCompareChange(false)}
          title="Hold to Compare with Original"
        >
          <i className="ri-overlap-line"></i>
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="export">
        <label className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
          Open Image
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>
        <button className="btn btn-success" onClick={onDownload}>
          <i className="ri-download-2-line"></i>
          Export
        </button>
      </div>
    </header>
  );
}
