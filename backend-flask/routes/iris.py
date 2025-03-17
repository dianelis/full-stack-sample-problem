from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

# Create blueprint
iris_bp = Blueprint('iris', __name__)

def load_iris_data():
    with open('iris_data.json', 'r') as f:
        return json.load(f)['iris']

@iris_bp.route('/iris', methods=['GET'])
@jwt_required()
def get_iris():
    current_user = get_jwt_identity()
    user_role = current_user['role']
    
    # Load iris data
    iris_data = load_iris_data()
    
    # Filter based on user role
    if user_role == 'admin':
        return jsonify(iris_data)
    elif user_role == 'setosa-user':
        filtered_data = [item for item in iris_data if item['variety'] == 'Iris-setosa']
        return jsonify(filtered_data)
    elif user_role == 'virginica-user':
        filtered_data = [item for item in iris_data if item['variety'] == 'Iris-virginica']
        return jsonify(filtered_data)
    else:
        return jsonify({'error': 'Unauthorized'}), 403 