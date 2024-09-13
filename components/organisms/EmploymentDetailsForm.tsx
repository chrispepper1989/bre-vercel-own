import React from "react";


// Define EmploymentDetails interface
export interface EmploymentDetails {
    employmentStatus: string;
    employerName: string;
    jobTitle: string;
    annualIncome: number;
    employmentType: string;
    employmentStartDate: string;
    yearsAtJob: number;
    monthsAtJob: number;
    employerAddress: AddressDetails;
    workPhoneNumber: string;
}

const EmploymentDetailsForm: React.FC<{
    employmentDetails: EmploymentDetails;
    setEmploymentDetails: React.Dispatch<React.SetStateAction<EmploymentDetails>>;
}> = ({ employmentDetails, setEmploymentDetails }) => (
    <div>
        <h2>Employment Details</h2>

        <label>
            Employment Status:
            <input
                type="text"
                value={employmentDetails.employmentStatus}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, employmentStatus: e.target.value })}
            />
        </label>

        <label>
            Employer Name:
            <input
                type="text"
                value={employmentDetails.employerName}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, employerName: e.target.value })}
            />
        </label>

        <label>
            Job Title:
            <input
                type="text"
                value={employmentDetails.jobTitle}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, jobTitle: e.target.value })}
            />
        </label>

        <label>
            Annual Income:
            <input
                type="number"
                value={employmentDetails.annualIncome}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, annualIncome: parseFloat(e.target.value) })}
            />
        </label>

        <label>
            Employment Type:
            <input
                type="text"
                value={employmentDetails.employmentType}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, employmentType: e.target.value })}
            />
        </label>

        <label>
            Employment Start Date:
            <input
                type="date"
                value={employmentDetails.employmentStartDate}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, employmentStartDate: e.target.value })}
            />
        </label>

        <label>
            Years at Job:
            <input
                type="number"
                value={employmentDetails.yearsAtJob}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, yearsAtJob: parseInt(e.target.value, 10) })}
            />
        </label>

        <label>
            Months at Job:
            <input
                type="number"
                value={employmentDetails.monthsAtJob}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, monthsAtJob: parseInt(e.target.value, 10) })}
            />
        </label>

        <label>
            Work Phone Number:
            <input
                type="tel"
                value={employmentDetails.workPhoneNumber}
                onChange={(e) => setEmploymentDetails({ ...employmentDetails, workPhoneNumber: e.target.value })}
            />
        </label>

        <h3>Employer Address</h3>
        <label>
            Address Line 1:
            <input
                type="text"
                value={employmentDetails.employerAddress.addressLine1}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, addressLine1: e.target.value }
                })}
            />
        </label>

        <label>
            Address Line 2:
            <input
                type="text"
                value={employmentDetails.employerAddress.addressLine2}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, addressLine2: e.target.value }
                })}
            />
        </label>

        <label>
            City:
            <input
                type="text"
                value={employmentDetails.employerAddress.city}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, city: e.target.value }
                })}
            />
        </label>

        <label>
            Postcode:
            <input
                type="text"
                value={employmentDetails.employerAddress.postcode}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, postcode: e.target.value }
                })}
            />
        </label>

        <label>
            Country:
            <input
                type="text"
                value={employmentDetails.employerAddress.country}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, country: e.target.value }
                })}
            />
        </label>

        <label>
            Residential Status:
            <input
                type="text"
                value={employmentDetails.employerAddress.residentialStatus}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, residentialStatus: e.target.value }
                })}
            />
        </label>

        <label>
            Years at Address:
            <input
                type="number"
                value={employmentDetails.employerAddress.yearsAtAddress}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, yearsAtAddress: parseInt(e.target.value, 10) }
                })}
            />
        </label>

        <label>
            Months at Address:
            <input
                type="number"
                value={employmentDetails.employerAddress.monthsAtAddress}
                onChange={(e) => setEmploymentDetails({
                    ...employmentDetails,
                    employerAddress: { ...employmentDetails.employerAddress, monthsAtAddress: parseInt(e.target.value, 10) }
                })}
            />
        </label>
    </div>
);

export default EmploymentDetailsForm;
