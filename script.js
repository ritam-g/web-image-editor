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
  "hue-rotate": {   // ✅ FIXED NAME
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

const imgeCanvas = document.querySelector("#image-canvase");
const ctx = imgeCanvas.getContext("2d");
const imageSelect = document.querySelector("#image-input");
const placeholder = document.querySelector(".placeholder");
const resetButton = document.querySelector("#reset");
const download = document.querySelector("button#Download");

placeholder.style.visibility = "visible";
let image = null;
//NOTE - FILTER OPTION ON WEBSITE
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

  input.addEventListener("input", e => {
    filters[name].value = e.target.value;
    applyFilter();
  });

  filter.appendChild(p);
  filter.appendChild(input);
  return filter;
}

function makeFilterIcon() {

}

function creteWebsteFilter(filters) {
  Object.keys(filters).forEach(key => {
    const f = filters[key];
    document
      .querySelector(".filters")
      .appendChild(createFilter(key, f.unit, f.value, f.min, f.max));
  });
}
creteWebsteFilter(filters)


imageSelect.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imgeCanvas.width = img.width;
    imgeCanvas.height = img.height;

    ctx.filter = "none"; // ✅ RESET
    ctx.drawImage(img, 0, 0);
  };

  placeholder.style.display = "none";
});
//NOTE - 
//! APPLY FILTER FOR WEB IMAGE 
function applyFilter() {
  if (!image) return;

  //! Here we combine all filters into one string.
  //! If a filter has its default value, it does not affect the image.
  //! Since multiple sliders can be changed at the same time,
  //! we must apply all filters together using a single filter string.

  const filterString = Object.keys(filters)
    .map(key => `${key}(${filters[key].value}${filters[key].unit})`)
    .join(" ");

  ctx.filter = filterString;
  ctx.clearRect(0, 0, imgeCanvas.width, imgeCanvas.height);
  ctx.drawImage(image, 0, 0);
}
function reset() {
  resetButton.addEventListener("click", () => {
    filters = {
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
      "hue-rotate": {   // ✅ FIXED NAME
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
    applyFilter()
    document.querySelector(".filters").innerHTML=``
    creteWebsteFilter(filters)
  })
}
reset()
function downloadFun() {
  download.addEventListener("click",()=>{
    const link=document.createElement("a")
    link.download="edited-image.png"
    link.href=imgeCanvas.toDataURL()
    link.click()
  })
}
downloadFun()