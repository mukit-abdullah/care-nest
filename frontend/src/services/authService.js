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

// Clear admin auth data
export const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('loginBlockedUntil');
    delete axios.defaults.headers.common['Authorization'];
};

// Login admin
export const loginAdmin = async (username, password) => {
    try {
        console.log('Attempting login for:', username);
        
        // Clear any existing auth data before login attempt
        clearAuthData();

        const response = await axios.post(urls.api.login, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Login response:', response.data);

        if (!response.data || !response.data.success) {
            console.error('Invalid response:', response.data);
            throw new Error(response.data?.message || 'Invalid response from server');
        }

        const userData = response.data.data;

        // Store the token and user data
        localStorage.setItem('authToken', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Set the default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        return {
            success: true,
            data: userData
        };
    } catch (error) {
        console.error('Login error:', error);
        
        // Handle rate limiting error
        if (error.response?.status === 429) {
            const retryAfter = error.response.data.retryAfter || 300; // Default to 5 minutes
            const minutes = Math.ceil(retryAfter / 60);
            throw new Error(`Too many login attempts. Please wait ${minutes} minute(s) and try again.`);
        }

        // Clear any partial auth data
        clearAuthData();
        
        return {
            success: false,
            message: error.response?.data?.message || error.message || 'Login failed'
        };
    }
};

// Logout admin
export const logoutAdmin = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization'];
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
            delete axios.defaults.headers.common['Authorization'];
        }
        throw error.response?.data?.message || error;
    }
};

// Get admin token
export const getAdminToken = () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No auth token found');
            return null;
        }
        return token;
    } catch (error) {
        console.error('Error getting admin token:', error);
        return null;
    }
};

// Check if admin is logged in
export const isAdminLoggedIn = () => {
    try {
        const token = getAdminToken();
        const userData = localStorage.getItem('userData');
        return !!(token && userData);
    } catch (error) {
        console.error('Error checking admin login status:', error);
        return false;
    }
};

// Get admin data
export const getAdminData = () => {
    try {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting admin data:', error);
        return null;
    }
};

// Check if admin account is active
export const isAdminActive = () => {
    try {
        const userData = getAdminData();
        return userData?.status === 'active';
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};
