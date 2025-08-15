document.addEventListener('DOMContentLoaded', function () {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordRequirements = document.getElementById('passwordRequirements');
    const resetForm = document.getElementById('resetForm');
    const msgElement = document.getElementById('msg');

    // Password requirement elements
    const reqLength = document.getElementById('req-length');
    const reqUpper = document.getElementById('req-upper');
    const reqLower = document.getElementById('req-lower');
    const reqNumber = document.getElementById('req-number');

    // Show password requirements when user starts typing
    newPasswordInput.addEventListener('focus', function () {
        passwordRequirements.classList.add('show');
    });

    // Real-time password validation
    newPasswordInput.addEventListener('input', function () {
        const password = newPasswordInput.value;
        validatePassword(password);
    });

    // Hide requirements when user clicks outside and input is empty
    newPasswordInput.addEventListener('blur', function () {
        if (newPasswordInput.value === '') {
            passwordRequirements.classList.remove('show');
        }
    });

    function validatePassword(password) {
        // Check length (at least 8 characters)
        if (password.length >= 8) {
            reqLength.classList.remove('invalid');
            reqLength.classList.add('valid');
        } else {
            reqLength.classList.remove('valid');
            reqLength.classList.add('invalid');
        }

        // Check uppercase letter
        if (/[A-Z]/.test(password)) {
            reqUpper.classList.remove('invalid');
            reqUpper.classList.add('valid');
        } else {
            reqUpper.classList.remove('valid');
            reqUpper.classList.add('invalid');
        }

        // Check lowercase letter
        if (/[a-z]/.test(password)) {
            reqLower.classList.remove('invalid');
            reqLower.classList.add('valid');
        } else {
            reqLower.classList.remove('valid');
            reqLower.classList.add('invalid');
        }

        // Check number
        if (/[0-9]/.test(password)) {
            reqNumber.classList.remove('invalid');
            reqNumber.classList.add('valid');
        } else {
            reqNumber.classList.remove('valid');
            reqNumber.classList.add('invalid');
        }
    }

    function isPasswordValid(password) {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password);
    }

    // Form submission handler
    resetForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Clear previous messages
        msgElement.textContent = '';
        msgElement.className = '';

        // Validate password requirements
        if (!isPasswordValid(newPassword)) {
            showMessage('รหัสผ่านไม่ตรงตามข้อกำหนด กรุณาตรวจสอบอีกครั้ง', 'error');
            return;
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            showMessage('รหัสผ่านไม่ตรงกัน กรุณาใส่รหัสผ่านให้ตรงกัน', 'error');
            return;
        }

        // If validation passes
        try {
            showMessage('รหัสผ่านถูกรีเซ็ตเรียบร้อยแล้ว!', 'success');
            // เปลี่ยนไปหน้า login
            setTimeout(function () {
                window.location.href = '/index.html';
            }, 1000);
        } catch (error) {
            msg.style.color = 'red';
            msg.textContent = texts[currentLang].error;
        }

        // Optionally reset form after successful submission
        setTimeout(() => {
            resetForm.reset();
            passwordRequirements.classList.remove('show');
            clearRequirementStates();
        }, 2000);
    });

    function showMessage(message, type) {
        msgElement.textContent = message;
        msgElement.className = type;

        // Add styles based on message type
        if (type === 'error') {
            msgElement.style.color = '#f44336';
            msgElement.style.backgroundColor = '#ffebee';
        } else if (type === 'success') {
            msgElement.style.color = '#4caf50';
            msgElement.style.backgroundColor = '#e8f5e8';
        }
    }

    function clearRequirementStates() {
        const requirements = [reqLength, reqUpper, reqLower, reqNumber];
        requirements.forEach(req => {
            req.classList.remove('valid', 'invalid');
            req.querySelector('span:first-child').textContent = '•';
        });
    }

    // Optional: Real-time password match validation
    confirmPasswordInput.addEventListener('input', function () {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword && newPassword !== confirmPassword) {
            confirmPasswordInput.style.borderColor = '#f44336';
        } else {
            confirmPasswordInput.style.borderColor = '#ccc';
        }
    });
});