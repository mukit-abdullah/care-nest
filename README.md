# CareNest - Old Age Home Management System

CareNest is a comprehensive web application designed to manage and streamline operations in old age homes. Built with React for the frontend and Node.js/Express for the backend, it offers a modern and intuitive interface for administrators and staff.

## Features

### Admin Dashboard
- Resident management with photo display
- Quick stats overview (total residents, rooms, staff)
- Add/Edit/Delete resident information
- User-friendly interface with modern design

### Meal Management
- Track different meal categories:
  - Vegetarian
  - Non-Vegetarian
  - Vegan
- Monitor resident dietary preferences
- Daily meal count tracking
- Special meal type tracking (Spicy/Non-Spicy, Hard/Soft)

### Transaction Management
- Financial transaction tracking
- Payment history
- Expense management

## Technology Stack

### Frontend
- React.js
- Styled Components for styling
- React Router for navigation
- Modern UI/UX with responsive design

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Start the development servers
```bash
# Start frontend
cd frontend
npm start

# Start backend
cd ../backend
npm start
```

## Project Structure
```
CareNest/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── theme/
│   │   └── App.js
│   └── package.json
└── backend/
    ├── src/
    │   ├── routes/
    │   ├── models/
    │   └── controllers/
    └── package.json
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Thanks to all contributors who have helped shape CareNest
- Special thanks to the open-source community for the tools and libraries used
