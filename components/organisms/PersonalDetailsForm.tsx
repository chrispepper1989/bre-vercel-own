// Define models as interfaces
import React from "react";

export interface PersonalDetails {
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    maritalStatus: string;
    email: string;
    phoneNumber: string;
    drivingLicenseNumber: string;
    drivingLicenseType: string;
    drivingLicenseExpiryDate: string;
    passportNumber: string;
    nationalInsuranceNumber: string;
    employmentStatus: string;
    annualIncome: number;
}

// Personal Details Form
export const PersonalDetailsForm: React.FC<{
    personalDetails: PersonalDetails;
    setPersonalDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>
}> = ({personalDetails, setPersonalDetails}) => (
    <div>
        <h2>Personal Details</h2>
        <label>
            Title:
            <input type="text" value={personalDetails.title}
                   onChange={(e) => setPersonalDetails({...personalDetails, title: e.target.value})}/>
        </label>
        <label>
            First Name:
            <input type="text" value={personalDetails.firstName}
                   onChange={(e) => setPersonalDetails({...personalDetails, firstName: e.target.value})}/>
        </label>
        <label>
            Last Name:
            <input type="text" value={personalDetails.lastName}
                   onChange={(e) => setPersonalDetails({...personalDetails, lastName: e.target.value})}/>
        </label>
        <label>
            Date of Birth:
            <input type="date" value={personalDetails.dateOfBirth}
                   onChange={(e) => setPersonalDetails({...personalDetails, dateOfBirth: e.target.value})}/>
        </label>
        <label>
            Nationality:
            <input type="text" value={personalDetails.nationality}
                   onChange={(e) => setPersonalDetails({...personalDetails, nationality: e.target.value})}/>
        </label>
        <label>
            Marital Status:
            <input type="text" value={personalDetails.maritalStatus}
                   onChange={(e) => setPersonalDetails({...personalDetails, maritalStatus: e.target.value})}/>
        </label>
        <label>
            Email:
            <input type="email" value={personalDetails.email}
                   onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}/>
        </label>
        <label>
            Phone Number:
            <input type="tel" value={personalDetails.phoneNumber}
                   onChange={(e) => setPersonalDetails({...personalDetails, phoneNumber: e.target.value})}/>
        </label>
        <label>
            Driving License Number:
            <input type="text" value={personalDetails.drivingLicenseNumber}
                   onChange={(e) => setPersonalDetails({...personalDetails, drivingLicenseNumber: e.target.value})}/>
        </label>
        <label>
            Driving License Type:
            <input type="text" value={personalDetails.drivingLicenseType}
                   onChange={(e) => setPersonalDetails({...personalDetails, drivingLicenseType: e.target.value})}/>
        </label>
        <label>
            Driving License Expiry Date:
            <input type="date" value={personalDetails.drivingLicenseExpiryDate} onChange={(e) => setPersonalDetails({
                ...personalDetails,
                drivingLicenseExpiryDate: e.target.value
            })}/>
        </label>
        <label>
            Passport Number:
            <input type="text" value={personalDetails.passportNumber}
                   onChange={(e) => setPersonalDetails({...personalDetails, passportNumber: e.target.value})}/>
        </label>
        <label>
            National Insurance Number:
            <input type="text" value={personalDetails.nationalInsuranceNumber}
                   onChange={(e) => setPersonalDetails({...personalDetails, nationalInsuranceNumber: e.target.value})}/>
        </label>
        <label>
            Employment Status:
            <input type="text" value={personalDetails.employmentStatus}
                   onChange={(e) => setPersonalDetails({...personalDetails, employmentStatus: e.target.value})}/>
        </label>
        <label>
            Annual Income:
            <input type="number" value={personalDetails.annualIncome} onChange={(e) => setPersonalDetails({
                ...personalDetails,
                annualIncome: parseFloat(e.target.value)
            })}/>
        </label>
    </div>
);