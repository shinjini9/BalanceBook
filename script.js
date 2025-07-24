const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const totalDisplay = document.getElementById('total');
const filterSelect = document.getElementById('filter');

let transactions = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (!amount || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  const transaction = {
    type,
    amount,
    id: Date.now()
  };

  transactions.push(transaction);
  updateDisplay();
  form.reset();
});

filterSelect.addEventListener('change', updateDisplay);

function updateDisplay() {
  const filtered = filterSelect.value === 'all'
    ? transactions
    : transactions.filter(t => t.type === filterSelect.value);

  list.innerHTML = '';
  let total = 0;

  filtered.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.type === 'income' ? '+' : '-'} $${t.amount.toFixed(2)}`;
    list.appendChild(li);
  });

  total = transactions.reduce((sum, t) =>
    t.type === 'income' ? sum + t.amount : sum - t.amount, 0);

  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}
