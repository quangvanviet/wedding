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
