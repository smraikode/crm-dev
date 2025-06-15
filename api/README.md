# Backend

This project is a FastAPI application that provides user authentication using Cloud Firestore as the database. It includes endpoints for user signup and login, ensuring secure handling of user credentials.

## Project Structure

```
api
├── src
│   ├── main.py               # Entry point of the FastAPI application
│   ├── models
│   │   └── user.py           # Pydantic model for user data
│   ├── routes
│   │   ├── auth.py           # Authentication routes for signup and login
│   │   └── __init__.py       # Initializes the routes package
│   ├── services
│   │   └── firestore_service.py # Functions for interacting with Cloud Firestore
│   └── utils
│       └── security.py       # Utility functions for password hashing and verification
├── requirements.txt           # Project dependencies
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd api
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up Firebase:**
   - Create a Firebase project and enable Firestore.
   - Obtain the service account key and set it up in your environment.

5. **Run the application:**
   ```
   uvicorn src.main:app --reload
   ```

## API Usage

### Signup

- **Endpoint:** `POST /api/signup`
- **Request Body:**
   ```json
   {
      "name": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "username": "johndoe",
      "password": "securepassword",
      "role": "user"
   }
   ```

### Login

- **Endpoint:** `POST /api/login`
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.