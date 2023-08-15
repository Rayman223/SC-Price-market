// ==UserScript==
// @name        Calcul of the -3% mp V0.3
// @namespace   Rayman Script
// @match       https://www.simcompanies.com/headquarters/warehouse/*
// @grant       none
// @version     0.3.1
// @author      Rayman223
// @description Calculate automatically the 97% of the price
// ==/UserScript==

// Function to calculate and display calculated amounts
function calculateAndDisplayAmounts() {
    var rows = document.querySelectorAll('.css-1xdhyk6.e12j7voa16');
    rows.forEach(function(row) {
        var amountCell = row.querySelector('td:last-child');
        var amountText = amountCell.textContent.trim();
        var amountValue = parseFloat(amountText.replace('$', '').replace(',', ''));
        var calculatedAmount = amountValue * 0.97;
        var calculatedCell = document.createElement('td');
        calculatedCell.textContent = '$' + calculatedAmount.toFixed(3);
        row.appendChild(calculatedCell);
    });

    // Add a new row above the first row to indicate "3%"
    var firstRow = document.querySelector('.css-1xdhyk6.e12j7voa16:first-child');
    if (firstRow) {
        var percentageRow = document.createElement('tr');
        var percentageCell = document.createElement('td');
        percentageCell.colSpan = 3; // Span the cell across all columns
        percentageCell.textContent = '3%';
        percentageRow.appendChild(percentageCell);
        firstRow.parentNode.insertBefore(percentageRow, firstRow);
    }
}

// Function to observe mutations
function observeMutations() {
    // Select the node containing the text "Current exchange orders"
    var targetNode = document.body;

    // Observe mutations of the target node
    var observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            for (var addedNode of mutation.addedNodes) {
                if (addedNode.textContent && addedNode.textContent.includes("Current exchange orders")) {
                    // Call the function to calculate and display amounts
                    calculateAndDisplayAmounts();
                    break;
                }
            }
        });
    });

    // Configure and start observation
    var config = { childList: true, subtree: true };
    observer.observe(targetNode, config);
}

// Function to execute the script when the div is clicked
function handleDivClick() {
    // Call the function to calculate and display amounts
    calculateAndDisplayAmounts();
}

// Select the div element with class "css-x6soqp"
var clickDiv = document.querySelector('.css-x6soqp');

// Add an event listener to the div
if (clickDiv) {
    clickDiv.addEventListener('click', handleDivClick);
}

// Call the function to observe mutations
observeMutations();
