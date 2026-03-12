const photo = document.querySelector(".speaker-card__photo");
const playBtn = photo.querySelector(".speaker-card__play");
const audio = photo.querySelector("audio");
const circle = photo.querySelector(".speaker-card__progress-ring-circle");

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  setProgress(percent);
});

audio.addEventListener("ended", () => {
  setProgress(0);
  playBtn.textContent = "▶";
});

///////////////
const starBlocks = document.querySelectorAll(".speaker-card__stars");

starBlocks.forEach((starBlock) => {
  const rating = parseFloat(starBlock.previousElementSibling.textContent);

  const maxStars = parseInt(starBlock.getAttribute("data-rating")) || 5;
  let starsHTML = "";

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.round(rating)) {
      starsHTML += "★";
    } else {
      starsHTML += "☆";
    }
  }

  starBlock.textContent = starsHTML;
});

//////////////////

const btn = document.querySelector(".contact-btn");

function updateButton() {
  if (window.innerWidth <= 900) {
    btn.innerHTML = `  Связаться
      <svg width="18" height="18" viewBox="0 0 24 24" style="margin-right:8px;">
        <path fill="currentColor"
        d="M9.04 15.47l-.39 5.49c.56 0 .8-.24 1.09-.53l2.61-2.5 5.41 3.96c.99.55 1.69.26 1.94-.91l3.52-16.48c.33-1.54-.56-2.14-1.52-1.77L1.8 9.6C.3 10.18.32 11.02 1.55 11.4l5.1 1.59L18.4 5.8c.55-.34 1.05-.15.64.19"/>
      </svg>
    `;
  } else {
    btn.textContent = "Заказать";
  }
}

updateButton();
window.addEventListener("resize", updateButton);

btn.addEventListener("click", () => {
  if (window.innerWidth <= 900) {
    window.open("https://t.me/yourusername", "_blank");
  }
});
