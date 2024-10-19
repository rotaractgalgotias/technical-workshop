let sw = document.querySelector(".state");
let bul = document.querySelector(".cr");
let bulbul = document.querySelector(".sq");

toggle = true;

sw.addEventListener("click", function () {
  if (toggle == true) {
    sw.innerText = "OFF";
    sw.style.height = "40px";
    bul.style.backgroundColor = "white";
    bul.style.boxShadow = "0 0 20px white";
    bulbul.style.backgroundColor = "white";
    bulbul.style.boxShadow = "";

    toggle = false;
  } else {
    sw.innerText = "ON";
    sw.style.height = "inherit";
    bul.style.backgroundColor = "yellow";
    bulbul.style.backgroundColor = "yellow";
    bul.style.boxShadow = "0 0 40px 20px yellow";
    bulbul.style.boxShadow = "0 0 40px yellow";
    toggle = true;
  }
});
