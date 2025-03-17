from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create blueprint
auth_bp = Blueprint('auth', __name__)

# Initialize JWT
jwt = JWTManager()

# In-memory storage with pre-created users
users = {
    'diane-insua-virginica@gmail.com': {
        'password': 'Test12345',
        'role': 'virginica-user'
    },
    'diane-insua-setosa@gmail.com': {
        'password': 'Test12345',
        'role': 'setosa-user'
    },
    'diane-insua-admin@gmail.com': {
        'password': 'Test12345',
        'role': 'admin'
    }
}

# Token blacklist to store invalidated tokens
token_blacklist = set()

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in token_blacklist

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('username')
    password = data.get('password')

    # Check if email and password are valid
    if email not in users or users[email]['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Include role in the token
    user_data = {
        'username': email,
        'role': users[email]['role']
    }
    access_token = create_access_token(identity=user_data)
    return jsonify({'access_token': access_token}), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    token_blacklist.add(jti)
    return jsonify({'message': 'Successfully logged out'}), 200 