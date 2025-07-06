const totalBalance = document.getElementById("totalAmount");
const totalIncome = document.getElementById("incomeAmount");
const totalExpense = document.getElementById("expenseAmount");
const amountInput = document.querySelector(".amount input");
const DescInput = document.querySelector(".desc input");
const AddIncome = document.getElementById("addIncomeBtn");
const AddExpense = document.getElementById("addExpenseBtn");
const transactions = document.getElementById("transactionList");

let income = 0;
let expense = 0;
let balance = 0;
let transactionArr = JSON.parse(localStorage.getItem("transactionArr")) || [];

AddIncome.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const desc = DescInput.value.trim();

    if (!amount || amount <= 0 || desc === "") {
        alert("Enter a valid income amount and description.");
        return;
    }

    income += amount;
    balance += amount;

    updateUI();
    addTransaction(desc, amount, "income");

    amountInput.value = "";
    DescInput.value = "";
});

AddExpense.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const desc = DescInput.value.trim();

    if (!amount || amount <= 0 || desc === "") {
        alert("Enter a valid expense amount and description.");
        return;
    }

    expense += amount;
    balance -= amount;

    updateUI();
    addTransaction(desc, amount, "expense");

    amountInput.value = "";
    DescInput.value = "";
});

function addTransaction(desc, amount, type) {
    const div = document.createElement("div");
    div.classList.add("transactionListExpense");
    
    const name = document.createElement("h3");
    name.textContent = desc;
    
    const price = document.createElement("h3");
    price.textContent = type === "expense" ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`;
    
    price.style.color = type === "expense" ? "red" : "green";
    
    div.appendChild(name);
    div.appendChild(price);
    
    const list = document.getElementById("transactionList");
    list.insertBefore(div, list.firstChild); // adds on top
    
    // Add to array and save
    transactionArr.unshift({ desc, amount, type });
    localStorage.setItem("transactionArr", JSON.stringify(transactionArr));
    
    renderTransactions();
    saveData();
}

function updateUI() {
    totalBalance.textContent = `$${balance.toFixed(2)}`;
    totalIncome.textContent = `$${income.toFixed(2)}`;
    totalExpense.textContent = `$${expense.toFixed(2)}`;
    saveData();
}

// Render all transactions from array
function renderTransactions() {
    transactions.innerHTML = "";
    transactionArr.forEach(tx => {
        const div = document.createElement("div");
        div.classList.add("transactionListExpense");
        
        const name = document.createElement("h3");
        name.textContent = tx.desc;
        
        const price = document.createElement("h3");
        price.textContent = tx.type === "expense" ? `-$${tx.amount.toFixed(2)}` : `+$${tx.amount.toFixed(2)}`;
        price.style.color = tx.type === "expense" ? "red" : "green";
        
        div.appendChild(name);
        div.appendChild(price);
        
        transactions.appendChild(div);
    });
}

function saveData(){
    localStorage.setItem("balance", balance);
    localStorage.setItem("income", income);
    localStorage.setItem("expense", expense);
}

income = parseFloat(localStorage.getItem("income")) || 0;
expense = parseFloat(localStorage.getItem("expense")) || 0;
balance = parseFloat(localStorage.getItem("balance")) || 0;

function clearAllData(){
    //Resets Variables
    balance = 0;
    income = 0;
    expense = 0;
    transactionArr = [];

    //Remove from localStorage
    localStorage.removeItem("balance");
    localStorage.removeItem("income");
    localStorage.removeItem("expense");
    localStorage.removeItem("transactionArr");

    //Update UI
    updateUI();
    renderTransactions();
}

window.addEventListener("DOMContentLoaded", ()=>{
    updateUI();
    renderTransactions();
    document.getElementById("clearBtn").addEventListener("click", clearAllData);
})