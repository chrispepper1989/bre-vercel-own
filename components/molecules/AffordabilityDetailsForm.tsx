import React from "react";

// Define AffordabilityDetails interface
export interface AffordabilityDetails {
    monthlyIncome: number;
    monthlyRentOrMortgage: number;
    monthlyUtilities: number;
    monthlyLoansOrCredit: number;
    monthlyTransportCosts: number;
    monthlyFoodCosts: number;
    monthlyInsuranceCosts: number;
    monthlyChildcareCosts: number;
    otherMonthlyExpenses: number;
    totalMonthlyExpenses: number;
    disposableIncome: number;
}

const AffordabilityDetailsForm: React.FC<{
    affordabilityDetails: AffordabilityDetails;
    setAffordabilityDetails: React.Dispatch<React.SetStateAction<AffordabilityDetails>>;
}> = ({ affordabilityDetails, setAffordabilityDetails }) => (
    <div>
        <h2>Affordability Details</h2>

        <label>
            Monthly Income:
            <input
                type="number"
                value={affordabilityDetails.monthlyIncome}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyIncome: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Monthly Rent or Mortgage:
            <input
                type="number"
                value={affordabilityDetails.monthlyRentOrMortgage}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyRentOrMortgage: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Monthly Utilities:
            <input
                type="number"
                value={affordabilityDetails.monthlyUtilities}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyUtilities: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Monthly Loans or Credit:
            <input
                type="number"
                value={affordabilityDetails.monthlyLoansOrCredit}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyLoansOrCredit: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Monthly Transport Costs:
            <input
                type="number"
                value={affordabilityDetails.monthlyTransportCosts}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyTransportCosts: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Monthly Food Costs:
            <input
                type="number"
                value={affordabilityDetails.monthlyFoodCosts}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyFoodCosts: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Monthly Insurance Costs:
            <input
                type="number"
                value={affordabilityDetails.monthlyInsuranceCosts}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyInsuranceCosts: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Monthly Childcare Costs:
            <input
                type="number"
                value={affordabilityDetails.monthlyChildcareCosts}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, monthlyChildcareCosts: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Other Monthly Expenses:
            <input
                type="number"
                value={affordabilityDetails.otherMonthlyExpenses}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, otherMonthlyExpenses: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Total Monthly Expenses:
            <input
                type="number"
                value={affordabilityDetails.totalMonthlyExpenses}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, totalMonthlyExpenses: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Disposable Income:
            <input
                type="number"
                value={affordabilityDetails.disposableIncome}
                onChange={(e) => setAffordabilityDetails({ ...affordabilityDetails, disposableIncome: parseFloat(e.target.value) })}
            />
        </label>
    </div>
);

export default AffordabilityDetailsForm;
