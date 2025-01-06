import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Login admin
export const loginAdmin = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        });

        if (response.data.success) {
            const userData = response.data.data;

            // Check if user is admin or super_admin
            if (userData.role !== 'admin' && userData.role !== 'super_admin') {
                throw 'Access denied. Only administrators are allowed.';
            }

            // Check if account is active
            if (userData.status !== 'active') {
                throw 'Your account is not active. Please contact the super admin.';
            }

            // Store token and user data
            localStorage.setItem('authToken', userData.token);
            localStorage.setItem('userData', JSON.stringify(userData));

            return response.data;
        }

        throw response.data.message || 'Invalid response from server';
    } catch (error) {
        if (error.response) {
            // Server responded with error
            if (error.response.status === 401) {
                throw 'Invalid username or password';
            } else if (error.response.status === 403) {
                throw 'Access denied. Please check your credentials.';
            }
            throw error.response.data.message || 'Login failed';
        }
        // If error is string (thrown by us)
        if (typeof error === 'string') {
            throw error;
        }
        throw 'Network error. Please try again later.';
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

        const response = await axios.get(`${API_URL}/profile`, {
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

// Check if admin is logged in
export const isAdminLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
};

// Get admin token
export const getAdminToken = () => {
    return localStorage.getItem('authToken');
};

// Get admin data
export const getAdminData = () => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
};
