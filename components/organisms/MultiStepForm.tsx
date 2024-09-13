"use client"
import React, {useState} from "react";
import {PersonalDetails, PersonalDetailsForm} from "@/components/organisms/PersonalDetailsForm";


import EmploymentDetailsForm, {EmploymentDetails} from "@/components/organisms/EmploymentDetailsForm";
import AddressDetailsForm, {AddressDetails} from "@/components/organisms/AddressDetailsForm";
import AffordabilityDetailsForm, {AffordabilityDetails} from "@/components/organisms/AffordabilityDetailsForm";

const MultiStepForm: React.FC = () => {
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        maritalStatus: "",
        email: "",
        phoneNumber: "",
        drivingLicenseNumber: "",
        drivingLicenseType: "",
        drivingLicenseExpiryDate: "",
        passportNumber: "",
        nationalInsuranceNumber: "",
        employmentStatus: "",
        annualIncome: 0,
    });

    const [addressDetails, setAddressDetails] = useState<AddressDetails>({
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
        country: "",
        residentialStatus: "",
        yearsAtAddress: 0,
        monthsAtAddress: 0,
    });

    const [employmentDetails, setEmploymentDetails] = useState<EmploymentDetails>({
        employmentStatus: "",
        employerName: "",
        jobTitle: "",
        annualIncome: 0,
        employmentType: "",
        employmentStartDate: "",
        yearsAtJob: 0,
        monthsAtJob: 0,
        employerAddress: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            postcode: "",
            country: "",
            residentialStatus: "",
            yearsAtAddress: 0,
            monthsAtAddress: 0,
        },
        workPhoneNumber: "",
    });

    const [affordabilityDetails, setAffordabilityDetails] = useState<AffordabilityDetails>({
        monthlyIncome: 0,
        monthlyRentOrMortgage: 0,
        monthlyUtilities: 0,
        monthlyLoansOrCredit: 0,
        monthlyTransportCosts: 0,
        monthlyFoodCosts: 0,
        monthlyInsuranceCosts: 0,
        monthlyChildcareCosts: 0,
        otherMonthlyExpenses: 0,
        totalMonthlyExpenses: 0,
        disposableIncome: 0,
    });

    const [currentTab, setCurrentTab] = useState(0);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = {
            personalDetails,
            addressDetails,
            employmentDetails,
            affordabilityDetails,
        };
        console.log("Form Submitted:", formData);
        alert("Form submitted successfully!");
    };

    const renderTab = () => {
        switch (currentTab) {
            case 0:
                return (
                    <PersonalDetailsForm personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />
                );
            case 1:
                return (
                    <AddressDetailsForm addressDetails={addressDetails} setAddressDetails={setAddressDetails} />
                );
            case 2:
                return (
                    <EmploymentDetailsForm employmentDetails={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
                );
            case 3:
                return (
                    <AffordabilityDetailsForm affordabilityDetails={affordabilityDetails} setAffordabilityDetails={setAffordabilityDetails} />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="tabs">
                <button onClick={() => setCurrentTab(0)}>Personal Details</button>
                <button onClick={() => setCurrentTab(1)}>Address Details</button>
                <button onClick={() => setCurrentTab(2)}>Employment Details</button>
                <button onClick={() => setCurrentTab(3)}>Affordability Details</button>
            </div>

            <form onSubmit={handleSubmit}>
                {renderTab()}

                <button type="submit">Submit Form</button>
            </form>
        </div>
    );
};

export default MultiStepForm;
