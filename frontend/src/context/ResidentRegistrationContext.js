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

    const resetRegistrationData = () => {
        console.log('ResidentRegistrationContext - Resetting all data');
        setResidentData(initialResidentData);
        localStorage.removeItem('residentRegistrationData');
    };

    const updateResidentData = (section, data) => {
        if (!data || typeof data !== 'object') {
            console.error('Invalid data provided to updateResidentData');
            return;
        }

        console.log('ResidentRegistrationContext - Updating section:', section, 'with data:', data);

        setResidentData(prev => {
            const updatedData = { ...prev };
            
            // If section is provided, update only that section
            if (section === 'medical') {
                // Handle medical section specifically
                updatedData.blood_group = data.blood_group !== undefined ? data.blood_group : prev.blood_group;
                updatedData.medical_history = data.medical_history !== undefined ? data.medical_history : prev.medical_history;
                updatedData.medical_files_url = data.medical_files_url !== undefined ? data.medical_files_url : prev.medical_files_url;
                updatedData.current_medication = data.current_medication !== undefined ? data.current_medication : prev.current_medication;
                updatedData.physician_name = data.physician_name !== undefined ? data.physician_name : prev.physician_name;
                updatedData.physician_contact_number = data.physician_contact_number !== undefined ? data.physician_contact_number : prev.physician_contact_number;
                updatedData.special_needs = data.special_needs !== undefined ? data.special_needs : prev.special_needs;
                updatedData.insurance_details = data.insurance_details !== undefined ? data.insurance_details : prev.insurance_details;
                updatedData.insurance_files_url = data.insurance_files_url !== undefined ? data.insurance_files_url : prev.insurance_files_url;
            } else if (section === 'personal') {
                // Handle personal section specifically
                updatedData.full_name = data.full_name !== undefined ? data.full_name : prev.full_name;
                updatedData.gender = data.gender !== undefined ? data.gender : prev.gender;
                updatedData.date_of_birth = data.date_of_birth !== undefined ? data.date_of_birth : prev.date_of_birth;
                updatedData.contact_number = data.contact_number !== undefined ? data.contact_number : prev.contact_number;
                updatedData.emergency_contact_name = data.emergency_contact_name !== undefined ? data.emergency_contact_name : prev.emergency_contact_name;
                updatedData.emergency_contact_number = data.emergency_contact_number !== undefined ? data.emergency_contact_number : prev.emergency_contact_number;
                updatedData.address = data.address !== undefined ? data.address : prev.address;
                updatedData.profile_picture = data.profile_picture !== undefined ? data.profile_picture : prev.profile_picture;
            } else if (section === 'diet') {
                // Handle diet section specifically
                updatedData.dietary_preference = data.dietary_preference !== undefined ? data.dietary_preference : prev.dietary_preference;
                updatedData.food_category = data.food_category !== undefined ? data.food_category : prev.food_category;
                updatedData.food_texture = data.food_texture !== undefined ? data.food_texture : prev.food_texture;
                updatedData.food_allergies = data.food_allergies !== undefined ? data.food_allergies : prev.food_allergies;
                updatedData.special_diet_needs = data.special_diet_needs !== undefined ? data.special_diet_needs : prev.special_diet_needs;
                updatedData.additional_notes = data.additional_notes !== undefined ? data.additional_notes : prev.additional_notes;
            } else if (section === 'guardian') {
                // Handle guardian section specifically
                updatedData.guardian_name = data.guardian_name;
                updatedData.guardian_relationship = data.guardian_relationship;
                updatedData.guardian_contact_number = data.guardian_contact_number;
                updatedData.guardian_address = data.guardian_address;
            } else if (section === 'financial') {
                // Handle financial section specifically
                updatedData.payment_preference = data.payment_preference;
                updatedData.account_number = data.account_number;
                updatedData.payment_details = data.payment_details;
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
            
            console.log('ResidentRegistrationContext - Updated data:', updatedData);
            return updatedData;
        });
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
                resetRegistrationData,
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
