function calculatePayment() {
    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
    const term = parseFloat(document.getElementById('term').value) * 12;

    if (!isNaN(amount) && !isNaN(rate) && !isNaN(term)) {
        const monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -term));
        document.getElementById('result').innerText = `Ежемесячный платеж: ${monthlyPayment.toFixed(2)} ₽`;
    } else {
        document.getElementById('result').innerText = 'Пожалуйста, введите корректные данные.';
    }
}
function fetchKeyRate() {
    fetch('https://api.cbr.ru/v1/keyrate')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Проверяем, что возвращает API
            if (data.length > 0) {
                const keyRate = data[0].value;
                document.getElementById('keyRate').innerText = `Ключевая ставка: ${keyRate}%`;
            } else {
                console.error('Нет данных о ключевой ставке.');
                document.getElementById('keyRate').innerText = 'Ключевая ставка не найдена.';
            }
        })
        .catch(error => console.error('Ошибка:', error));
}

// Запускаем функцию для получения ключевой ставки
fetchKeyRate();

// Обновление каждые 1 час (3600000 миллисекунд)
setInterval(fetchKeyRate, 3600000);
