import { useRef } from "react";

interface ToolbarProps {
  onImageSelect: (file: File) => void;
  onReset: () => void;
  onDownload: () => void;
}

export function Toolbar({ onImageSelect, onReset, onDownload }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="top">
      <label className="btn" onClick={() => fileInputRef.current?.click()}>
        Choose Image
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </label>
      <button className="btn" id="reset" onClick={onReset}>
        Reset
      </button>
      <button className="btn" id="Download" onClick={onDownload}>
        Download
      </button>
    </div>
  );
}
