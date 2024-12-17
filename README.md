# Rent Management App (only frontend)

This is a Rent Management web app built with React, featuring routing and role-based dashboards. The app allows different users (Admin, Owner, and Renter) to access personalized dashboards. Additionally, users can sign up, sign in, and explore the home page and hero section.

## Features

- **Admin Dashboard**: Admins can manage owners, renters, and properties.
- **Owner Dashboard**: Owners can view and manage their properties and bookings.
- **Renter Dashboard**: Renters can view properties and manage their bookings.
- **Sign Up / Sign In**: Users can register and log in to access their respective dashboards.
- **Home Page**: The landing page features a hero section and additional information about the app.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: Used for navigation and rendering different views based on the URL path.
- **CSS**: Basic styling for the app.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rent-management-app.git
```

### 2. Install Dependencies

Navigate to the project folder and install the required dependencies:

```bash
cd rent-management-app
npm install
```

### 3. Start the Development Server

Run the following command to start the app:

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`.

## Directory Structure

```
src/
├── components/
│   ├── AdminDash/
│   │   └── AdminDashboard.js
│   ├── Header/
│   │   └── Header.js
│   ├── Home/
│   │   └── Home.js
│   ├── HeroSectionDetails/
│   │   └── Hero.js
│   ├── RenterDash/
│   │   └── RenterDashboard.js
│   ├── OwnerDash/
│   │   └── OwnerDashboard.js
│   ├── SignIn/
│   │   └── SignIn.js
│   └── SignUp/
│       └── SignUp.js
└── App.js
```

## Routes

- **`/admin-dashboard`**: Admin dashboard.
- **`/owner-dashboard`**: Owner dashboard.
- **`/renter-dashboard`**: Renter dashboard.
- **`/signin`**: Sign-in page for existing users.
- **`/signup`**: Sign-up page for new users.
- **`/` (Home)**: The landing page with the Hero Section.

## How to Use

1. **Sign Up / Sign In**: 
   - New users can sign up using the **Sign Up** page.
   - Existing users can sign in via the **Sign In** page.

2. **Role-based Dashboards**: 
   - After logging in, users are redirected to their respective dashboard:
     - **Admin Dashboard**: Manage owners, renters, and properties.
     - **Owner Dashboard**: Manage properties and bookings.
     - **Renter Dashboard**: Browse and manage property bookings.

3. **Home Page**: 
   - The home page showcases a hero section and key app features.

## License

This project is licensed under the MIT License.

---

Feel free to modify or extend this `README` as per your app’s details and requirements!
