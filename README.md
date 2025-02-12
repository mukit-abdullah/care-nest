# CareNest - Old Age Home Management System

CareNest is a comprehensive web application designed to manage and streamline operations in old age homes. It provides a complete solution for resident management, medical care, meal planning, and financial transactions.

## 🌟 Key Features

### 👥 Resident Management
- Complete resident registration system with multiple stages:
  - Personal Information
  - Medical History
  - Dietary Requirements
  - Room Assignment
  - Guardian Details
  - Financial Information
- Detailed resident profiles
- Application processing system for new residents

### 🏥 Medical Care
- Medical history tracking
- Healthcare management
- Medication schedules
- Regular health check-ups

### 🍽️ Meal Management
- Customized meal planning
- Dietary preference tracking
- Special meal facilities

### 💰 Financial Management
- Multiple payment gateways :
  - Bkash
  - TapTap
  - Bank Transfer
- Donation system
- Transaction history
- Financial reporting

### 🏠 Accommodation
- Room management
- Facility maintenance
- Occupancy tracking

### 🎯 Activities
- Recreational activities
- Events and celebrations
- Social engagement programs

## 💻 Technology Stack

### Frontend
- React.js with React Router for routing
- Styled Components for modern, component-based styling
- Axios for API communication
- Context API for state management
- Responsive design for all devices

### Backend
- Node.js
- Express.js framework
- MongoDB database
- JWT authentication
- RESTful API architecture
- Mongoose for MongoDB object modeling


## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/mukit-abdullah/care-nest.git
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Environment Setup
Create `.env` files in both frontend and backend directories with necessary configurations.

4. Start the application
```bash
# Start frontend only
cd frontend
npm run start

# Start backend only
cd backend
npm run dev
```

## 📁 Project Structure
```
CareNest/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   │       ├── Gallery/
│   │   │       ├── Landing Page/
│   │   │       ├── ServicesImage/
│   │   │       └── Testimonials/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   └── ...
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── ResidentInfo/
│   │   │   │   ├── ResidentRegistration/
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── services/
│   │   ├── theme/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── documentation/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   ├── package.json
│   ├── config.js
│   └── ...
└── package.json
```

## 🔒 Security Features
- JWT based authentication
- Protected admin routes
- Data encryption

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/DemoFeature`)
3. Commit your changes (`git commit -m 'Add some DemoFeature'`)
4. Push to the branch (`git push origin feature/DemoFeature`)
5. Open a Pull Request


## 👏 Acknowledgments
- Thanks to all contributors who have helped shape CareNest
- Special thanks to the open-source community for their valuable contributions

## 👨‍💻 Developed By - Team ALT F4
CareNest is a university project, developed as a free and open-source initiative by Team ALT F4.

# 🚀 Team Members
- Sadman Hossain - sadmanhossainwork@gmail.com
- Abdullah Al Mukit - amukit212099@bscse.uiu.ac.bd
- Arnab Banik - arnab.banik299@gmail.com
- Saikat Mahaldar - smahaldar212009@bscse.uiu.ac.bd
We appreciate contributions from the open-source community! Feel free to fork, modify, and improve the project.

## 📝 License
This project is licensed under the MIT License, allowing anyone to use, modify, and distribute it freely.