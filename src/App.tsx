import "remixicon/fonts/remixicon.css";
import "./App.scss";
import { useImageEditor } from "./hooks/useImageEditor";
import { Toolbar } from "./features/controls/Toolbar";
import { CanvasPreview } from "./components/CanvasPreview";
import { FilterList } from "./features/filters/FilterList";

function App() {
  const {
    canvasRef,
    image,
    filters,
    loadImage,
    updateFilter,
    resetFilters,
    downloadImage,
  } = useImageEditor();

  return (
    <main>
      <section>
        <div className="left">
          <Toolbar
            onImageSelect={loadImage}
            onReset={resetFilters}
            onDownload={downloadImage}
          />
          <CanvasPreview
            canvasRef={canvasRef}
            hasImage={!!image}
            onPlaceholderClick={() => {
              const input = document.querySelector('input[type="file"]') as HTMLInputElement;
              input?.click();
            }}
          />
        </div>
        <FilterList filters={filters} onFilterChange={updateFilter} />
      </section>
    </main>
  );
}

export default App;
