// src/components/AdminDashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admindash.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users'); // Default to 'users' tab
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch all data when the component mounts
    useEffect(() => {
        fetchAllData();
    }, []);

    // Fetch all required data
    const fetchAllData = async () => {
        try {
            const [usersResponse, propertiesResponse, bookingsResponse] = await Promise.all([
                axios.get('http://localhost:3000/users'),
                axios.get('http://localhost:3000/properties'),
                axios.get('http://localhost:3000/bookings')
            ]);

            setUsers(usersResponse.data);
            setProperties(propertiesResponse.data);
            setBookings(bookingsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        }
    };

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/signin');
    };

    // Toggle user grant status
    const toggleGrant = async (userId) => {
        const userToUpdate = users.find(u => u.id === userId);
        if (!userToUpdate) return; // Exit if user is not found

        const updatedUser = { ...userToUpdate, granted: !userToUpdate.granted };

        // Optimistically update the local state
        setUsers(prevUsers => 
            prevUsers.map(u => (u.id === userId ? updatedUser : u))
        );

        try {
            await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
        } catch (error) {
            console.error('Error toggling grant status:', error);
            // Revert the optimistic update if the request fails
            setUsers(prevUsers => 
                prevUsers.map(u => (u.id === userId ? userToUpdate : u))
            );
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-greeting">
                    <span>Hi Admin! |</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-header">
                <button 
                    onClick={() => setActiveTab('users')} 
                    className={activeTab === 'users' ? 'active' : ''}
                >
                    Users
                </button>
                <button 
                    onClick={() => setActiveTab('properties')} 
                    className={activeTab === 'properties' ? 'active' : ''}
                >
                    Properties
                </button>
                <button 
                    onClick={() => setActiveTab('bookings')} 
                    className={activeTab === 'bookings' ? 'active' : ''}
                >
                    Bookings
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Tab Content */}
            <div className="tab-content">
                {/* Users Tab */}
                {activeTab === 'users' && (
                    <section className="user-management">
                        <h2>All Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Granted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.type}</td>
                                        <td>{user.type === 'Owner' ? (user.granted ? 'Granted' : 'Ungranted') : ''}</td>
                                        <td>
                                            {user.type === 'Owner' && (
                                                <button 
                                                    onClick={() => toggleGrant(user.id)}
                                                    className="grant-button"
                                                >
                                                    {user.granted ? 'Revoke Grant' : 'Grant'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {/* Properties Tab */}
                {activeTab === 'properties' && (
                    <section className="property-management">
                        <h2>All Properties</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Property ID</th>
                                    <th>Owner ID</th>
                                    <th>Property Type</th>
                                    <th>Property Add Type</th>
                                    <th>Property Address</th>
                                    <th>Owner Contact</th>
                                    <th>Property Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map(property => (
                                    <tr key={property.id}>
                                        <td>{property.id}</td>
                                        <td>{property.ownerId}</td>
                                        <td>{property.propertyType}</td>
                                        <td>{property.propertyAddType}</td>
                                        <td>{property.address}</td>
                                        <td>{property.ownerContact}</td>
                                        <td>${property.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <section className="booking-management">
                        <h2>All Bookings</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Owner ID</th>
                                    <th>Property ID</th>
                                    <th>Tenant ID</th>
                                    <th>Tenant Name</th>
                                    <th>Tenant Contact</th>
                                    <th>Booking Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.ownerId}</td>
                                        <td>{booking.PropertyID}</td>
                                        <td>{booking.tenantId}</td>
                                        <td>{booking.tenantName}</td>
                                        <td>{booking.tenantContact}</td>
                                        <td>{booking.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
