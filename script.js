// 🌸 Hoa rơi
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
let flowers = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createFlower() {
  const x = Math.random() * canvas.width;
  const y = 0;
  const size = Math.random() * 15 + 10;
  const speed = Math.random() * 1 + 0.5;
  const drift = Math.random() * 2 - 1;
  flowers.push({ x, y, size, speed, drift });
}

function drawFlower(flower) {
  ctx.beginPath();
  ctx.fillStyle = `rgba(255,182,193,0.8)`;
  ctx.arc(flower.x, flower.y, flower.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.2) createFlower();
  flowers.forEach((f, i) => {
    f.y += f.speed;
    f.x += f.drift;
    if (f.y > canvas.height) flowers.splice(i, 1);
    drawFlower(f);
  });
  requestAnimationFrame(animate);
}
animate();

// 💌 Lời chúc
document.getElementById('wishForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const wishList = document.getElementById('wishList');
  const newWish = document.createElement('p');
  newWish.innerHTML = `<strong>${name}:</strong> ${message}`;
  wishList.prepend(newWish);
  this.reset();
});

// 🎵 Bắt đầu nhạc khi người dùng tương tác (fix autoplay)
const bgMusic = document.getElementById('bgMusic');
document.body.addEventListener('click', () => {
  bgMusic.play().catch(() => {});
}, { once: true });

// === SLIDESHOW ẢNH CƯỚI ===
let slideIndex = 0;
let slideTimer; // giữ timer hiện tại

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  
  clearTimeout(slideTimer); // xóa timer cũ
  slideTimer = setTimeout(showSlides, 4000); // đổi ảnh mỗi 4 giây
}

// Nút điều hướng
function plusSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const slideLength = slides.length; // tự lấy số ảnh

  slideIndex += n;

  if (slideIndex > slideLength) slideIndex = 1;
  if (slideIndex < 1) slideIndex = slideLength;

  clearTimeout(slideTimer);
  showSlides();
}

// Khi click vào chấm
function currentSlide(n) {
  slideIndex = n - 1;
  clearTimeout(slideTimer); // reset timer
  showSlides();
}

// Bắt đầu slideshow
showSlides()

// === ALBUM ẢNH CƯỚI ===
const albumGrid = document.getElementById('albumGrid');

// Giả sử có 20 ảnh, đánh số từ 1.jpg -> 20.jpg
const totalPhotos = 20; // bạn chỉ cần đổi con số này
for (let i = 1; i <= totalPhotos; i++) {
  const img = document.createElement('img');
  img.src = `images/album/${i}.jpg`;
  img.alt = `Ảnh cưới ${i}`;
  img.addEventListener('click', () => openLightbox(img.src));
  albumGrid.appendChild(img);
}

// Tạo lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const lightImg = document.createElement('img');
lightbox.appendChild(lightImg);

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

function openLightbox(src) {
  lightImg.src = src;
  lightbox.style.display = 'flex';
  lightbox.style.justifyContent = 'center';
  lightbox.style.alignItems = 'center';
}

