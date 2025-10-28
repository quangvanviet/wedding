const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas1 = document.getElementById('flowerCanvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

let hearts = [];
let hearts1 = [];

// Tạo và vẽ tim
function createHeart(arr, canvas) {
  const x = Math.random() * canvas.width;
  const y = -10;
  const size = Math.random() * 15 + 10;
  const speed = Math.random() * 1 + 0.5;
  const drift = Math.random() * 2 - 1;
  const color = ["#ff7eb9", "#ff65a3", "#ff8fab", "#ffb6c1"][Math.floor(Math.random() * 4)];
  arr.push({ x, y, size, speed, drift, color, angle: Math.random() * Math.PI });
}

function drawHeart(ctx, h) {
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

// Animation tim rơi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  // tạo tim ngẫu nhiên
  if (Math.random() < 0.2 && hearts.length < 100) createHeart(hearts, canvas);
  if (Math.random() < 0.2 && hearts1.length < 20) createHeart(hearts1, canvas1);

  // cập nhật tim 1
  hearts.forEach((h, i) => {
    h.y += h.speed;
    h.x += h.drift * 0.5;
    h.angle += 0.02;
    drawHeart(ctx, h);
    if (h.y > canvas.height + 30) hearts.splice(i, 1);
  });

  // cập nhật và vẽ tim 2
  hearts1.forEach((h, i) => {
    h.y += h.speed * 0.7;
    h.x += h.drift * 0.6;
    h.angle -= 0.015;
    drawHeart(ctx1, h);
    if (h.y > canvas1.height + 30) hearts1.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

// Resize canvas khi thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
});

function toggleQR() {
  const qr = document.getElementById('qrContainer');
  const btn = document.querySelector('.qr-button');
  const isVisible = qr.style.display === 'flex';
  qr.style.display = isVisible ? 'none' : 'flex';
  btn.textContent = isVisible ? '💌 Tặng quà' : '💝 Ẩn mã QR';
}

// Lời chúc
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
      time: new Date().toISOString(),
      active: false,
    });
    showPopup("Cảm ơn bạn đã gửi lời chúc!");
    e.target.reset();
  } catch (err) {
    console.error(err);
    showPopup("Gửi lời chúc thất bại. Vui lòng thử lại!");
  }
});

function showPopup(message) {
  // Tạo popup
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

  for (let i = 0; i < 10; i++) {
    createFlyingHeart();
  }

  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => popup.style.display = 'none', 500);
  }, 3000);
}

// Tạo trái tim bay ngẫu nhiên
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

// NÚT XEM LỜI CHÚC
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
    
      const entries = Object.values(data).filter((wish) => wish.active).reverse()
      
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

  // CSS CHO POPUP
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

// Bắt đầu nhạc
const bgMusic = document.getElementById('bgMusic');

// Bật nhạc nếu chưa phát
function ensureMusicPlaying() {
  if (bgMusic.paused) {
    bgMusic.play().catch(err => {
      console.log("Chưa thể play nhạc:", err);
    });
  } else {
    // Dừng interval nếu nhạc đang chạy
    clearInterval(musicCheckInterval);
  }
}

// Khi người dùng click thì bật nhạc
document.body.addEventListener('click', () => {
  ensureMusicPlaying();
}, { once: true });

// Kiểm tra định kỳ mỗi 3 giây
const musicCheckInterval = setInterval(() => {
  ensureMusicPlaying();
}, 3000);


// SLIDESHOW ẢNH CƯỚI
let slideIndex = 0;
let slideTimer;

// Hiển thị ảnh hiện tại
function showSlides() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (slides.length === 0) return;

  // Ẩn tất cả slide
  slides.forEach(slide => slide.style.display = "none");

  // Bỏ active
  dots.forEach(dot => dot.classList.remove("active"));

  // Vòng lại nếu vượt quá
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  // Hiển thị slide hiện tại
  slides[slideIndex].style.display = "block";
  if (dots[slideIndex]) dots[slideIndex].classList.add("active");

  // Timer tự động chuyển slide sau 4s
  clearTimeout(slideTimer);
  slideTimer = setTimeout(() => {
    slideIndex++;
    showSlides();
  }, 4000);
}

//Nút tiến lùi
function plusSlides(n) {
  slideIndex += n;
  showSlides();
}

// Click vào chấm
function currentSlide(n) {
  slideIndex = n;
  showSlides();
}

// Bắt đầu slideshow
showSlides();

// ALBUM ẢNH CƯỚI
const albumGrid = document.getElementById('albumGrid');
const totalPhotos = 20;
const photoUrls = [];
for(let i=0; i<totalPhotos; i++){
  const src = `https://cdn.jsdelivr.net/gh/quangvanviet/wedding/images/album/${i+1}.jpg`;
  photoUrls.push(src);

  const img = document.createElement('img');
  img.src = src;
  img.alt = `Ảnh cưới ${i+1}`;
  img.addEventListener('click', () => openLightbox(i)); 
  albumGrid.appendChild(img);
}

// Lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.display = 'none';
document.body.appendChild(lightbox);

const lightImg = document.createElement('img');
lightbox.appendChild(lightImg);

let currentIndex = 0;

// Mở lightbox
function openLightbox(index){
  currentIndex = index;
  lightImg.src = photoUrls[currentIndex];
  lightbox.style.display = 'flex';
}

// Click vùng trái/phải
lightbox.addEventListener('click', (e)=>{
  const rect = lightbox.getBoundingClientRect();
  if(e.clientX < rect.width/2){
    showPrev();
  } else {
    showNext();
  }
});

// Lặp ảnh khi bấm tiến lừi
function showNext(){
  currentIndex = (currentIndex+1)%totalPhotos;
  lightImg.src = photoUrls[currentIndex];
}
function showPrev(){
  currentIndex = (currentIndex-1+totalPhotos)%totalPhotos;
  lightImg.src = photoUrls[currentIndex];
}

// Đóng ảnh khi bấm esc
document.addEventListener('keydown', (e)=>{
  if(lightbox.style.display==='flex'){
    if(e.key==='Escape') lightbox.style.display='none';
    if(e.key==='ArrowRight') showNext();
    if(e.key==='ArrowLeft') showPrev();
  }
});

// vuốt trên điện thoại
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart',(e)=>{
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend',(e)=>{
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture(){
  if(touchEndX < touchStartX - 30){ // Trái
    showNext();
  }
  if(touchEndX > touchStartX + 30){ // phải
    showPrev();
  }
}

const closeBtn = document.createElement('button');
closeBtn.className = 'close-btn';
closeBtn.innerHTML = '&times;';
lightbox.appendChild(closeBtn);

closeBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // không kích hoạt khi bấm tiến lùi
  lightbox.style.display = 'none';
});



const openBtn = document.getElementById("openCardBtn");
const container = document.querySelector(".envelope-container");
const containerOpenThiep = document.getElementById("OpenThiep");

openBtn.addEventListener("click", () => {
  containerOpenThiep.style.transform = "translate(-50%, -250%)";
  containerOpenThiep.style.opacity = 0;
  
  setTimeout(() => {
    container.classList.add("envelope-open");
  
  const invitation = document.querySelector(".invitation");
  invitation.style.display = "block";
  
  setTimeout(() => {
    invitation.classList.add("show"); 
  }, 50); 

  setTimeout(() => {
    container.style.display = "none";
    containerOpenThiep.style.display = "none";
  }, 500);
    
  }, 1000); 
  
});

