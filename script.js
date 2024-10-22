// Função para buscar dados meteorológicos de uma API (exemplo da OpenWeather API)
async function fetchWeatherData() {
    const apiKey = 'YOUR_API_KEY';  // Coloque sua chave da API aqui
    const lat = '-23.55052';  // Latitude de São Paulo
    const lon = '-46.633308';  // Longitude de São Paulo

    // URL para buscar dados meteorológicos em tempo real (OpenWeather ou outro serviço)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Atualizando as informações de furacões (exemplo)
        document.getElementById('pressao').innerText = `${data.main.pressure} hPa`;
        document.getElementById('vento').innerText = `${(data.wind.speed * 3.6).toFixed(1)} km/h`; // Convertendo m/s para km/h
        document.getElementById('tempMar').innerText = `${data.main.temp}°C`; // Dados de temperatura do mar
        document.getElementById('alertaFuracao').innerText = "Sem furacão no momento.";

        // Se houver uma condição de alerta (simulado)
        if (data.wind.speed * 3.6 > 119) {
            document.getElementById('alertaFuracao').innerText = "Alerta de furacão! Velocidade do vento crítica!";
        }

        // Atualizando as informações de tempestades
        document.getElementById('pressaoTempestade').innerText = `${data.main.pressure} hPa`;
        document.getElementById('ventoTempestade').innerText = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

        // Simulação de alerta de tempestades
        if (data.wind.speed * 3.6 > 63 && data.wind.speed * 3.6 <= 119) {
            document.getElementById('alertaTempestade').innerText = "Possível tempestade tropical detectada!";
        } else {
            document.getElementById('alertaTempestade').innerText = "Sem tempestade no momento.";
        }

        // Atualizando as informações de enchentes
        document.getElementById('precipitacao').innerText = `${data.rain ? data.rain['1h'] : 0} mm/h`;
        document.getElementById('nivelRio').innerText = "3 metros";  // Simulação de nível do rio

        // Simulação de alerta de enchente
        if (data.rain && data.rain['1h'] > 100) {
            document.getElementById('alertaEnchente').innerText = "Alerta de enchente! Precipitação muito alta!";
        } else {
            document.getElementById('alertaEnchente').innerText = "Sem risco de enchente no momento.";
        }

    } catch (error) {
        console.error('Erro ao buscar dados meteorológicos:', error);
    }
}

// Função para atualizar os dados a cada 5 minutos (300000 ms)
setInterval(fetchWeatherData, 300000);

// Chamando a função assim que a página carrega
window.onload = fetchWeatherData;

