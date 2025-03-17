import unittest
from routes.app import create_app
import json

class TestIrisAPI(unittest.TestCase):
    def setUp(self):
        self.app = create_app().test_client()
        self.app.testing = True
        self.test_users = {
            'diane-insua-virginica@gmail.com': {'password': 'Test12345', 'role': 'virginica-user'},
            'diane-insua-setosa@gmail.com': {'password': 'Test12345', 'role': 'setosa-user'},
            'diane-insua-admin@gmail.com': {'password': 'Test12345', 'role': 'admin'}
        }

    def test_login_success(self):
        """Test successful login for all user roles"""
        for username, user_data in self.test_users.items():
            response = self.app.post('/login',
                                   json={'username': username, 'password': user_data['password']})
            self.assertEqual(response.status_code, 200)
            self.assertIn('access_token', json.loads(response.data))

    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = self.app.post('/login',
                               json={'username': 'invalid@email.com', 'password': 'wrongpass'})
        self.assertEqual(response.status_code, 401)

    def test_protected_route_without_token(self):
        """Test accessing protected route without token"""
        response = self.app.get('/iris')
        self.assertEqual(response.status_code, 401)

    def test_role_based_access(self):
        """Test role-based access to iris data"""
        # Login as virginica user
        virginica_response = self.app.post('/login',
                                         json={'username': 'diane-insua-virginica@gmail.com',
                                              'password': 'Test12345'})
        virginica_token = json.loads(virginica_response.data)['access_token']
        
        # Get iris data as virginica user
        virginica_data = self.app.get('/iris',
                                    headers={'Authorization': f'Bearer {virginica_token}'})
        virginica_data = json.loads(virginica_data.data)
        
        # Verify virginica user only sees virginica data
        for item in virginica_data:
            self.assertEqual(item['variety'], 'Iris-virginica')

        # Login as setosa user
        setosa_response = self.app.post('/login',
                                      json={'username': 'diane-insua-setosa@gmail.com',
                                           'password': 'Test12345'})
        setosa_token = json.loads(setosa_response.data)['access_token']
        
        # Get iris data as setosa user
        setosa_data = self.app.get('/iris',
                                 headers={'Authorization': f'Bearer {setosa_token}'})
        setosa_data = json.loads(setosa_data.data)
        
        # Verify setosa user only sees setosa data
        for item in setosa_data:
            self.assertEqual(item['variety'], 'Iris-setosa')

        # Login as admin
        admin_response = self.app.post('/login',
                                     json={'username': 'diane-insua-admin@gmail.com',
                                          'password': 'Test12345'})
        admin_token = json.loads(admin_response.data)['access_token']
        
        # Get iris data as admin
        admin_data = self.app.get('/iris',
                                headers={'Authorization': f'Bearer {admin_token}'})
        admin_data = json.loads(admin_data.data)
        
        # Verify admin sees all data
        varieties = set(item['variety'] for item in admin_data)
        self.assertEqual(len(varieties), 3)  # Should see all three varieties

    def test_logout(self):
        """Test token invalidation after logout"""
        # Login
        login_response = self.app.post('/login',
                                     json={'username': 'diane-insua-admin@gmail.com',
                                          'password': 'Test12345'})
        token = json.loads(login_response.data)['access_token']
        
        # Access protected route
        response = self.app.get('/iris',
                              headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 200)
        
        # Logout
        logout_response = self.app.post('/logout',
                                      headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(logout_response.status_code, 200)
        
        # Try to access protected route with same token
        response = self.app.get('/iris',
                              headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main() 