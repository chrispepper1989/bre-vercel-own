"use client"
import React, {useState} from "react";

import './FormStyles.css';
import AddressDetailsForm, { AddressDetails } from "../molecules/AddressDetailsForm";
import {PersonalDetails, PersonalDetailsForm} from "@/components/molecules/PersonalDetailsForm";
import AffordabilityDetailsForm, {AffordabilityDetails} from "@/components/molecules/AffordabilityDetailsForm";
import EmploymentDetailsForm, {EmploymentDetails} from "@/components/molecules/EmploymentDetailsForm";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'



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
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent) => {
        const baseURL = process.env.API_URL ?? "https://localhost:7075/api";
        const url = `${baseURL}/FinanceScan/create`;
        event.preventDefault();
        const formData = {
            personalDetails,
            addressDetails,
            employmentDetails,
            affordabilityDetails,
        };
        const json = JSON.stringify(formData);
        console.log("the json is:")
        console.log(json);




        console.log("Calling")
        console.log(url)
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:json,
         
        })
            .then( async  (response) => {
                if (!response.ok) {
                    // If response status is not 2xx, throw an error
                    console.log("Validation errors!")
                    console.log(response)
                    console.log(response.status)
                    const errorData = await response.json(); // Extract the error message
                    console.log('Validation errors:', errorData);
                    throw new Error('Validation failed');
                }
                return response.json()
            })
            .then((data) => {
                console.log('Created scan with ID:', data.scanId);
                console.log('channel to sub to is:', data.quoteIds);

                console.log("Form Submitted:", formData);
                alert("Form submitted successfully!");
                 router.push(`/results?vid=${data.scanId}&cid=${data.scanId}&quoteIds=${data.quoteIds}`) //todo channel probably shouldnt be in the params
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
       
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
