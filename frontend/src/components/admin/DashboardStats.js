import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import axios from 'axios';

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  padding: 1rem;
  justify-content: center;
  width: 100%;
`;

const StatCard = styled.div`
  background: linear-gradient(90deg, #8EB15C, #D2E6B5);
  padding: 1rem;
  border-radius: 10px;
  width: 15rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    color: ${colors.text.dark};
    font-family: 'Istok Web', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${colors.text.dark};
    font-family: 'Istok Web', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const DashboardStats = () => {
  console.log('DashboardStats component mounted');
  
  const [stats, setStats] = useState({
    totalResidents: 0,
    availableResidents: 0,
    totalMeals: 0,
    totalDonations: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      console.log('Starting fetchStats...');
      
      try {
        const token = localStorage.getItem('authToken');
        console.log('Auth token retrieved:', token ? 'Token exists' : 'No token');
        
        if (!token) {
          console.error('No auth token available');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`
        };
        console.log('Headers prepared:', headers);

        console.log('Making API requests...');
        const [residentsResponse, donationsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/residents', {
            headers
          }),
          axios.get('http://localhost:5000/api/donations', {
            headers
          })
        ]);

        console.log('Residents API Response:', residentsResponse.data);
        console.log('Donations API Response:', donationsResponse.data);

        if (residentsResponse.data.success) {
          const residents = residentsResponse.data.data;
          const donations = donationsResponse.data; // donations response is directly an array

          console.log('Raw Residents Data:', residents);
          console.log('Raw Donations Data:', donations);

          // Calculate stats
          const totalResidents = residents.length;
          console.log('Total Residents:', totalResidents);

          const availableResidents = residents.filter(resident => {
            const residentStatus = resident.status || resident.resident_status;
            console.log('Resident:', resident.name, 'Status:', residentStatus);
            return residentStatus && residentStatus.toLowerCase() === 'active';
          }).length;
          console.log('Available Residents:', availableResidents);

          const totalMeals = availableResidents * 3;
          console.log('Total Meals:', totalMeals);

          // Check if donations is an array before reducing
          const totalDonations = Array.isArray(donations) 
            ? donations.reduce((sum, donation) => {
                console.log('Processing donation:', donation);
                return sum + Number(donation.amount);
              }, 0)
            : 0;
          console.log('Total Donations:', totalDonations);

          const newStats = {
            totalResidents,
            availableResidents,
            totalMeals,
            totalDonations
          };
          console.log('Setting new stats:', newStats);

          setStats(newStats);
        } else {
          console.error('Residents API response indicated failure');
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        if (error.response) {
          console.error('Error response:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
        }
      }
    };

    fetchStats();
  }, []);

  // Debug: Log when stats change
  useEffect(() => {
    console.log('Stats updated:', stats);
  }, [stats]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const statsData = [
    { number: stats.totalResidents, label: 'Residents' },
    { number: stats.availableResidents, label: 'Available Residents' },
    { number: stats.totalMeals, label: 'Meals' },
    { number: `${formatNumber(stats.totalDonations)}`, label: 'Available Donation (BDT)' },
  ];

  // Debug: Log rendered data
  console.log('Rendering stats data:', statsData);

  return (
    <StatsContainer>
      {statsData.map((stat, index) => (
        <StatCard key={index}>
          <h3>{stat.label}</h3>
          <p>{stat.number}</p>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default DashboardStats;
