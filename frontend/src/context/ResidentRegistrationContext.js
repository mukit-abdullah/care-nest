import React, { createContext, useContext, useState } from 'react';

const ResidentRegistrationContext = createContext();

export const ResidentRegistrationProvider = ({ children }) => {
    const [residentData, setResidentData] = useState({
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
        physician_contact: '',
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
        guardian_contact: '',
        guardian_address: '',

        // Financial Information
        payment_preference: '',
        account_number: '',
        payment_details: ''
    });

    const updateResidentData = (section, data) => {
        setResidentData(prev => {
            const updatedData = { ...prev };
            
            // Convert camelCase keys to snake_case if needed
            Object.keys(data).forEach(key => {
                const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
                updatedData[snakeKey] = data[key];
            });
            
            return updatedData;
        });
    };

    const resetResidentData = () => {
        setResidentData({
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
            physician_contact: '',
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
            guardian_contact: '',
            guardian_address: '',

            // Financial Information
            payment_preference: '',
            account_number: '',
            payment_details: ''
        });
    };

    const validateAllFields = () => {
        const errors = [];
        
        // Personal Page Validation
        if (!residentData.full_name) {
            errors.push({ page: 'personal', field: 'full_name', message: 'Full Name is required' });
        }
        if (!residentData.gender) {
            errors.push({ page: 'personal', field: 'gender', message: 'Gender is required' });
        }
        if (!residentData.date_of_birth) {
            errors.push({ page: 'personal', field: 'date_of_birth', message: 'Date of Birth is required' });
        }

        // Diet Page Validation
        if (!residentData.dietary_preference) {
            errors.push({ page: 'diet', field: 'dietary_preference', message: 'Dietary Preference is required' });
        }
        if (!residentData.food_category) {
            errors.push({ page: 'diet', field: 'food_category', message: 'Food Category is required' });
        }
        if (!residentData.food_texture) {
            errors.push({ page: 'diet', field: 'food_texture', message: 'Food Texture is required' });
        }

        // Room Page Validation
        if (!residentData.room_type) {
            errors.push({ page: 'room', field: 'room_type', message: 'Room Type is required' });
        }
        if (!residentData.room_number) {
            errors.push({ page: 'room', field: 'room_number', message: 'Room Number is required' });
        }

        // Financial Page Validation
        if (!residentData.payment_preference) {
            errors.push({ page: 'financial', field: 'payment_preference', message: 'Payment Preference is required' });
        }

        return errors;
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
