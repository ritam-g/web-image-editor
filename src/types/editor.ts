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

export interface EditorState {
  image: HTMLImageElement | null;
  filters: Filters;
}
