function validateAndSubmit() {
    var grossIncome = document.getElementById('grossIncome').value.trim();
    var extraIncome = document.getElementById('extraIncome').value.trim();
    var age = document.getElementById('age').value.trim();
    var deductions = document.getElementById('deductions').value.trim();
    
    var grossIncomeError = document.getElementById('grossIncomeError');
    var extraIncomeError = document.getElementById('extraIncomeError');
    var ageError = document.getElementById('ageError');
    var deductionsError = document.getElementById('deductionsError');

    // Reset error messages
    grossIncomeError.innerText = '';
    extraIncomeError.innerText = '';
    ageError.innerText = '';
    deductionsError.innerText = '';

    // Validation
    if (grossIncome === "") {
        displayError(grossIncomeError, "Please enter gross annual income.");
        return;
    }

    if (isNaN(parseFloat(grossIncome))) {
        displayError(grossIncomeError, "Enter numbers only");
        return;
    }

    if (extraIncome === "") {
        displayError(extraIncomeError, "Please enter extra income.");
        return;
    }

    if (isNaN(parseFloat(extraIncome))) {
        displayError(extraIncomeError, "Enter numbers only");
        return;
    }

    if (age === "") {
        displayError(ageError, "Please enter your age.");
        return;
    }

    if (isNaN(parseInt(age)) || parseInt(age) <= 0) {
        displayError(ageError, "Enter numbers only");
        return;
    }

    if (deductions === "") {
        displayError(deductionsError, "Please enter total applicable deductions.");
        return;
    }

    if (isNaN(parseFloat(deductions))) {
        displayError(deductionsError, "Enter numbers only");
        return;
    }

    // If all validations pass, calculate tax
    calculateTax(parseFloat(grossIncome), parseFloat(extraIncome), parseInt(age), parseFloat(deductions));
}

function displayError(element, message) {
    element.innerText = message;
    element.style.display = "inline-block";
    element.style.color = "red"; // Apply red color
    
}


function calculateTax(grossIncome, extraIncome, age, deductions) {
    var taxableIncome = grossIncome + extraIncome - deductions;
    var taxRate = 0;

    if (taxableIncome > 800000) {
        if (age < 40) {
            taxRate = 0.3;
        } else if (age >= 40 && age < 60) {
            taxRate = 0.4;
        } else if (age >= 60) {
            taxRate = 0.1;
        }
    }

    var taxAmount = taxableIncome > 800000 ? (taxableIncome - 800000) * taxRate : 0;
    
    var modal = document.getElementById('myModal');
    var closeBtn = document.getElementsByClassName("close")[0];
    var modalContent = document.getElementById("result");

    modal.style.display = "block";
    modalContent.innerHTML = "<h2><center>Your overall income will be</h2>" +
                              "<p><center>" + taxAmount + "</p>"+
                              "<center>after tax deductions";

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
