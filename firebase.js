// Khởi tạo Firebase (dùng SDK compat, không cần import/export)
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

// Khởi tạo Firebase app và database (global)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
