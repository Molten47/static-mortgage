// Get DOM elements
const mortgageAmount = document.getElementById('mortgageAmount');
const mortgageTerm = document.getElementById('mortgageTerm');
const interestRate = document.getElementById('interestRate');
const repayment = document.getElementById('repayment');
const interest = document.getElementById('interest');
const calculateBtn = document.querySelector('button');
const clearBtn = document.querySelector('a[href="#"]');
const resultsDiv = document.querySelector('.text-center.text-white');

// Helper function to format currency
const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number);
};

// Calculate mortgage payments
function calculateMortgage() {
    // Get input values
    const amount = parseFloat(mortgageAmount.value.replace(/[^0-9.]/g, ''));
    const term = parseFloat(mortgageTerm.value) * 12; // Convert years to months
    const rate = parseFloat(interestRate.value);
    const isRepayment = repayment.checked;

    // Validate inputs
    if (!amount || !term || !rate) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    // Calculate monthly rate
    const monthlyRate = (rate / 100) / 12;

    let monthlyPayment;
    let totalPayment;
    let totalInterest;

    if (isRepayment) {
        // Calculate for repayment mortgage
        const rateFactorPower = Math.pow(1 + monthlyRate, term);
        monthlyPayment = amount * 
            (monthlyRate * rateFactorPower) / 
            (rateFactorPower - 1);
    } else {
        // Calculate for interest-only mortgage
        monthlyPayment = amount * monthlyRate;
    }

    // Calculate totals
    totalPayment = monthlyPayment * term;
    totalInterest = totalPayment - amount;

    // Display results
    displayResults(monthlyPayment, totalPayment, totalInterest, amount);
}

// Display results function
function displayResults(monthly, total, totalInterest, principal) {
    resultsDiv.innerHTML = `
        <h2 class="font-semibold m-4 md:text-3xl lg:text-4xl sm:text-2xl">Your Mortgage Results</h2>
        <div class="space-y-4 mt-6">
            <div class="text-lg">
                <p class="font-medium mb-2">Monthly Payment:</p>
                <p class="text-2xl font-bold">${formatCurrency(monthly)}</p>
            </div>
            <div class="text-lg mt-4">
                <p class="font-medium mb-2">Loan Amount:</p>
                <p class="text-xl">${formatCurrency(principal)}</p>
            </div>
            <div class="text-lg mt-4">
                <p class="font-medium mb-2">Total Interest:</p>
                <p class="text-xl">${formatCurrency(totalInterest)}</p>
            </div>
            <div class="text-lg mt-4">
                <p class="font-medium mb-2">Total Payment:</p>
                <p class="text-xl">${formatCurrency(total)}</p>
            </div>
        </div>
    `;
}

// Clear form function
function clearForm() {
    mortgageAmount.value = '';
    mortgageTerm.value = '';
    interestRate.value = '';
    repayment.checked = false;
    interest.checked = false;
    
    // Reset results display
    resultsDiv.innerHTML = `
        <h2 class="font-semibold m-4 md:text-3xl lg:text-4xl sm:text-2xl">Results Show here</h2>
        <p class="text-wrap font-medium">Complete the form and click "Calculate Repayments" <br> to see what your monthly repayments will be</p>
    `;
}

// Input validation for numbers only
function validateNumberInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.]/g, '');
}

// Event listeners
calculateBtn.addEventListener('click', calculateMortgage);
clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearForm();
});

// Add input validation to number fields
mortgageAmount.addEventListener('input', validateNumberInput);
mortgageTerm.addEventListener('input', validateNumberInput);
interestRate.addEventListener('input', validateNumberInput);

// Format mortgage amount as currency while typing
mortgageAmount.addEventListener('blur', function() {
    if (this.value) {
        const value = parseFloat(this.value.replace(/[^0-9.]/g, ''));
        this.value = formatCurrency(value);
    }
});