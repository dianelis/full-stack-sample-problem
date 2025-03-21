from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from routes.auth import auth_bp, jwt
from routes.iris import iris_bp
from datetime import timedelta

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Enable CORS
    CORS(app, resources={
        r"/*": {
            "origins": "*",  # In production, replace with specific origins
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Configuration from environment variables
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    
    # Validate required environment variables
    if not app.config['SECRET_KEY'] or not app.config['JWT_SECRET_KEY']:
        raise ValueError("Missing required environment variables. Please check your .env file.")
    
    # Initialize JWT
    jwt.init_app(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(iris_bp)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True) 