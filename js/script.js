// Zad 1
// Stwórz klasę UserAccount. Zawrzyj w niej takie pola jak: name, surname, incomes (w postaci mapy składającej się z daty wykonania transakcji oraz wysokości kwoty), expenses (struktura taka jak przy incomes).
// Dodatkowo dodaj metody takie jak:
// countIncomes, countExpenses (które będą obliczały całkowite przychody/wydatki na przestrzeni miesiąców),
// getAccountInfo (zwracająca imię i nazwisko właściciela),
// addExpense, addIncome oraz accountBalance (obliczająca stan konta na podstawie przychodów/wydatków).
// Informacje takie jak przychody/wydatki, imię i nazwisko konta zapisuj w formacie JSON w localStorage.

// Komentarz:
// Sens local storage polega na tym że dane zapisane w nim pozostają pomiędzy uruchomieniami przeglądarki oraz pomiędzy odświeżeniami strony
// W związku z tym napisz jeszcze podstawowy ui do tego zadania - czyli tabelka z danymi i guziki zapisz do local storage i wczytaj z local storage
// Żeby zobaczyć jak to działa można odświeżyć stronę i po kliknięciu wczytaj zobaczyć że są te wcześniej zapisane dane
// Aby zweryfikować poprawność zapisywania do local storage można w konsoli js w przeglądarce wpisać localStorage

// //
// setItem(key, value) - zapisuje wartość value pod kluczem key,
// getItem(key) - zwraca wartość zapisaną pod kluczem key,
// removeItem(key) - usuwa wartość zapisaną pod kluczem key,
// clear() - usuwa wszystkie dane zapisane w Local Storage,
// key(index) - zwraca klucz znajdujący się pod danym indeksem.

class UserAccount {
	constructor(name, surname) {
		this.name = name
		this.surname = surname
		this.incomes = new Map()
		this.expenses = new Map()
	}

	countIncomes() {
		let totalIncomes = 0
		for (const income of this.incomes.values()) {
			totalIncomes += income
		}
		return totalIncomes
	}

	countExpenses() {
		let totalExpenses = 0
		for (const expense of this.expenses.values()) {
			totalExpenses += expense
		}
		return totalExpenses
	}

	getAccountInfo() {
		return `Imię: ${this.name}, Nazwisko: ${this.surname}`
	}

	addExpense(date, amount) {
		this.expenses.set(date, amount)
	}

	addIncome(date, amount) {
		this.incomes.set(date, amount)
	}

	accountBalance() {
		let totalIncomes = 0
		let totalExpenses = 0

		for (const amount of this.incomes.values()) {
			totalIncomes += amount
		}

		for (const amount of this.expenses.values()) {
			totalExpenses += amount
		}

		return totalIncomes - totalExpenses
	}

	saveAccountData() {
		const accountData = {
			name: this.name,
			surname: this.surname,
			incomes: Array.from(this.incomes),
			expenses: Array.from(this.expenses),
		}

		window.localStorage.setItem('userAccount', JSON.stringify(accountData))
		window.localStorage.getItem('userAccount')
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const nameInput = document.getElementById('nameInput')
	const surnameInput = document.getElementById('surnameInput')
	const saveButton = document.getElementById('saveButton')
	const incomeDateInput = document.getElementById('incomeDate')
	const incomeAmountInput = document.getElementById('incomeAmount')
	const addIncomeButton = document.getElementById('addIncomeButton')
	const expenseDateInput = document.getElementById('expenseDate')
	const expenseAmountInput = document.getElementById('expenseAmount')
	const addExpenseButton = document.getElementById('addExpenseButton')
	const calculateButton = document.getElementById('calculateButton')
	const totalIncomes = document.getElementById('totalIncomes')
	const totalExpenses = document.getElementById('totalExpenses')
	const accountBalance = document.getElementById('accountBalance')

	const user = new UserAccount('', '')

	saveButton.addEventListener('click', () => {
		const name = nameInput.value
		const surname = surnameInput.value
		user.name = name
		user.surname = surname
		user.saveAccountData()
	})

	addIncomeButton.addEventListener('click', () => {
		const date = incomeDateInput.value
		const amount = parseFloat(incomeAmountInput.value)
		user.addIncome(date, amount)
	})

	addExpenseButton.addEventListener('click', () => {
		const date = expenseDateInput.value
		const amount = parseFloat(expenseAmountInput.value)
		user.addExpense(date, amount)
	})

	calculateButton.addEventListener('click', () => {
		const totalIncomesValue = user.countIncomes()
		totalIncomes.textContent = `Całkowite przychody: ${totalIncomesValue} zł `

		const totalExpensesValue = user.countExpenses()
		totalExpenses.textContent = `Całkowite wydatki:  ${totalExpensesValue} zł`

		const balance = user.accountBalance()
		accountBalance.textContent = `Stan konta: ${balance} zł`
	})
})
