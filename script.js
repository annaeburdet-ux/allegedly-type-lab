const els = {
  fontSelect: document.getElementById("fontSelect"),
  weight: document.getElementById("weight"),
  size: document.getElementById("size"),
  tracking: document.getElementById("tracking"),
  textInput: document.getElementById("textInput"),
  mode: document.getElementById("mode"),

  weightVal: document.getElementById("weightVal"),
  sizeVal: document.getElementById("sizeVal"),
  trackingVal: document.getElementById("trackingVal"),

  stone: document.getElementById("stonePreview"),
  navy: document.getElementById("navyPreview"),
  espresso: document.getElementById("espressoPreview"),
  charcoal: document.getElementById("charcoalPreview"),

  spec1: document.getElementById("spec1"),
  spec2: document.getElementById("spec2"),
  spec3: document.getElementById("spec3"),
};

const previewNodes = [els.stone, els.navy, els.espresso, els.charcoal, els.spec1, els.spec2, els.spec3];

function setThreadColors(mode){
  // default (cream)
  const root = getComputedStyle(document.documentElement);

  const cream = root.getPropertyValue("--thread-cream").trim();
  const gold = root.getPropertyValue("--thread-gold").trim();
  const academic = root.getPropertyValue("--thread-academic").trim();

  const tonalStone = root.getPropertyValue("--thread-tonal-stone").trim();
  const tonalNavy = root.getPropertyValue("--thread-tonal-navy").trim();
  const tonalEspresso = root.getPropertyValue("--thread-tonal-espresso").trim();
  const tonalCharcoal = root.getPropertyValue("--thread-tonal-charcoal").trim();

  if(mode === "gold"){
    [els.stone, els.navy, els.espresso, els.charcoal].forEach(n => n.style.color = gold);
    [els.spec1, els.spec2, els.spec3].forEach(n => n.style.color = "#151515");
    return;
  }

  if(mode === "academic"){
    [els.stone, els.navy, els.espresso, els.charcoal].forEach(n => n.style.color = academic);
    [els.spec1, els.spec2, els.spec3].forEach(n => n.style.color = "#151515");
    return;
  }

  if(mode === "tonal"){
    els.stone.style.color = tonalStone;
    els.navy.style.color = tonalNavy;
    els.espresso.style.color = tonalEspresso;
    els.charcoal.style.color = tonalCharcoal;

    [els.spec1, els.spec2, els.spec3].forEach(n => n.style.color = "#151515");
    return;
  }

  // cream
  [els.stone, els.navy, els.espresso, els.charcoal].forEach(n => n.style.color = cream);
  [els.spec1, els.spec2, els.spec3].forEach(n => n.style.color = "#151515");
}

function apply(){
  const family = els.fontSelect.value;
  const weight = Number(els.weight.value);
  const size = Number(els.size.value);
  const tracking = Number(els.tracking.value);
  const text = (els.textInput.value || "ALLEGEDLY").toUpperCase();
  const mode = els.mode.value;

  els.weightVal.textContent = String(weight);
  els.sizeVal.textContent = String(size);
  els.trackingVal.textContent = tracking.toFixed(2);

  previewNodes.forEach(n => {
    n.style.fontFamily = `"${family}", serif`;
    n.style.fontWeight = weight;
    n.style.fontSize = `${size}px`;
    n.style.letterSpacing = `${tracking}em`;
    n.textContent = n.classList.contains("spec") ? n.textContent : text;
  });

  // keep specimen lines fixed; just update font styling
  els.spec1.textContent = "PRIVATE MEMBER • OFF MARKET • RESERVE";
  els.spec2.textContent = "DISCREET WEALTH IS STILL WEALTH";
  els.spec3.textContent = "IF YOU KNOW YOU KNOW";

  setThreadColors(mode);
}

document.querySelectorAll("button[data-preset]").forEach(btn => {
  btn.addEventListener("click", () => {
    els.textInput.value = btn.dataset.preset;
    apply();
  });
});

["change","input","keyup"].forEach(evt => {
  els.fontSelect.addEventListener(evt, apply);
  els.weight.addEventListener(evt, apply);
  els.size.addEventListener(evt, apply);
  els.tracking.addEventListener(evt, apply);
  els.textInput.addEventListener(evt, apply);
  els.mode.addEventListener(evt, apply);
});

apply();
