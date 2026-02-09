import { useImageEditor } from "../hooks/useImageEditor";
import { Toolbar } from "../features/controls/Toolbar";
import { CanvasPreview } from "../components/CanvasPreview";
import { Sidebar } from "../features/controls/Sidebar";

export function EditorWorkspace() {
  const {
    canvasRef,
    image,
    filters,
    transform,
    canUndo,
    canRedo,
    loadImage,
    updateFilter,
    updateTransform,
    resetFilters,
    downloadImage,
    undo,
    redo,
    isComparing,
    setIsComparing,
    crop,
  } = useImageEditor();

  return (
    <div className="app-container">
      <Toolbar
        onImageSelect={loadImage}
        onReset={resetFilters}
        onDownload={downloadImage}
        onUndo={undo}
        onRedo={redo}
        onCompareChange={setIsComparing}
        isComparing={isComparing}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <main className="editor-main">
        <Sidebar
          filters={filters}
          transform={transform}
          onFilterChange={updateFilter}
          onTransformChange={updateTransform}
          onCrop={crop}
        />
        <section className="canvas-area">
          <CanvasPreview
            canvasRef={canvasRef}
            hasImage={!!image}
            onPlaceholderClick={() => {
              const input = document.querySelector('input[type="file"]') as HTMLInputElement;
              input?.click();
            }}
          />
        </section>
      </main>
    </div>
  );
}
