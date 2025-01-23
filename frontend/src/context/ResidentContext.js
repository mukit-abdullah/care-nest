import React from 'react';
import axios from 'axios';

const { createContext, useContext, useState, useCallback, useEffect } = React;
const ResidentContext = createContext();

export const ResidentProvider = ({ children }) => {
  const [residentData, setResidentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentResidentId, setCurrentResidentId] = useState(null);

  const fetchResident = useCallback(async (residentId) => {
    if (!residentId) {
      console.error('ResidentContext - fetchResident - No residentId provided');
      return null;
    }
    
    try {
      setLoading(true);
      console.log('ResidentContext - fetchResident - Fetching data for:', residentId);
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('ResidentContext - fetchResident - No auth token available');
        return null;
      }

      const response = await axios.get(`http://localhost:5000/api/residents/${residentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('ResidentContext - fetchResident - API Response:', response.data);

      if (response.data.success) {
        console.log('ResidentContext - fetchResident - Setting resident data');
        setResidentData(response.data.data);
        return response.data.data;
      }
      
      console.error('ResidentContext - fetchResident - API returned success: false');
      return null;
    } catch (error) {
      console.error('ResidentContext - fetchResident - Error:', error);
      if (error.response) {
        console.error('ResidentContext - fetchResident - Error response:', {
          status: error.response.status,
          data: error.response.data
        });
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add useEffect to fetch data when currentResidentId changes
  useEffect(() => {
    console.log('ResidentContext - currentResidentId changed:', currentResidentId);
    if (currentResidentId) {
      fetchResident(currentResidentId);
    } else {
      setResidentData(null);
    }
  }, [currentResidentId, fetchResident]);

  const updateResidentData = useCallback(async (updatedData) => {
    try {
      console.log('ResidentContext - updateResidentData - Updating with:', updatedData);
      setResidentData(prevData => {
        if (!prevData) return updatedData;
        return {
          ...prevData,
          resident: {
            ...prevData.resident,
            ...updatedData.residentData
          }
        };
      });
      return true;
    } catch (error) {
      console.error('ResidentContext - updateResidentData - Error:', error);
      return false;
    }
  }, []);

  const updateResidentSection = useCallback(async (section, data) => {
    if (!currentResidentId) {
      console.error('ResidentContext - updateResidentSection - No currentResidentId');
      return false;
    }

    try {
      console.log('ResidentContext - updateResidentSection - Starting update:', {
        residentId: currentResidentId,
        section,
        data
      });

      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('ResidentContext - updateResidentSection - No auth token available');
        return false;
      }

      console.log('ResidentContext - updateResidentSection - Token:', token ? 'Present' : 'Missing');

      // Log the exact request being made
      console.log('ResidentContext - updateResidentSection - Making request:', {
        url: `http://localhost:5000/api/residents/${currentResidentId}`,
        method: 'PUT',
        data: { [section]: data },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const response = await axios.put(
        `http://localhost:5000/api/residents/${currentResidentId}`,
        { [section]: data },  
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log('ResidentContext - updateResidentSection - Raw API Response:', response);
      console.log('ResidentContext - updateResidentSection - API Response Data:', response.data);
      console.log('ResidentContext - updateResidentSection - API Response Headers:', response.headers);

      if (response.data.success) {
        console.log('ResidentContext - updateResidentSection - Update successful, updating context');
        // Update the context with the new data
        setResidentData(prev => {
          const updated = {
            ...prev,
            [section]: data
          };
          console.log('ResidentContext - updateResidentSection - Updated context:', updated);
          return updated;
        });
        return true;
      }
      
      console.error('ResidentContext - updateResidentSection - API returned success: false');
      return false;
    } catch (error) {
      console.error('ResidentContext - updateResidentSection - Error:', error);
      if (error.response) {
        console.error('ResidentContext - updateResidentSection - Error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      return false;
    }
  }, [currentResidentId]);

  const value = {
    residentData,
    loading,
    currentResidentId,
    setCurrentResidentId,
    fetchResident,
    updateResidentData,
    updateResidentSection
  };

  return (
    <ResidentContext.Provider value={value}>
      {children}
    </ResidentContext.Provider>
  );
};

export const useResident = () => {
  const context = useContext(ResidentContext);
  if (!context) {
    throw new Error('useResident must be used within a ResidentProvider');
  }
  return context;
};

export default ResidentContext;