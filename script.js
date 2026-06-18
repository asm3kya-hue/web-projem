// 1. Learn More Button Action
const buton = document.querySelector('.giriş-butonu');
if (buton) {
    buton.addEventListener('click', function() {
        alert("Awesome! Your JavaScript code ran successfully on Debian. You have successfully programmed your first web application!");
    });
}

// 2. Newsletter Form Submission
const form = document.querySelector('#aboneFormu');
if (form) {
    form.addEventListener('submit', function(olay) {
        olay.preventDefault();
        const isim = document.querySelector('#kullaniciAdi').value;
        const eposta = document.querySelector('#kullaniciEposta').value;
        alert(`Welcome ${isim}! A confirmation code has been successfully sent to ${eposta}.`);
        form.reset();
    });
}

// 3. Dark Mode Toggle Button Action
const temaButonu = document.querySelector('#temaButonu');
if (temaButonu) {
    temaButonu.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            temaButonu.textContent = "☀️ Light Mode";
            temaButonu.style.backgroundColor = "#f1c40f";
            temaButonu.style.color = "#333";
        } else {
            temaButonu.textContent = "🌙 Dark Mode";
            temaButonu.style.backgroundColor = "#34495e";
            temaButonu.style.color = "white";
        }
    });
}
