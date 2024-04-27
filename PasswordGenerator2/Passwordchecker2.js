function generatePassword() {
    var length = document.getElementById("length").value;
    var lowercase = document.getElementsByName("chklowercase")[0].checked;
    var uppercase = document.getElementsByName("chkuppercase")[0].checked;
    var numbers = document.getElementsByName("chknumbers")[0].checked;
    var symbols = document.getElementsByName("chksymbols")[0].checked;
    var allowSpaces = document.getElementsByName("chkspaces")[0].checked;

    var charset = "";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*";
    if (allowSpaces) charset += " ";

    var password = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById("password").value = password;
    updateStrengthMeter(password);
}

function updateStrengthMeter(password) {
    var strengthBar = document.getElementById("strengthBar");
    var strengthLevel = document.createElement("div");

    var strength = calculatePasswordStrength(password);
    var color = "";
    if (strength <= 20) {
        color = "red";
    } else if (strength <= 40) {
        color = "orange";
    } else if (strength <= 60) {
        color = "yellow";
    } else if (strength <= 80) {
        color = "lightgreen";
    } else {
        color = "green";
    }

    strengthLevel.style.width = strength + "%";
    strengthLevel.style.height = "100%";
    strengthLevel.style.backgroundColor = color;
    strengthLevel.style.borderRadius = "5px";

    // Clear previous strength level
    strengthBar.innerHTML = "";
    strengthBar.appendChild(strengthLevel);
}

function calculatePasswordStrength(password) {
    var strength = 0;

    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^a-zA-Z0-9\s]/.test(password)) strength += 20;

    return strength;
}