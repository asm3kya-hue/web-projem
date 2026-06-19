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
// --- KONFİGÜRASYON ---
const WEATHER_API_KEY = 'SİZİN_OPENWEATHERMAP_API_ANAHTARINIZ';
const CURRENCY_API_KEY = 'SİZİN_EXCHANGERATE_API_ANAHTARINIZ';

// --- 1. DİL DEĞİŞTİRME MANTIĞI ---
async function changeLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        const translations = await response.json();
        
        // Sayfadaki tüm [data-key] elemanlarını güncelle
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[key]) el.textContent = translations[key];
        });

        // Dil yönünü (Arapça gibi diller için) ve placeholder'ları güncelle
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        const cityInput = document.getElementById('cityInput');
        if (translations.city_placeholder) cityInput.placeholder = translations.city_placeholder;

    } catch (error) {
        console.error('Dil dosyası yüklenemedi:', error);
    }
}

// --- 2. DÖVİZ HESAPLAYICI MANTIĞI ---
async function fetchExchangeRate() {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;

    try {
        const url = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/pair/${from}/${to}/${amount}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.result === "success") {
            document.getElementById('resultText').textContent = `${amount} ${from} = ${data.conversion_result.toFixed(2)} ${to}`;
        }
    } catch (error) {
        console.error('Döviz verisi alınamadı:', error);
    }
}

// --- 3. HAVA DURUMU MANTIĞI ---
async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    try {
        const url = `https://openweathermap.org{city}&appid=${WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Şehir bulunamadı');
        
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const desc = data.weather.description;
        
        document.getElementById('weatherResult').textContent = `${data.name}: ${temp}°C, ${desc}`;
    } catch (error) {
        document.getElementById('weatherResult').textContent = error.message;
    }
}

// --- 4. OLAY DİNLEYİCİLER (EVENT LISTENERS) ---
document.getElementById('languageSelector').addEventListener('change', (e) => changeLanguage(e.target.value));
document.getElementById('getWeather').addEventListener('click', fetchWeather);
document.getElementById('amount').addEventListener('input', fetchExchangeRate);
document.querySelectorAll('.secici').forEach(select => select.addEventListener('change', fetchExchangeRate));

// Sayfa ilk açıldığında çalışacaklar
window.onload = () => {
    // Para birimi listelerini doldurmak için bir fonksiyon eklenebilir
    changeLanguage('en'); 
};
const themeToggle = document.getElementById('theme-toggle'); // HTML'deki buton id'si

// Sayfa yüklendiğinde eski seçimi kontrol et
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Seçimi hafızada tut
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
// OpenWeatherMap API anahtarınızı buraya tırnaklar içine yazın
const apiKey = '5708914023875f549223f7b7d80b4ecf'; 

const citySelect = document.getElementById('city-select');
const weatherText = document.getElementById('weather-text');

async function getHavaDurumu(city) {
    try {
        weatherText.innerText = "Güncelleniyor...";
        
        // API isteği gönderiyoruz
        const response = await fetch(`https://openweathermap.org{city},TR&appid=${apiKey}&units=metric&lang=tr`);
        
        if (!response.ok) {
            throw new Error('Hava durumu verisi alınamadı.');
        }

        const data = await response.json();
        
        // Dereceyi yuvarlayıp açıklamayı alıyoruz
        const temp = Math.round(data.main.temp); 
        const desc = data.weather[0].description; // İlk elemandaki açıklamayı alıyoruz
        
        // HTML alanına yazdırıyoruz
        weatherText.innerHTML = `<strong>${city}:</strong> ${temp}°C, ${desc}`;
    } catch (error) {
        weatherText.innerText = "Hata: Veri çekilemedi. API anahtarınızı kontrol edin.";
        console.error(error);
    }
}

// Şehir listesinden seçim değiştikçe çalışacak fonksiyon
citySelect.addEventListener('change', (e) => {
    getHavaDurumu(e.target.value);
});

// Sayfa ilk yüklendiğinde varsayılan şehir (Bursa) için çalıştır
getHavaDurumu(citySelect.value);
// --- Döviz Çevirici Kodları ---
const amountInput = document.getElementById('currency-amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const currencyResult = document.getElementById('currency-result');

async function dovizCevir() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === "" || amount <= 0) return;

    try {
        currencyResult.innerText = "Hesaplanıyor...";
        // Ücretsiz ve anahtarsız döviz API'si
        const response = await fetch(`https://er-api.com{from}`);
        
        if (!response.ok) throw new Error("Döviz verisi alınamadı.");
        
        const data = await response.json();
        const rate = data.rates[to];
        const total = (amount * rate).toFixed(2); // Virgülden sonra 2 basamak

        currencyResult.innerHTML = `<strong>${amount} ${from} =</strong> ${total} ${to}`;
    } catch (error) {
        currencyResult.innerText = "Hata: Kur bilgisi alınamadı.";
        console.error(error);
    }
}

// Girdiler veya seçimler değiştikçe hesapla
amountInput.addEventListener('input', dovizCevir);
fromCurrency.addEventListener('change', dovizCevir);
toCurrency.addEventListener('change', dovizCevir);

// Sayfa açıldığında ilk hesaplamayı yap
dovizCevir();
