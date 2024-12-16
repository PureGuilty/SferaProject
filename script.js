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
    // Используем заглушку вместо реального API
    const keyRate = 21.00; // Пример актуальной ключевой ставки
    document.getElementById('keyRate').innerText = `Ключевая ставка: ${keyRate}%`;
}

// Запускаем функцию для получения ключевой ставки
fetchKeyRate();
function loadLoanOffers() {
    fetch('loans.json')
        .then(response => response.json())
        .then(data => {
            // Логика для фильтрации и отображения предложений
            filterLoanOffers(data);
        })
        .catch(error => console.error('Ошибка:', error));
}

function filterLoanOffers(data) {
    const amount = parseFloat(document.getElementById('amountInput').value);
    const term = parseFloat(document.getElementById('termInput').value);
    
    const filteredOffers = data.filter(offer => offer.amount >= amount && offer.term <= term);
    
    displayLoanOffers(filteredOffers);
}

