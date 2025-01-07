import React, { createContext, useContext, useState, useEffect } from 'react';

const ResidentRegistrationContext = createContext();

const initialResidentData = {
    // Personal Information
    full_name: '',
    gender: '',
    date_of_birth: '',
    contact_number: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
    address: '',
    profile_picture: null,
    status: 'active',

    // Medical Information
    blood_group: '',
    medical_history: '',
    medical_files: [],
    current_medication: '',
    physician_name: '',
    physician_contact_number: '',
    special_needs: '',
    insurance_details: '',

    // Diet Information
    dietary_preference: '',
    food_category: '',
    food_texture: '',
    food_allergies: '',
    special_diet_needs: '',
    additional_notes: '',

    // Room Information
    room_type: '',
    room_number: '',
    special_facilities: '',
    additional_notes: '',

    // Guardian Information
    guardian_name: '',
    guardian_relationship: '',
    guardian_contact_number: '',
    guardian_address: '',

    // Financial Information
    payment_preference: '',
    account_number: '',
    payment_details: ''
};

export const ResidentRegistrationProvider = ({ children }) => {
    // Initialize state from localStorage or use initial data
    const [residentData, setResidentData] = useState(() => {
        const savedData = localStorage.getItem('residentRegistrationData');
        return savedData ? JSON.parse(savedData) : initialResidentData;
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('residentRegistrationData', JSON.stringify(residentData));
    }, [residentData]);

    const updateResidentData = (section, data) => {
        if (!data || typeof data !== 'object') {
            console.error('Invalid data provided to updateResidentData');
            return;
        }

        setResidentData(prev => {
            const updatedData = { ...prev };
            
            // If section is provided, update only that section
            if (section) {
                // Convert camelCase keys to snake_case if needed
                Object.keys(data).forEach(key => {
                    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
                    updatedData[snakeKey] = data[key];
                });
            } else {
                // If no section provided, directly update with data
                Object.assign(updatedData, data);
            }
            
            return updatedData;
        });
    };

    const resetResidentData = () => {
        setResidentData(initialResidentData);
        localStorage.removeItem('residentRegistrationData');
    };

    const validateAllFields = () => {
        const requiredFields = {
            // Personal Information
            full_name: 'Full Name',
            gender: 'Gender',
            date_of_birth: 'Date of Birth',
            contact_number: 'Contact Number',

            // Medical Information
            blood_group: 'Blood Group',
            medical_history: 'Medical History',

            // Diet Information
            dietary_preference: 'Dietary Preference',
            food_category: 'Food Category',

            // Room Information
            room_type: 'Room Type',
            room_number: 'Room Number',

            // Financial Information
            payment_preference: 'Payment Preference'
        };

        const missingFields = [];
        for (const [field, label] of Object.entries(requiredFields)) {
            if (!residentData[field]) {
                missingFields.push(label);
            }
        }

        return missingFields;
    };

    return (
        <ResidentRegistrationContext.Provider 
            value={{ 
                residentData, 
                updateResidentData,
                resetResidentData,
                validateAllFields 
            }}
        >
            {children}
        </ResidentRegistrationContext.Provider>
    );
};

export const useResidentRegistration = () => {
    const context = useContext(ResidentRegistrationContext);
    if (!context) {
        throw new Error('useResidentRegistration must be used within a ResidentRegistrationProvider');
    }
    return context;
};

export default ResidentRegistrationContext;
