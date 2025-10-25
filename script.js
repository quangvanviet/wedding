// 🌸 Hoa rơi 1
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

// 🌸 Hoa rơi 2
const canvas1 = document.getElementById('flowerCanvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

let hearts1 = [];

function createHeart1() {
  const x = Math.random() * canvas1.width;
  const y = -10; // bắt đầu trên cùng
  const size = Math.random() * 15 + 10;
  const speed = Math.random() * 1 + 0.5;
  const drift = Math.random() * 2 - 1;
  const color = ["#ff7eb9", "#ff65a3", "#ff8fab", "#ffb6c1"][Math.floor(Math.random() * 4)];
  hearts1.push({ x, y, size, speed, drift, color, angle: Math.random() * Math.PI });
}

function drawHeart1(h) {
  ctx1.save();
  ctx1.translate(h.x, h.y);
  ctx1.rotate(h.angle);
  ctx1.scale(h.size / 30, h.size / 30);
  ctx1.beginPath();
  ctx1.moveTo(0, 0);
  ctx1.bezierCurveTo(-15, -15, -30, 10, 0, 30);
  ctx1.bezierCurveTo(30, 10, 15, -15, 0, 0);
  ctx1.fillStyle = h.color;
  ctx1.fill();
  ctx1.restore();
}

function animate1() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  // tạo thêm tim ngẫu nhiên (và không vượt quá 100 tim)
  if (Math.random() < 0.2 && hearts.length < 10) createHeart1();

  hearts.forEach((h, i) => {
    h.y += h.speed;
    h.x += h.drift * 0.5;
    h.angle += 0.02;

    drawHeart1(h);

    // nếu tim rơi ra ngoài khung thì xóa
    if (h.y > canvas1.height + 30) hearts.splice(i, 1);
  });

  requestAnimationFrame(animate1);
}

animate1();

// cập nhật kích thước canvas khi đổi cỡ màn hình
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
});

// 💌 Lời chúc
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
    await db.ref("wishes").push({
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

// ====== NÚT XEM LỜI CHÚC ======
  document.getElementById("viewWishesBtn").addEventListener("click", async () => {
    const overlay = document.createElement("div");
    overlay.className = "wishes-overlay";
    overlay.innerHTML = `
      <div class="wishes-popup">
        <h2>💌 Lời chúc 💌</h2>
        <div id="wishesList" class="wishes-list">Đang tải...</div>
        <button id="closeWishesBtn" class="close-wishes-btn">Đóng</button>
      </div>
    `;
    document.body.appendChild(overlay);

    // Đóng popup
    document.getElementById("closeWishesBtn").onclick = () => overlay.remove();

    // Load dữ liệu từ Firebase
    const wishesRef = db.ref("wishes");
    wishesRef.on("value", (snapshot) => {
      const wishesList = document.getElementById("wishesList");
      wishesList.innerHTML = "";
      const data = snapshot.val();
    
      if (!data) {
        wishesList.innerHTML = "<p>Chưa có lời chúc nào cả</p>";
        return;
      }
    
      const entries = Object.values(data).reverse();
      for (const wish of entries) {
        const p = document.createElement("div");
        const date = new Date(wish.time).toLocaleString("vi-VN");
        p.className = "wish-item";
        p.innerHTML = `
          <p><strong>Người gửi: ${wish.name}</strong></p>
          <p>Lời chúc: ${wish.message}</p>
          <span>${date}</span>
        `;
        wishesList.appendChild(p);
      }
    });
  });

  // ====== CSS CHO POPUP ======
  const style = document.createElement("style");
  style.textContent = `
    .wishes-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999;
      animation: fadeIn 0.3s ease;
    }
    .wishes-popup {
      background: white;
      max-width: 500px;
      width: 90%;
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      text-align: center;
      position: relative;
      max-height: 80vh;
      overflow-y: auto;
    }
    .wishes-list {
      text-align: left;
      margin-top: 15px;
      max-height: 60vh;
      overflow-y: auto;
    }
    .wish-item {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
    }
    .wish-item span {
      font-size: 12px;
      color: gray;
    }
    .close-wishes-btn {
      background: #ff6fa1;
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      margin-top: 15px;
      font-weight: bold;
    }
    .close-wishes-btn:hover {
      background: #ff4f80;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);


//QR code
document.querySelectorAll(".qr-image").forEach(img => {
    img.addEventListener("click", () => {
      // Tạo overlay
      const overlay = document.createElement("div");
      overlay.style = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
      `;
      
      // Tạo ảnh phóng to
      const bigImg = document.createElement("img");
      bigImg.src = img.src;
      bigImg.style = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(255,255,255,0.5);
        transition: transform 0.3s ease;
      `;
      
      // Khi click overlay thì đóng
      overlay.addEventListener("click", () => overlay.remove());
      
      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);
    });
  });

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

  const openBtn = document.getElementById("openCardBtn");
  const container = document.querySelector(".envelope-container");

  openBtn.addEventListener("click", () => {
    container.classList.add("envelope-open");
  });

