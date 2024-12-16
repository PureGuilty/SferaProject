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

// Используем заглушку для ключевой ставки
function fetchKeyRate() {
    const keyRate = 21.00; // Пример заглушки
    document.getElementById('keyRate').innerText = `Ключевая ставка: ${keyRate}%`;
}

// Запускаем функцию для получения ключевой ставки
fetchKeyRate();
// setInterval(fetchKeyRate, 3600000); // Обновление каждую час (не требуется без API)

// Загрузка банковских предложений
function loadLoanOffers() {
    fetch('loans.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответа была не в порядке');
            }
            return response.json();
        })
        .then(data => {
            // Логика для фильтрации и отображения предложений
            filterLoanOffers(data);
        })
        .catch(error => console.error('Ошибка:', error));
}

// Фильтрация предложений
function filterLoanOffers(data) {
    const amount = parseFloat(document.getElementById('amountInput').value);
    const term = parseFloat(document.getElementById('termInput').value);
    
    const filteredOffers = data.filter(offer => offer.amount >= amount && offer.term <= term);
    
    displayLoanOffers(filteredOffers);
}

// Отображение предложений
function displayLoanOffers(offers) {
    const offersContainer = document.getElementById('loanOffers');
    offersContainer.innerHTML = ''; // Очистить предыдущие предложения

    if (offers.length === 0) {
        offersContainer.innerText = 'Нет подходящих предложений.';
        return;
    }

    offers.forEach(offer => {
        const offerElement = document.createElement('div');
        offerElement.innerText = `Банк: ${offer.bank}, Ставка: ${offer.rate}%, Сумма: ${offer.amount}, Срок: ${offer.term} месяцев`;
        offersContainer.appendChild(offerElement);
    });
}

// Обработчик события для кнопки получения предложений
document.getElementById('getOffersButton').addEventListener('click', loadLoanOffers);



