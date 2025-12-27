// ================================
// FILTER CONFIGURATION OBJECT
// Stores all filter values, limits, and units
// ================================
let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%"
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%"
  },
  saturate: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%"
  },
  "hue-rotate": {   // Canvas uses CSS filter naming
    value: 0,
    min: 0,
    max: 360,
    unit: "deg"
  },
  blur: {
    value: 0,
    min: 0,
    max: 50,
    unit: "px"
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%"
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%"
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%"
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%"
  }
};

// ================================
// DOM REFERENCES
// ================================
const imgeCanvas = document.querySelector("#image-canvase");
const ctx = imgeCanvas.getContext("2d"); // Canvas drawing context
const imageSelect = document.querySelector("#image-input");
const placeholder = document.querySelector(".placeholder");
const resetButton = document.querySelector("#reset");
const download = document.querySelector("button#Download");

placeholder.style.visibility = "visible";
let image = null; // Holds the currently loaded image

// ================================
// CREATE A SINGLE FILTER UI CONTROL
// ================================
function createFilter(name, unit, value, min, max) {
  const filter = document.createElement("div");
  filter.classList.add("filter");

  const p = document.createElement("p");
  p.innerText = name;

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;

  // Update filter value on slider movement
  input.addEventListener("input", e => {
    filters[name].value = e.target.value;
    applyFilter();
  });

  filter.appendChild(p);
  filter.appendChild(input);
  return filter;
}

// ================================
// RENDER ALL FILTER CONTROLS
// ================================
function creteWebsteFilter(filters) {
  Object.keys(filters).forEach(key => {
    const f = filters[key];
    document
      .querySelector(".filters")
      .appendChild(createFilter(key, f.unit, f.value, f.min, f.max));
  });
}

creteWebsteFilter(filters);

// ================================
// IMAGE UPLOAD HANDLING
// ================================
imageSelect.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imgeCanvas.width = img.width;
    imgeCanvas.height = img.height;

    // Reset filters before drawing new image
    ctx.filter = "none";
    ctx.drawImage(img, 0, 0);
  };

  placeholder.style.display = "none";
});

// ================================
// APPLY ALL FILTERS TO CANVAS
// ================================
function applyFilter() {
  if (!image) return;

  /*
    Canvas supports only ONE filter string.
    So we combine all filter values into a single string.
    Filters with default values do not affect the image.
  */
  const filterString = Object.keys(filters)
    .map(key => `${key}(${filters[key].value}${filters[key].unit})`)
    .join(" ");

  ctx.filter = filterString;
  ctx.clearRect(0, 0, imgeCanvas.width, imgeCanvas.height);
  ctx.drawImage(image, 0, 0);
}

// ================================
// RESET ALL FILTERS TO DEFAULT
// ================================
function reset() {
  resetButton.addEventListener("click", () => {

    // Restore default filter values
    filters = {
      brightness: { value: 100, min: 0, max: 200, unit: "%" },
      contrast: { value: 100, min: 0, max: 200, unit: "%" },
      saturate: { value: 100, min: 0, max: 200, unit: "%" },
      "hue-rotate": { value: 0, min: 0, max: 360, unit: "deg" },
      blur: { value: 0, min: 0, max: 50, unit: "px" },
      grayscale: { value: 0, min: 0, max: 100, unit: "%" },
      sepia: { value: 0, min: 0, max: 100, unit: "%" },
      opacity: { value: 100, min: 0, max: 100, unit: "%" },
      invert: { value: 0, min: 0, max: 100, unit: "%" }
    };

    applyFilter();

    // Rebuild filter UI
    document.querySelector(".filters").innerHTML = ``;
    creteWebsteFilter(filters);
  });
}

reset();

// ================================
// DOWNLOAD EDITED IMAGE
// ================================
function downloadFun() {
  download.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imgeCanvas.toDataURL();
    link.click();
  });
}

downloadFun();
