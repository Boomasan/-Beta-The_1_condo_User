var texts = {
  th: {
    loginTitle: 'เข้าสู่ระบบ',
    username: 'ชื่อผู้ใช้',
    password: 'รหัสผ่าน',
    loginBtn: 'เข้าสู่ระบบ',
    registerBtn: 'สร้างบัญชีใหม่',
    forgotpassBtn: 'ลืมรหัสผ่าน',
    success: 'เข้าสู่ระบบสำเร็จ! กำลังโหลด...',
    failed: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
    notRegistered: 'ยังไม่ได้สมัครสมาชิก? กรุณาสมัครสมาชิกก่อน',
    error: 'เกิดข้อผิดพลาด'
  },
  en: {
    loginTitle: 'Login',
    username: 'Username',
    password: 'Password',
    loginBtn: 'Login',
    registerBtn: 'Create New Account',
    forgotpassBtn: 'Forgot Password',
    success: 'Login successful! Redirecting...',
    failed: 'Username or password is incorrect',
    notRegistered: 'Not registered yet? Please register first',
    error: 'An error occurred'
  }
};

var currentLang = 'th';

var form = document.getElementById('loginForm');
var msg = document.getElementById('msg');
var registerBtn = document.getElementById('registerBtn');
var forgotpassBtn = document.getElementById('forgotpassBtn');
var langToggle = document.getElementById('langToggle');

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('loginTitle').textContent = texts[lang].loginTitle;
  document.querySelector('input[name=username]').placeholder = texts[lang].username;
  document.querySelector('input[name=password]').placeholder = texts[lang].password;
  document.getElementById('loginBtn').textContent = texts[lang].loginBtn;
  document.getElementById('registerBtn').textContent = texts[lang].registerBtn;
  document.getElementById('forgotpassBtn').textContent = texts[lang].forgotpassBtn;
  langToggle.textContent = lang === 'th' ? 'EN' : 'TH';
}

// เช็คว่ามีผู้ใช้ในระบบหรือไม่
function checkUserExists(username) {
  var users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find(function(user) {
    return user.username === username;
  });
}

// ตรวจสอบการเข้าสู่ระบบ
function validateLogin(username, password) {
  var user = checkUserExists(username);
  if (!user) {
    return { success: false, message: texts[currentLang].notRegistered };
  }
  
  if (user.password === password) {
    return { success: true, user: user };
  } else {
    return { success: false, message: texts[currentLang].failed };
  }
}

langToggle.addEventListener('click', function () {
  setLanguage(currentLang === 'th' ? 'en' : 'th');
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var formData = new FormData(form);
  var username = formData.get('username');
  var password = formData.get('password');

  var loginResult = validateLogin(username, password);
  
  if (loginResult.success) {
    // บันทึกข้อมูลผู้ใช้ที่เข้าสู่ระบบ
    localStorage.setItem('currentUser', JSON.stringify(loginResult.user));
    
    msg.style.color = 'green';
    msg.textContent = texts[currentLang].success;
    
    // เปลี่ยนไปหน้าหลัก (index.html หรือ main.html)
    setTimeout(function () {
      window.location.href = '/HTML/main.html'; // หรือหน้าหลักของคุณ
    }, 1000); 
  } else {
    msg.style.color = 'red';
    msg.textContent = loginResult.message;
  }
});

registerBtn.addEventListener('click', function () {
  window.location.href = '/register.html';
});

forgotpassBtn.addEventListener('click', function () {
  window.location.href = '/HTML/forgot.html';
});

// ตั้งค่าภาษาเริ่มต้น
setLanguage(currentLang);