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
    medical_files_url: '',
    current_medication: '',
    physician_name: '',
    physician_contact_number: '',
    special_needs: '',
    insurance_details: '',
    insurance_files_url: '',

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
            if (section === 'medical') {
                // Handle medical section specifically
                updatedData.blood_group = data.blood_group || prev.blood_group;
                updatedData.medical_history = data.medical_history || prev.medical_history;
                updatedData.medical_files_url = data.medical_files_url || prev.medical_files_url;
                updatedData.current_medication = data.current_medication || prev.current_medication;
                updatedData.physician_name = data.physician_name || prev.physician_name;
                updatedData.physician_contact_number = data.physician_contact_number || prev.physician_contact_number;
                updatedData.special_needs = data.special_needs || prev.special_needs;
                updatedData.insurance_details = data.insurance_details || prev.insurance_details;
                
            } else if (section) {
                // For other sections, update normally
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

            // Diet Information
            dietary_preference: 'Dietary Preference',
            food_category: 'Food Category',
            food_texture: 'Food Texture',

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
