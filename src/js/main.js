let delay = 0.1;
let revealText = document.querySelector(".reveal");
let letters = revealText.textContent.split("");
revealText.textContent = "";
let middle = letters.length / 2;
letters.forEach((letter, i) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
    revealText.append(span);
});