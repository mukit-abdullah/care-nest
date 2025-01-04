const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Services
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return response.json();
  },

  getServiceById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch service');
    }
    return response.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    return response.json();
  },

  // Donations
  createDonation: async (donationData) => {
    const response = await fetch(`${API_BASE_URL}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });
    if (!response.ok) {
      throw new Error('Failed to create donation');
    }
    return response.json();
  },

  // Contact
  submitContactForm: async (contactData) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    return response.json();
  },
};
