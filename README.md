# CareNest - Old Age Home Management System

CareNest is a comprehensive web application designed to manage and streamline operations for old age homes. It provides an intuitive interface for managing residents, services, activities, and donations.

## Features

- **Resident Management**
  - Track resident information
  - Medical history
  - Personal care requirements
  - Family contacts

- **Service Management**
  - Accommodation services
  - Medical care services
  - Personal care services
  - Recreational activities

- **Activity Management**
  - Schedule activities
  - Track participation
  - Manage event calendars

- **Donation System**
  - Online donation processing
  - Multiple payment methods (Bkash, Taptap Send, Bank Transfer)
  - Donation tracking

- **User Interface**
  - Modern, responsive design
  - Easy navigation
  - Mobile-friendly layout

## Technology Stack

### Frontend
- React.js
- Styled Components
- React Router
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/mukit-abdullah/care-nest.git
cd care-nest
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with your MongoDB connection string
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

5. Start the backend server
```bash
cd backend
npm start
```

6. Start the frontend development server
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
care-nest/
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Mukit Abdullah - [GitHub](https://github.com/mukit-abdullah)

Project Link: [https://github.com/mukit-abdullah/care-nest](https://github.com/mukit-abdullah/care-nest)
