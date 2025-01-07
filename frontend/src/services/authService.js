import axios from 'axios';

// API Configuration
const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:5000';
const API_URL = `${BACKEND_URL}/api`;

// Configure axios defaults
axios.defaults.baseURL = BACKEND_URL;

// Export URL constants
export const urls = {
    frontend: FRONTEND_URL,
    backend: BACKEND_URL,
    login: `${FRONTEND_URL}/login`,  // Frontend login page
    api: {
        login: `${API_URL}/admin/login`,   // Backend login endpoint
        profile: `${API_URL}/admin/profile`,
        residents: `${API_URL}/residents`,
        rooms: `${API_URL}/rooms`,
        guardians: `${API_URL}/guardians`,
        medicalRecords: `${API_URL}/medical-records`,
        diets: `${API_URL}/diets`,
        financialRecords: `${API_URL}/financial-records`
    },
    // Admin routes
    admin: {
        dashboard: '/admin/dashboard',
        residents: '/admin/residents',
        registration: {
            personal: '/admin/registration/personal',
            medical: '/admin/registration/medical',
            diet: '/admin/registration/diet',
            room: '/admin/registration/room',
            guardian: '/admin/registration/guardian',
            financial: '/admin/registration/financial'
        }
    }
};

// Login admin
export const loginAdmin = async (username, password) => {
    try {
        console.log('Attempting login for:', username);
        const response = await axios.post(urls.api.login, {
            username,
            password
        });

        console.log('Login response:', response.data);

        if (!response.data || !response.data.success) {
            console.error('Invalid response:', response.data);
            throw new Error(response.data?.message || 'Invalid response from server');
        }

        const userData = response.data.data;
        console.log('User data:', userData);

        // Validate user data
        if (!userData || !userData._id || !userData.username || !userData.role || !userData.status) {
            console.error('Invalid user data:', userData);
            throw new Error('Invalid user data received');
        }

        // Check if user is admin or super_admin
        if (userData.role !== 'admin' && userData.role !== 'super_admin') {
            console.error('Invalid role:', userData.role);
            throw new Error('Access denied. Only administrators are allowed.');
        }

        // Check if account is active
        console.log('Account status:', userData.status);
        if (userData.status !== 'active') {
            console.error('Account not active. Status:', userData.status);
            throw new Error('Your account has been deactivated. Please contact the administrator.');
        }

        // Store token and user data
        localStorage.setItem('authToken', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Auth data stored successfully');

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        
        // Clear any existing auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');

        if (error.response) {
            // Server responded with error
            console.error('Server error:', error.response.data);
            if (error.response.status === 401) {
                throw new Error('Invalid username or password');
            } else if (error.response.status === 403) {
                throw new Error('Access denied. Please check your credentials.');
            }
            throw new Error(error.response.data.message || 'Login failed');
        }
        
        // If error is Error object, use its message
        if (error instanceof Error) {
            throw error.message;
        }
        
        // If error is string (thrown by us)
        if (typeof error === 'string') {
            throw error;
        }
        
        throw new Error('Network error. Please try again later.');
    }
};

// Logout admin
export const logoutAdmin = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
};

// Get admin profile
export const getAdminProfile = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw 'Not authenticated';
        }

        const response = await axios.get(urls.api.profile, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.success) {
            return response.data.data;
        }

        throw response.data.message || 'Failed to get profile';
    } catch (error) {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
        }
        throw error.response?.data?.message || error;
    }
};

// Get admin token
export const getAdminToken = () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.warn('No auth token found');
            return null;
        }
        return token; // Return raw token, Bearer prefix added in axios interceptor
    } catch (error) {
        console.error('Error getting admin token:', error);
        return null;
    }
};

// Check if admin is logged in
export const isAdminLoggedIn = () => {
    try {
        const token = getAdminToken();
        const userData = getAdminData();
        return !!(token && userData && userData._id);
    } catch (error) {
        console.error('Error checking admin login status:', error);
        return false;
    }
};

// Get admin data
export const getAdminData = () => {
    try {
        const userDataStr = localStorage.getItem('userData');
        if (!userDataStr) {
            console.warn('No user data found');
            return null;
        }
        const userData = JSON.parse(userDataStr);
        if (!userData || !userData._id || !userData.username || !userData.role) {
            console.warn('Invalid user data format');
            clearAuthData();
            return null;
        }
        return userData;
    } catch (error) {
        console.error('Error getting admin data:', error);
        clearAuthData();
        return null;
    }
};

// Check if admin account is active
export const isAdminActive = () => {
    try {
        const userData = getAdminData();
        return userData && userData.status === 'active';
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};

// Clear admin auth data
export const clearAuthData = () => {
    try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        console.log('Auth data cleared successfully');
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
};
