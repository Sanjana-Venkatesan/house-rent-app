import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './renterdash.css';

function RenterDashboard() {
    const [activeTab, setActiveTab] = useState('allProperties');
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        fetchUserName();
    }, []);

    const fetchData = async () => {
        try {
            const [propertiesResponse, bookingsResponse] = await Promise.all([
                axios.get('http://localhost:3000/properties'),
                axios.get(`http://localhost:3000/bookings?tenantId=${localStorage.getItem('userId')}`)
            ]);
            setProperties(propertiesResponse.data);
            setBookings(bookingsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        }
    };

    const fetchUserName = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            setUserName(response.data.username);
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        navigate('/signin');
    };

    return (
        <div className="renter-dashboard">
            {/* Header Section */}
            <div className="dashboard-header">
                <h1>Renter Dashboard</h1>
                <div className="renter-greeting">
                    <span>Hi, {userName}!</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-header">
                <button 
                    onClick={() => setActiveTab('allProperties')} 
                    className={activeTab === 'allProperties' ? 'active' : ''}
                >
                    All Properties
                </button>
                <button 
                    onClick={() => setActiveTab('bookingHistory')} 
                    className={activeTab === 'bookingHistory' ? 'active' : ''}
                >
                    Booking History
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Tab Content */}
            <div className="tab-content">
                {/* All Properties Tab */}
                {activeTab === 'allProperties' && (
                    <div className="card-container">
                        {properties.map(property => (
                            <div key={property.id} className="card">
                                <img src={property.images} alt="Property" />
                                <p><strong>Location:</strong></p>
                                <p>{property.address}</p>
                                <p><strong>Property Type:</strong></p>
                                <p>{property.propertyType}</p>
                                <p><strong>Property Add Type:</strong></p>
                                <p>{property.propertyAddType}</p>
                                <p><strong>Amount:</strong></p>
                                <p>${property.amount}</p>
                                <button onClick={() => handleBooking(property.id)}>Book Property</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Booking History Tab */}
                {activeTab === 'bookingHistory' && (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Property ID</th>
                                <th>Tenant Name</th>
                                <th>Tenant Phone</th>
                                <th>Booking Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.PropertyID}</td>
                                    <td>{booking.tenantName}</td>
                                    <td>{booking.tenantPhone}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default RenterDashboard;