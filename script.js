// 🌸 Hoa rơi
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
  const x = Math.random() * canvas.width;
  const y = -10; // bắt đầu trên cùng
  const size = Math.random() * 15 + 10;
  const speed = Math.random() * 1 + 0.5;
  const drift = Math.random() * 2 - 1;
  const color = ["#ff7eb9", "#ff65a3", "#ff8fab", "#ffb6c1"][Math.floor(Math.random() * 4)];
  hearts.push({ x, y, size, speed, drift, color, angle: Math.random() * Math.PI });
}

function drawHeart(h) {
  ctx.save();
  ctx.translate(h.x, h.y);
  ctx.rotate(h.angle);
  ctx.scale(h.size / 30, h.size / 30);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-15, -15, -30, 10, 0, 30);
  ctx.bezierCurveTo(30, 10, 15, -15, 0, 0);
  ctx.fillStyle = h.color;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // tạo thêm tim ngẫu nhiên (và không vượt quá 100 tim)
  if (Math.random() < 0.2 && hearts.length < 100) createHeart();

  hearts.forEach((h, i) => {
    h.y += h.speed;
    h.x += h.drift * 0.5;
    h.angle += 0.02;

    drawHeart(h);

    // nếu tim rơi ra ngoài khung thì xóa
    if (h.y > canvas.height + 30) hearts.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

// cập nhật kích thước canvas khi đổi cỡ màn hình
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 💌 Lời chúc
// Import Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

  // === CONFIG CỦA BẠN ===
  const firebaseConfig = {
    apiKey: "AIzaSyDWY3sQ_Gz4UeKGqFHKp10d83h3SRNoZv0",
    authDomain: "wedding-card-be153.firebaseapp.com",
    databaseURL: "https://wedding-card-be153-default-rtdb.firebaseio.com",
    projectId: "wedding-card-be153",
    storageBucket: "wedding-card-be153.firebasestorage.app",
    messagingSenderId: "396090536315",
    appId: "1:396090536315:web:9ad4ce0da0bfe2c86f0dde",
    measurementId: "G-TLF5PVGE8N"
  };

  // === KẾT NỐI FIREBASE ===
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // === GỬI LỜI CHÚC ===
  document.getElementById("wishForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
      showPopup("💌 Vui lòng nhập tên và lời chúc!");
      return;
    }

    try {
      await push(ref(db, "wishes"), {
        name,
        message,
        time: new Date().toISOString()
      });
      showPopup("Cảm ơn bạn đã gửi lời chúc!");
      e.target.reset();
    } catch (err) {
      console.error(err);
      showPopup("Gửi lời chúc thất bại. Vui lòng thử lại!");
    }
  });

function showPopup(message) {
  // Tạo popup nếu chưa có
  let popup = document.getElementById('popupMessage');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'popupMessage';
    document.body.appendChild(popup);
  }

  // Gán nội dung và hiển thị
  popup.innerText = message;
  popup.style.display = 'flex';
  popup.style.opacity = '1';

  // Thêm hiệu ứng trái tim bay
  for (let i = 0; i < 10; i++) {
    createFlyingHeart();
  }

  // Ẩn popup sau 3 giây
  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => popup.style.display = 'none', 500);
  }, 3000);
}

// ❤️ Hàm tạo trái tim bay
function createFlyingHeart() {
  const heart = document.createElement('div');
  heart.className = 'flying-heart';
  heart.innerHTML = '❤️';
  document.body.appendChild(heart);

  const startX = window.innerWidth / 2 - 50 + Math.random() * 100;
  const startY = window.innerHeight / 2;
  const duration = 2000 + Math.random() * 1000;
  const offsetX = (Math.random() - 0.5) * 200;
  const offsetY = -200 - Math.random() * 200;
  const scale = 0.8 + Math.random() * 0.6;

  heart.style.left = `${startX}px`;
  heart.style.top = `${startY}px`;
  heart.style.fontSize = `${24 * scale}px`;

  // Animation
  heart.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    { transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`, opacity: 0 }
  ], {
    duration,
    easing: 'ease-out',
    fill: 'forwards'
  });

  // Xóa sau khi animation kết thúc
  setTimeout(() => heart.remove(), duration);
}

// 🎵 Bắt đầu nhạc khi người dùng tương tác (fix autoplay)
const bgMusic = document.getElementById('bgMusic');
document.body.addEventListener('click', () => {
  bgMusic.play().catch(() => {});
}, { once: true });

// === SLIDESHOW ẢNH CƯỚI ===
let slideIndex = 1;
let slideTimer;

// Hiển thị ảnh hiện tại
function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (slides.length === 0) return;

  // vòng lại nếu vượt biên
  if (slideIndex > slides.length) slideIndex = 1;
  if (slideIndex < 1) slideIndex = slides.length;

  // ẩn tất cả ảnh
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // bỏ active khỏi dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // hiển thị ảnh hiện tại
  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";

  // reset timer tự động chạy
  clearTimeout(slideTimer);
  slideTimer = setTimeout(() => {
    slideIndex++;
    showSlides();
  }, 4000);
}

// Nút điều hướng
function plusSlides(n) {
  slideIndex += n;          // chỉ thay đổi chỉ số
  clearTimeout(slideTimer); // ngừng timer cũ
  showSlides();             // hiển thị lại đúng ảnh
}

// Khi click vào chấm
function currentSlide(n) {
  slideIndex = n;
  clearTimeout(slideTimer);
  showSlides();
}

// Bắt đầu
showSlides();


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
