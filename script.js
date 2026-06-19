// --- AYARLAR ---
const apiKey = '5708914023875f549223f7b7d80b4ecf'; // OpenWeather API anahtarınız

// --- KOYU TEMA (DARK MODE) YÖNETİMİ ---
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// --- HAVA DURUMU SCRIPTİ ---
const citySelect = document.getElementById('city-select');
const weatherText = document.getElementById('weather-text');

async function getHavaDurumu(city) {
    try {
        weatherText.innerText = "Güncelleniyor...";
        const response = await fetch(`https://openweathermap.org{city},TR&appid=${apiKey}&units=metric&lang=tr`);
        if (!response.ok) throw new Error('Hava durumu verisi alınamadı.');
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description; // 0. indeksteki description düzeltildi
        weatherText.innerHTML = `🌤️ <strong>${city}:</strong> ${temp}°C, ${desc}`;
    } catch (error) {
        weatherText.innerText = "Hata: Veri çekilemedi.";
        console.error(error);
    }
}
citySelect.addEventListener('change', (e) => getHavaDurumu(e.target.value));
getHavaDurumu(citySelect.value);

// --- DÖVİZ ÇEVİRİCİ SCRIPTİ ---
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
        const response = await fetch(`https://er-api.com{from}`);
        if (!response.ok) throw new Error("Döviz verisi alınamadı.");
        const data = await response.json();
        const rate = data.rates[to];
        const total = (amount * rate).toFixed(2);
        currencyResult.innerHTML = `💱 <strong>${amount} ${from} =</strong> ${total} ${to}`;
    } catch (error) {
        currencyResult.innerText = "Hata: Kur bilgisi alınamadı.";
        console.error(error);
    }
}
amountInput.addEventListener('input', dovizCevir);
fromCurrency.addEventListener('change', dovizCevir);
toCurrency.addEventListener('change', dovizCevir);
dovizCevir();
