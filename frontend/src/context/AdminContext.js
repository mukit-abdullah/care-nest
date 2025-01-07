import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(() => {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error loading admin data:', error);
      return null;
    }
  });

  const updateAdminData = (data) => {
    console.log('Updating admin data:', data);
    if (!data) {
      console.error('Invalid admin data');
      return;
    }

    try {
      // Store in context
      setAdminData(data);
      
      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(data));
      
      console.log('Admin data updated successfully');
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  };

  const clearAdminData = () => {
    console.log('Clearing admin data');
    setAdminData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const value = {
    adminData,
    updateAdminData,
    clearAdminData,
    isAuthenticated: !!adminData,
    isAdmin: adminData?.role === 'admin' || adminData?.role === 'super_admin',
    isActive: adminData?.status === 'active'
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
