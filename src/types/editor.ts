export interface FilterConfig {
  value: number;
  min: number;
  max: number;
  unit: string;
}

export type FilterType =
  | "brightness"
  | "contrast"
  | "saturate"
  | "hue-rotate"
  | "blur"
  | "grayscale"
  | "sepia"
  | "opacity"
  | "invert";

export type Filters = Record<FilterType, FilterConfig>;

export interface Transform {
  rotate: number; // 0, 90, 180, 270
  flipH: boolean;
  flipV: boolean;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EditorState {
  filters: Filters;
  transform: Transform;
}
