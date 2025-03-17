# Flask JSON API with User Authentication

This is a Flask application that provides a JSON API with user authentication and filtered data per user.

## Setup

1. Create a .env file:

```bash
cp .env.template .env
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables (optional):

```bash
export SECRET_KEY='your-secret-key'
export JWT_SECRET_KEY='your-jwt-secret-key'
```

5. Run the application:

```bash
python app.py
```

## API Endpoints

### Authentication

#### Login

- **POST** `/login`
- Body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

- Returns a JWT access token

### Iris (Protected Routes)

#### Get user's items

- **GET** `/iris`
- Requires JWT token in Authorization header
- Returns list of items belonging to the authenticated user:

```json
[
  {
    "petal.length": 6,
    "petal.width": 2.5,
    "sepal.length": 6.3,
    "sepal.width": 3.3,
    "variety": "Iris-virginica"
  },
  {
    "petal.length": 5.1,
    "petal.width": 1.9,
    "sepal.length": 5.8,
    "sepal.width": 2.7,
    "variety": "Iris-virginica"
  }
]
```

## Running Tests

To run the test suite:

```bash
python -m unittest test_app.py
```

The test suite includes:

- Login functionality tests
- Protected route access tests
- Role-based access control tests
- Logout functionality tests

Make sure your virtual environment is activated and all dependencies are installed before running the tests.
