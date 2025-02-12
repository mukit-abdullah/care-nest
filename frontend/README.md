# CareNest Frontend

The frontend application for CareNest - A comprehensive Old Age Home Management System built with React.

## 🚀 Features

### 🏠 Public Pages
- **Home Page**: Landing page with hero section, services overview, and testimonials
- **Gallery**: Photo gallery showcasing facilities and activities
- **Services**:
  - Accommodation details
  - Medical care services
  - Personal care information
  - Activities and programs
- **Donation**: Integrated payment system with multiple gateways
  - Bkash Payment
  - TapTap Payment

### 👤 Admin Dashboard
- **Resident Management**:
  - Multi-step registration process
  - Resident information viewing and editing
  - Application processing
- **Meal Management**: Track and manage resident meals
- **Transaction Management**: Financial tracking and reporting

## 🛠️ Tech Stack

- **React 18**: Modern UI library for building user interfaces
- **React Router v6**: For application routing and navigation
- **Styled Components**: CSS-in-JS for component styling
- **Axios**: HTTP client for API requests
- **React Icons**: Icon library
- **Google Maps API**: For location services
- **Moment.js**: Date formatting and manipulation

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header/        # Navigation and header components
│   ├── Hero/          # Landing page hero section
│   ├── Services/      # Service section components
│   └── ...
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   │   ├── DashboardPage
│   │   ├── MealPage
│   │   └── TransactionPage
│   └── public/        # Public facing pages
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── assets/            # Static assets (images, fonts)
└── App.js             # Root component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```env
REACT_APP_API_URL=your_backend_url
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

3. Start the development server:
```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm start`: Run development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Backend API URL |
| REACT_APP_GOOGLE_MAPS_API_KEY | Google Maps API Key |

## 🎨 Styling

- Uses Styled Components for component-level styling
- Responsive design for all screen sizes
- Consistent color scheme and typography
- Modern and clean UI design

## 🔐 Authentication

- JWT-based authentication
- Protected routes for admin access
- Persistent login state
- Role-based access control

## 🌐 API Integration

- RESTful API consumption
- Axios interceptors for request/response handling
- Error handling and loading states
- Data caching strategies

## ⚡ Performance Optimization

- Code splitting with React.lazy
- Image optimization
- Lazy loading of components
- Memoization of expensive computations

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for different screen sizes
- Touch-friendly interface
- Optimized for tablets and desktop

## 🧪 Testing

The application includes:
- Unit tests for components
- Integration tests for user flows
- Mock service workers for API testing
- Snapshot testing

## 📚 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

