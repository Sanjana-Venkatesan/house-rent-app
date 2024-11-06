import React, { useState, useEffect } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users'); // Make sure the JSON server is running
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error loading user data. Please try again.');
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 3000); // Error will disappear after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
    
        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
    
        // Check credentials against user data
        const user = users.find(user => 
            user.email === email && user.password === password
        );
    
        if (user) {
            // Store user info in localStorage
            localStorage.setItem('token', 'dummy-token'); // You can use a dummy token
            localStorage.setItem('userType', user.type);
            localStorage.setItem('userId', user.id);
    
            // Clear form
            setEmail('');
            setPassword('');
    
            // Redirect based on user type
            if (user.type === 'Owner') {
                navigate('/owner-dashboard'); // Adjust the route as needed
            } else if (user.type === 'Renter') {
                navigate('/renter-dashboard'); // Adjust the route as needed
            } else if (user.type === 'Admin') {
                navigate('/admin-dashboard'); // Adjust the route as needed
            }
        } else {
            setError('Invalid email or password');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="sin-input-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={email ? 'filled' : ''}
                        />
                        <label htmlFor="email" className={email ? 'filled' : ''}>
                            Email Address
                        </label>
                    </div>
                    <div className="sin-input-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={password ? 'filled' : ''}
                        />
                        <label htmlFor="password" className={password ? 'filled' : ''}>
                            Password
                        </label>
                    </div>
                    <button type="submit" className='sin-button'>Sign In</button>
                </form>
                <div className="sin-footer">
                    <p>
                        <a href="/forgot-password">Forgot password?</a>
                    </p>
                    <p>
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;