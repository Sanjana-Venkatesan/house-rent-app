import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ownerdash.css';

function OwnerDashboard() {
    const [activeTab, setActiveTab] = useState('addProperty');
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [canAddProperty, setCanAddProperty] = useState(false);

    const [newProperty, setNewProperty] = useState({
        propertyType: '',
        propertyAddType: '',
        address: '',
        images: '',
        contactNumber: '',
        amount: '',
        additionalDetails: '',
        availability:''
    });


    const navigate = useNavigate();



    useEffect(() => {
        fetchData();
        checkUserPermission(); // Removed the space in the function name
    }, []);

    const fetchData = async () => {
        try {
            const ownerId = localStorage.getItem('userId');
            const [propertiesResponse, bookingsResponse] = await Promise.all([
                axios.get(`http://localhost:3000/properties?ownerId=${ownerId}`),
                axios.get(`http://localhost:3000/bookings?ownerId=${ownerId}`)
            ]);

            setProperties(propertiesResponse.data);
            setBookings(bookingsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        }
    };

    const checkUserPermission = async () => {
        try {
            const ownerId = localStorage.getItem('userId');
            const userResponse = await axios.get(`http://localhost:3000/users/${ownerId}`);
            const user = userResponse.data;

            if (user.type === 'Owner' && user.granted) {
                setCanAddProperty(true);
            } else {
                setCanAddProperty(false);
            }
        } catch (error) {
            console.error('Error checking user permission:', error);
            setError('Failed to check permission. Please try again later.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        navigate('/signin');
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        try {
            const ownerId = localStorage.getItem('userId');
            const response = await axios.post('http://localhost:3000/properties', {
                ...newProperty,
                ownerId,
                availability:true,
            });
            setProperties([...properties, response.data]);
            setNewProperty({ propertyType: '', propertyAddType: '', address: '', images: '', contactNumber: '', amount: '', additionalDetails: '' });
            setActiveTab('allProperties');
        } catch (error) {
            console.error('Error adding property:', error);
            setError('Failed to add property. Please try again.');
        }
    };


    return (
        <div className="owner-dashboard">
            <div className="dashboard-header">
                <h1>Owner Dashboard</h1>
                <div className="owner-greeting">
                    <span>Welcome Owner</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div>

            <div className="tab-header">
                <button onClick={() => setActiveTab('addProperty')} className={activeTab === 'addProperty' ? 'active' : ''}>
                    Add Property
                </button>
                <button onClick={() => setActiveTab('allProperties')} className={activeTab === 'allProperties' ? 'active' : ''}>
                    All Properties
                </button>
                <button onClick={() => setActiveTab('allBookings')} className={activeTab === 'allBookings' ? 'active' : ''}>
                    All Bookings
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="tab-content">
                {activeTab === 'addProperty' && (
                    <div className="form-center-container"> 
                    <form onSubmit={handleAddProperty} className="add-property-form">
                        {canAddProperty ? (
                            <div className='add-prop'>
                            <span className='property-span'>
                                <div className="form-group">
                                    <label htmlFor="propertyType">Property Type</label>
                                    <select
                                        id="propertyType"
                                        value={newProperty.propertyType}
                                        onChange={(e) => setNewProperty({ ...newProperty, propertyType: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select Property Type</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="House">House</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Commercial">Commercial</option>
                                        {/* Add more property types as needed */}
                                    </select>
                                </div>
                        
                                <div className="form-group">
                                    <label htmlFor="propertyAddType">Property Add Type</label>
                                    <select
                                        id="propertyAddType"
                                        value={newProperty.propertyAddType}
                                        onChange={(e) => setNewProperty({ ...newProperty, propertyAddType: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select Property Add Type</option>
                                        <option value="New">New</option>
                                        <option value="Resale">Resale</option>
                                        {/* Add more addition types as needed */}
                                    </select>
                                </div>
                        
                                <div className="form-group">
                                    <label htmlFor="address">Full Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        placeholder="Full Address"
                                        value={newProperty.address}
                                        onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                                        required
                                        className='address'
                                    />
                                </div>
                            </span>
                        
                            <div className="form-group">
                                <label htmlFor="images">Image URL(s) (comma separated) or Upload Images</label>
                                <input
                                    type="text"
                                    id="images"
                                    placeholder="Image URL(s) (comma separated) or Upload Images"
                                    value={newProperty.images}
                                    onChange={(e) => setNewProperty({ ...newProperty, images: e.target.value })}
                                />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="contactNumber">Owner Contact Number</label>
                                <input
                                    type="text"
                                    id="contactNumber"
                                    placeholder="Owner Contact Number"
                                    value={newProperty.contactNumber}
                                    onChange={(e) => setNewProperty({ ...newProperty, contactNumber: e.target.value })}
                                    required
                                />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    id="amount"
                                    placeholder="Amount"
                                    value={newProperty.amount}
                                    onChange={(e) => setNewProperty({ ...newProperty, amount: e.target.value })}
                                    required
                                />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="additionalDetails">Additional Details</label>
                                <textarea
                                    id="additionalDetails"
                                    placeholder="Additional Details"
                                    value={newProperty.additionalDetails}
                                    onChange={(e) => setNewProperty({ ...newProperty, additionalDetails: e.target.value })}
                                />
                            </div>
                        
                            <button type="submit">Add Property</button>
                        </div>
                        ) : (
                            <p>You do not have permission to add properties.</p>
                        )}
                    </form>
                    </div>
                )}
                {activeTab === 'allProperties' && (
    <table className="properties-table">
        <thead>
            <tr>
                <th>Property ID</th>
                <th>Property Type</th>
                <th>Add Type</th>
                <th>Address</th>
                <th>Owner Contact</th>
                <th>Amount</th>
                <th>Availability</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {properties.map(property => (
                <tr key={property.id}>
                    <td>{property.id}</td>
                    <td>{property.propertyType}</td>
                    <td>{property.propertyAddType}</td>
                    <td>{property.address}</td>
                    <td>{property.contactNumber}</td>
                    <td>${property.amount}</td>
                    <td>{property.availability}</td>
                    <td>
                        <button onClick={() => handleEdit(property.id)}>Edit</button>
                        <button onClick={() => handleDelete(property.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)}
                {activeTab === 'allBookings' && (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Property ID</th>
                                <th>Tenant Name</th>
                                <th>Tenant Phone</th>
                                <th>Booking Status</th>
                                <th>Actions</th>
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
                                    <td>{booking.Action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
    
}

export default OwnerDashboard;
