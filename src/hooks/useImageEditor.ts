import { useState, useCallback, useRef, useEffect } from "react";
import type { Filters, FilterType } from "../types/editor";

const DEFAULT_FILTERS: Filters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  saturate: { value: 100, min: 0, max: 200, unit: "%" },
  "hue-rotate": { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 50, unit: "px" },
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" },
};

export function useImageEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applyFilters = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const filterString = Object.entries(filters)
      .map(([key, config]) => `${key}(${config.value}${config.unit})`)
      .join(" ");

    ctx.filter = filterString;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
  }, [image, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadImage = (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImage(img);
      if (canvasRef.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
      }
    };
  };

  const updateFilter = (name: FilterType, value: number) => {
    setFilters((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return {
    canvasRef,
    image,
    filters,
    loadImage,
    updateFilter,
    resetFilters,
    downloadImage,
  };
}
