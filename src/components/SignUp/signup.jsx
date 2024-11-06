import React, { useState } from 'react';
import './signup.css'; // You'll need to create this CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [uname,setUname]=useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword || !uname) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        const userData = {
            username: uname,
            email: email,
            password: password,
            type: document.getElementById("userType").value 
        };
    
        try {
            const response = await axios.post('http://localhost:3000/users', userData);
            console.log('Success:', response.data);
            // Clear form and errors after successful signup
            setSuccess(true);
            setError('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setUname('');
            setError('');
            // You might want to redirect the user or show a success message here
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to sign up');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Signup successful! Redirecting to sign in...</p>}
                <form onSubmit={handleSubmit}>
                <div className="sup-input-group">
                        <input
                            type="uname"
                            id="uname"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                            className={uname ? 'filled' : ''}
                        />
                        <label htmlFor="uname" className={uname ? 'filled' : ''}>
                            User Name
                        </label>
                    </div> 
                    <div className="sup-input-group">
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
                    <div className="sup-input-group">
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
                    <div className="sup-input-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={confirmPassword ? 'filled' : ''}
                        />
                        <label htmlFor="confirmPassword" className={confirmPassword ? 'filled' : ''}>
                            Confirm Password
                        </label>
                    </div>
                    <div class="sup-input-group">
                   <select id="userType" required>
                    <option value="" disabled selected>Select User Type</option>
                    <option value="Owner">Owner</option>
                    <option value="Renter">Renter</option>
                    <option value="Admin">Admin</option>
                   </select>
                 </div>
                    <button type="submit" className='sup-button'>Sign Up</button>
                </form>
                <div className="sup-footer">
                    <p>
                        Already have an account? <a href="/signin">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;