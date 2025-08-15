var texts = {
  th: {
    registerTitle: 'สมัครสมาชิก',
    username: 'ชื่อผู้ใช้',
    room: 'ห้องที่อาศัย',
    email: 'อีเมล',
    phone: 'เบอร์โทรศัพท์',
    password: 'รหัสผ่าน',
    confirmPassword: 'ยืนยันรหัสผ่าน',
    registerBtn: 'สมัครสมาชิก',
    loginBtn: 'มีบัญชีแล้ว? เข้าสู่ระบบ',
    success: 'สมัครสมาชิกสำเร็จ! กำลังโหลด...',
    failed: 'สมัครสมาชิกล้มเหลว',
    error: 'เกิดข้อผิดพลาด',
    passwordMismatch: 'รหัสผ่านไม่ตรงกัน',
    passwordTooWeak: 'รหัสผ่านไม่ปลอดภัยพอ',
    usernameExists: 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว',
    emailExists: 'อีเมลนี้มีอยู่ในระบบแล้ว',
    reqLength: 'อย่างน้อย 8 ตัวอักษร',
    reqUpper: 'ตัวอักษรใหญ่อย่างน้อย 1 ตัว',
    reqLower: 'ตัวอักษรเล็กอย่างน้อย 1 ตัว',
    reqNumber: 'ตัวเลขอย่างน้อย 1 ตัว'
  },
  en: {
    registerTitle: 'Register',
    username: 'Username',
    room: 'Room Number',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    registerBtn: 'Register',
    loginBtn: 'Have an account? Login',
    success: 'Registration successful! Redirecting...',
    failed: 'Registration failed',
    error: 'An error occurred',
    passwordMismatch: 'Passwords do not match',
    passwordTooWeak: 'Password is too weak',
    usernameExists: 'This username already exists',
    emailExists: 'This email already exists',
    reqLength: 'At least 8 characters',
    reqUpper: 'At least 1 uppercase letter',
    reqLower: 'At least 1 lowercase letter',
    reqNumber: 'At least 1 number'
  }
};

var currentLang = 'th';

var form = document.getElementById('registerForm');
var msg = document.getElementById('msg');
var loginBtn = document.getElementById('loginBtn');
var langToggle = document.getElementById('langToggle');
var passwordInput = document.querySelector('input[name=password]');
var confirmPasswordInput = document.querySelector('input[name=confirmPassword]');
var passwordRequirements = document.getElementById('passwordRequirements');

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('registerTitle').textContent = texts[lang].registerTitle;
  document.querySelector('input[name=username]').placeholder = texts[lang].username;
  document.querySelector('input[name=room]').placeholder = texts[lang].room;
  document.querySelector('input[name=email]').placeholder = texts[lang].email;
  document.querySelector('input[name=phone]').placeholder = texts[lang].phone;
  document.querySelector('input[name=password]').placeholder = texts[lang].password;
  document.querySelector('input[name=confirmPassword]').placeholder = texts[lang].confirmPassword;
  document.getElementById('registerBtn').textContent = texts[lang].registerBtn;
  document.getElementById('loginBtn').textContent = texts[lang].loginBtn;
  langToggle.textContent = lang === 'th' ? 'EN' : 'TH';

  document.getElementById('req-length-text').textContent = texts[lang].reqLength;
  document.getElementById('req-upper-text').textContent = texts[lang].reqUpper;
  document.getElementById('req-lower-text').textContent = texts[lang].reqLower;
  document.getElementById('req-number-text').textContent = texts[lang].reqNumber;
}

function checkPasswordStrength(password) {
  var requirements = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password)
  };

  document.getElementById('req-length').className = 'requirement ' + (requirements.length ? 'valid' : 'invalid');
  document.getElementById('req-upper').className = 'requirement ' + (requirements.upper ? 'valid' : 'invalid');
  document.getElementById('req-lower').className = 'requirement ' + (requirements.lower ? 'valid' : 'invalid');
  document.getElementById('req-number').className = 'requirement ' + (requirements.number ? 'valid' : 'invalid');

  return requirements.length && requirements.upper && requirements.lower && requirements.number;
}

// เช็คว่าชื่อผู้ใช้หรืออีเมลมีอยู่แล้วหรือไม่
function checkUserExists(username, email) {
  var users = JSON.parse(localStorage.getItem('users') || '[]');
  var usernameExists = users.some(function(user) {
    return user.username === username;
  });
  var emailExists = users.some(function(user) {
    return user.email === email;
  });
  
  return { usernameExists: usernameExists, emailExists: emailExists };
}

// บันทึกผู้ใช้ใหม่
function saveUser(userData) {
  var users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
}

langToggle.addEventListener('click', function () {
  setLanguage(currentLang === 'th' ? 'en' : 'th');
});

passwordInput.addEventListener('focus', function() {
  passwordRequirements.classList.add('show');
});

passwordInput.addEventListener('input', function() {
  checkPasswordStrength(this.value);
});

passwordInput.addEventListener('blur', function() {
  if (!this.value) {
    passwordRequirements.classList.remove('show');
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var formData = new FormData(form);
  var username = formData.get('username');
  var room = formData.get('room');
  var email = formData.get('email');
  var phone = formData.get('phone');
  var password = formData.get('password');
  var confirmPassword = formData.get('confirmPassword');

  // ตรวจสอบรหัสผ่าน
  if (password !== confirmPassword) {
    msg.style.color = 'red';
    msg.textContent = texts[currentLang].passwordMismatch;
    return;
  }

  if (!checkPasswordStrength(password)) {
    msg.style.color = 'red';
    msg.textContent = texts[currentLang].passwordTooWeak;
    return;
  }

  // ตรวจสอบว่าชื่อผู้ใช้หรืออีเมลมีอยู่แล้วหรือไม่
  var existCheck = checkUserExists(username, email);
  if (existCheck.usernameExists) {
    msg.style.color = 'red';
    msg.textContent = texts[currentLang].usernameExists;
    return;
  }
  if (existCheck.emailExists) {
    msg.style.color = 'red';
    msg.textContent = texts[currentLang].emailExists;
    return;
  }

  // สร้างข้อมูลผู้ใช้ใหม่
  var userData = {
    username: username,
    room: room,
    email: email,
    phone: phone,
    password: password,
    registeredAt: new Date().toISOString()
  };

  try {
    // บันทึกผู้ใช้ใหม่
    saveUser(userData);
    
    msg.style.color = 'green';
    msg.textContent = texts[currentLang].success;
    
    // เปลี่ยนไปหน้า login
    setTimeout(function () {
      window.location.href = '/HTML/login.html';
    }, 1000);
  } catch (error) {
    msg.style.color = 'red';
    msg.textContent = texts[currentLang].error;
  }
});

loginBtn.addEventListener('click', function () {
  window.location.href = '/HTML/login.html';
});

// ตั้งค่าภาษาเริ่มต้น
setLanguage(currentLang);