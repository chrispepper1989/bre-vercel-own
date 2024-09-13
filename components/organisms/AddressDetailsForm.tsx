import React from "react";

// Define AddressDetails interface
export interface AddressDetails {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
    country: string;
    residentialStatus: string;
    yearsAtAddress: number;
    monthsAtAddress: number;
}

const AddressDetailsForm: React.FC<{
    addressDetails: AddressDetails;
    setAddressDetails: React.Dispatch<React.SetStateAction<AddressDetails>>;
}> = ({ addressDetails, setAddressDetails }) => (
    <div>
        <h2>Address Details</h2>

        <label>
            Address Line 1:
            <input
                type="text"
                value={addressDetails.addressLine1}
                onChange={(e) => setAddressDetails({ ...addressDetails, addressLine1: e.target.value })}
            />
        </label>

        <label>
            Address Line 2:
            <input
                type="text"
                value={addressDetails.addressLine2}
                onChange={(e) => setAddressDetails({ ...addressDetails, addressLine2: e.target.value })}
            />
        </label>

        <label>
            City:
            <input
                type="text"
                value={addressDetails.city}
                onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
            />
        </label>

        <label>
            Postcode:
            <input
                type="text"
                value={addressDetails.postcode}
                onChange={(e) => setAddressDetails({ ...addressDetails, postcode: e.target.value })}
            />
        </label>

        <label>
            Country:
            <input
                type="text"
                value={addressDetails.country}
                onChange={(e) => setAddressDetails({ ...addressDetails, country: e.target.value })}
            />
        </label>

        <label>
            Residential Status:
            <input
                type="text"
                value={addressDetails.residentialStatus}
                onChange={(e) => setAddressDetails({ ...addressDetails, residentialStatus: e.target.value })}
            />
        </label>

        <label>
            Years at Address:
            <input
                type="number"
                value={addressDetails.yearsAtAddress}
                onChange={(e) => setAddressDetails({ ...addressDetails, yearsAtAddress: parseInt(e.target.value, 10) })}
            />
        </label>

        <label>
            Months at Address:
            <input
                type="number"
                value={addressDetails.monthsAtAddress}
                onChange={(e) => setAddressDetails({ ...addressDetails, monthsAtAddress: parseInt(e.target.value, 10) })}
            />
        </label>
    </div>
);

export default AddressDetailsForm;
