const filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit:"%"
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit:"%"
  },
  
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit:"%"
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit:"deg"
  },
  blur: {
    value: 0,
    min: 0,
    max: 50,
    unit:"px"
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit:"%"
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit:"%"
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit:"%"
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit:"%"
  }
};
const imgeCanvas=document.querySelector("#image-canvase")
const ctx=imgeCanvas.getContext("2d");//! it will give the pen 
const imageSelect=document.querySelector("#image-input")
const placeholder=document.querySelector(".placeholder")
placeholder.style.visibility="visible";
let image=null;
function createFilter(name,unit='%',value,min,max) {
    const filter=document.createElement('div');
    filter.classList.add('filter');
    const input=document.createElement('input');
    input.setAttribute('type','range');
    input.setAttribute('min',min);
    input.setAttribute('max',max);
    input.setAttribute('value',value);
    input.setAttribute('data-unit',unit);
    input.addEventListener("input",function (data) {
    
      filters[name].value=data.target.value
      
      applyFilter(name)
    
    })
    
    const p=document.createElement('p');
    p.innerText=name;
    filter.appendChild(p);
    filter.appendChild(input);
    return filter;
}

Object.keys(filters).forEach(key=>{
    const filter=createFilter(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
    document.querySelector('.filters').appendChild(filter);
})
imageSelect.addEventListener("change", (data) => {
  const file=data.target.files[0];
  const img=new Image();
  img.src=URL.createObjectURL(file);
  
  img.onload=()=>{
    image=img//! HER IMAGE IS 100% READY SO HERE SHOULD STORE THE DATA  
    imgeCanvas.width=img.width;
    imgeCanvas.height=img.height;
    ctx.drawImage(img,0,0);
  }
  placeholder.style.display="none";
});

function applyFilter(filterName) {
  if (!image) {
    return
  }
  ctx.filter=`${filterName}(${filters[filterName].value}${filters[filterName].unit})`;
  ctx.clearRect(0,0,imgeCanvas.width,imgeCanvas.height)
  ctx.drawImage(image, 0, 0)
}




