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
