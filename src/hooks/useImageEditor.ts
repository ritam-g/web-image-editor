import { useState, useCallback, useRef, useEffect } from "react";
import type { Filters, FilterType, Transform, EditorState } from "../types/editor";

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

const DEFAULT_TRANSFORM: Transform = {
  rotate: 0,
  flipH: false,
  flipV: false,
};

export function useImageEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [state, setState] = useState<EditorState>({
    filters: DEFAULT_FILTERS,
    transform: DEFAULT_TRANSFORM,
  });
  const [history, setHistory] = useState<EditorState[]>([]);
  const [future, setFuture] = useState<EditorState[]>([]);
  
  const [isComparing, setIsComparing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applyChanges = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isComparing) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.filter = "none";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
      return;
    }

    const { filters, transform } = state;

    // Calculate dimensions based on rotation
    const isRotated = transform.rotate % 180 !== 0;
    const width = isRotated ? image.height : image.width;
    const height = isRotated ? image.width : image.height;

    canvas.width = width;
    canvas.height = height;

    // Apply filters
    const filterString = Object.entries(filters)
      .map(([key, config]) => `${key}(${config.value}${config.unit})`)
      .join(" ");

    ctx.filter = filterString;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply transformations
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((transform.rotate * Math.PI) / 180);
    ctx.scale(transform.flipH ? -1 : 1, transform.flipV ? -1 : 1);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
  }, [image, state]);

  useEffect(() => {
    applyChanges();
  }, [applyChanges]);

  const addToHistory = (newState: EditorState) => {
    setHistory((prev) => [...prev, state]);
    setFuture([]);
    setState(newState);
  };

  const loadImage = (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImage(img);
      setState({
        filters: DEFAULT_FILTERS,
        transform: DEFAULT_TRANSFORM,
      });
      setHistory([]);
      setFuture([]);
    };
  };

  const updateFilter = (name: FilterType, value: number) => {
    const newState: EditorState = {
      ...state,
      filters: {
        ...state.filters,
        [name]: { ...state.filters[name], value },
      },
    };
    addToHistory(newState);
  };

  const updateTransform = (changes: Partial<Transform>) => {
    const newState = {
      ...state,
      transform: { ...state.transform, ...changes },
    };
    addToHistory(newState);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setFuture((prev) => [state, ...prev]);
    setHistory((prev) => prev.slice(0, -1));
    setState(previous);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory((prev) => [...prev, state]);
    setFuture((prev) => prev.slice(1));
    setState(next);
  };

  const crop = (aspectRatio: number | "original") => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    // Create a temporary canvas to hold current edited state (filters + transform)
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.drawImage(canvas, 0, 0);

    let cropWidth = tempCanvas.width;
    let cropHeight = tempCanvas.height;
    let startX = 0;
    let startY = 0;

    if (aspectRatio !== "original") {
      if (tempCanvas.width / tempCanvas.height > aspectRatio) {
        cropWidth = tempCanvas.height * aspectRatio;
        startX = (tempCanvas.width - cropWidth) / 2;
      } else {
        cropHeight = tempCanvas.width / aspectRatio;
        startY = (tempCanvas.height - cropHeight) / 2;
      }
    }

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = cropWidth;
    finalCanvas.height = cropHeight;
    const finalCtx = finalCanvas.getContext("2d");
    if (!finalCtx) return;

    finalCtx.drawImage(
      tempCanvas,
      startX, startY, cropWidth, cropHeight,
      0, 0, cropWidth, cropHeight
    );

    const croppedImg = new Image();
    croppedImg.src = finalCanvas.toDataURL();
    croppedImg.onload = () => {
      setImage(croppedImg);
      setState({
        filters: DEFAULT_FILTERS,
        transform: DEFAULT_TRANSFORM,
      });
      setHistory([]);
      setFuture([]);
    };
  };

  const resetFilters = () => {
    addToHistory({
      filters: DEFAULT_FILTERS,
      transform: DEFAULT_TRANSFORM,
    });
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvasRef.current.toDataURL("image/png", 1.0);
    link.click();
  };

  return {
    canvasRef,
    image,
    filters: state.filters,
    transform: state.transform,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    loadImage,
    updateFilter,
    updateTransform,
    resetFilters,
    downloadImage,
    undo,
    redo,
    crop,
    isComparing,
    setIsComparing,
  };
}
