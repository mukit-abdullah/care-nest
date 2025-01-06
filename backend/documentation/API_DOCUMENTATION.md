# CareNest API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT (JSON Web Token). Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Response Format
All responses follow this format:
```json
{
    "success": true/false,
    "data": {}, // Response data object
    "message": "" // Error message if success is false
}
```

## Admin Routes
### POST /admin/register
Register a new admin.
- **Access**: Public
- **Request Body**:
```json
{
    "username": "admin123",
    "email": "admin@carenest.com",
    "password": "password123",
    "role": "admin",
    "contact_number": "1234567890"
}
```

### POST /admin/login
Login for admins.
- **Access**: Public
- **Request Body**:
```json
{
    "email": "admin@carenest.com",
    "password": "password123"
}
```

## Resident Routes
### POST /residents
Create a new resident with all related information.
- **Access**: Admin only
- **Request Body**:
```json
{
    "residentData": {
        "name": "John Doe",
        "date_of_birth": "1950-01-15",
        "gender": "Male",
        "photo_url": "url_to_photo",
        "blood_group": "A+",
        "personal_contact_number": "1234567890",
        "emergency_contact_name": "Jane Doe",
        "emergency_contact_number": "0987654321",
        "address": "123 Main St"
    },
    "roomData": {
        "room_number": "101",
        "room_type": "single",
        "special_facilities": ["Wheelchair Access", "Emergency Bell"]
    },
    "guardianData": {
        "name": "Jane Doe",
        "relationship": "Daughter",
        "contact_number": "0987654321",
        "address": "456 Oak St"
    },
    "medicalData": {
        "medical_history": "History of hypertension",
        "medical_files_url": ["url1", "url2"],
        "current_medication": ["Medicine1", "Medicine2"],
        "physician_name": "Dr. Smith",
        "physician_contact_number": "1122334455",
        "special_needs": "Regular blood pressure monitoring",
        "insurance_details": "Insurance info here"
    },
    "dietData": {
        "dietary_preference": "Vegetarian",
        "food_category": "Non-Spicy",
        "food_texture": "Soft",
        "food_allergies": ["Peanuts", "Shellfish"]
    },
    "financialData": {
        "payment_preference": "Sponsored",
        "account_number": "ACC123456",
        "payment_details": "Monthly payment via bank transfer"
    }
}
```

### GET /residents
Get all residents.
- **Access**: Public
- **Query Parameters**:
  - `limit`: Number of records (default: 10)
  - `page`: Page number (default: 1)

### GET /residents/:id
Get single resident with all related information.
- **Access**: Public
- **URL Parameters**:
  - `id`: Resident ID

### PUT /residents/:id
Update resident information.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Resident ID
- **Request Body**: Same as POST /residents

### DELETE /residents/:id
Delete resident and all related information.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Resident ID

## Room Routes
### POST /rooms
Create a new room.
- **Access**: Admin only
- **Request Body**:
```json
{
    "room_number": "101",
    "room_type": "single",
    "special_facilities": ["Wheelchair Access", "Emergency Bell"]
}
```

### GET /rooms
Get all rooms.
- **Access**: Public

### GET /rooms/:room_number
Get single room.
- **Access**: Public
- **URL Parameters**:
  - `room_number`: Room number

### PUT /rooms/:room_number
Update room information.
- **Access**: Admin only
- **URL Parameters**:
  - `room_number`: Room number
- **Request Body**: Same as POST /rooms

### DELETE /rooms/:room_number
Delete room (only if unoccupied).
- **Access**: Admin only
- **URL Parameters**:
  - `room_number`: Room number

## Guardian Routes
### POST /guardians
Create a new guardian.
- **Access**: Admin only
- **Request Body**:
```json
{
    "resident_id": "resident_id",
    "name": "Jane Doe",
    "relationship": "Daughter",
    "contact_number": "1234567890",
    "address": "123 Main St"
}
```

### GET /guardians
Get all guardians.
- **Access**: Public

### GET /guardians/:id
Get single guardian.
- **Access**: Public
- **URL Parameters**:
  - `id`: Guardian ID

### PUT /guardians/:id
Update guardian information.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Guardian ID
- **Request Body**: Same as POST /guardians

### DELETE /guardians/:id
Delete guardian.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Guardian ID

## Medical Record Routes
### POST /medical-records
Create a new medical record.
- **Access**: Admin only
- **Request Body**:
```json
{
    "resident_id": "resident_id",
    "medical_history": "History of hypertension",
    "medical_files_url": ["url1", "url2"],
    "current_medication": ["Medicine1", "Medicine2"],
    "physician_name": "Dr. Smith",
    "physician_contact_number": "1234567890",
    "special_needs": "Regular monitoring",
    "insurance_details": "Insurance info"
}
```

### GET /medical-records
Get all medical records.
- **Access**: Public

### GET /medical-records/:id
Get single medical record.
- **Access**: Public
- **URL Parameters**:
  - `id`: Medical record ID

### PUT /medical-records/:id
Update medical record.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Medical record ID
- **Request Body**: Same as POST /medical-records

### DELETE /medical-records/:id
Delete medical record.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Medical record ID

## Diet Routes
### POST /diets
Create a new diet plan.
- **Access**: Admin only
- **Request Body**:
```json
{
    "resident_id": "resident_id",
    "dietary_preference": "Vegetarian",
    "food_category": "Non-Spicy",
    "food_texture": "Soft",
    "food_allergies": ["Peanuts", "Shellfish"]
}
```

### GET /diets
Get all diet plans.
- **Access**: Public

### GET /diets/:id
Get single diet plan.
- **Access**: Public
- **URL Parameters**:
  - `id`: Diet plan ID

### PUT /diets/:id
Update diet plan.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Diet plan ID
- **Request Body**: Same as POST /diets

### DELETE /diets/:id
Delete diet plan.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Diet plan ID

## Financial Record Routes
### POST /financial-records
Create a new financial record.
- **Access**: Admin only
- **Request Body**:
```json
{
    "resident_id": "resident_id",
    "payment_preference": "Sponsored",
    "account_number": "ACC123456",
    "payment_details": "Monthly payment via bank transfer"
}
```

### GET /financial-records
Get all financial records.
- **Access**: Public

### GET /financial-records/:id
Get single financial record.
- **Access**: Public
- **URL Parameters**:
  - `id`: Financial record ID

### PUT /financial-records/:id
Update financial record.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Financial record ID
- **Request Body**: Same as POST /financial-records

### DELETE /financial-records/:id
Delete financial record.
- **Access**: Admin only
- **URL Parameters**:
  - `id`: Financial record ID

## Error Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Testing with Postman
1. Import the Postman collection (available in the `/documentation` folder)
2. Set up environment variables:
   - `BASE_URL`: Your API base URL
   - `TOKEN`: Your authentication token after login
3. Use the collection to test all endpoints
