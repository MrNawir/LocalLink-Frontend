# LocalLink Frontend

> A modern React-based frontend for the LocalLink local services marketplace.

[![React](https://img.shields.io/badge/React-18-blue?style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan?style=flat-square)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

## 🔗 Related Repositories

| Repository | Description |
|------------|-------------|
| **[LocalLink-Frontend](https://github.com/MrNawir/LocalLink-Frontend)** | React frontend (this repo) |
| **[LocalLink-Backend](https://github.com/MrNawir/LocalLink-Backend)** | Flask API backend |

## Live Demo

**[View Live App](https://locallink.dpdns.org)**

---

## Contributors

### Frontend Team
| Name | Role |
|------|------|
| Abdimalik Kulow | Frontend Developer |
| Megan Mumbi | Frontend Developer |
| Abdullahi Omar | Frontend Developer |

### Backend Team
| Name | Role |
|------|------|
| Ibrahim Abdu | Backend Developer |
| Esther Nekesa | Backend Developer |
| Julius Mutinda | Backend Developer |

---

## Features

- **Modern UI** - Clean, Airbnb-inspired design with TailwindCSS
- **User Authentication** - JWT-based login/signup with role-based access
- **Service Marketplace** - Browse, search, and filter local services
- **Booking System** - Book services with authenticated users only
- **User Dashboard** - Manage bookings, cancel, and request reschedules
- **Provider Dashboard** - View upcoming gigs, confirm jobs, mark as completed
- **Admin Dashboard** - Full management of users, bookings, services, and categories
- **Responsive Design** - Mobile-first approach for all screen sizes

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React Context API
- **Form Handling**: Formik + Yup validation
- **HTTP Client**: Fetch API

---

## 🚀 Quick Start for Examiners

> **Complete setup in under 5 minutes!**

### Prerequisites

- **Node.js 18+** (check with `node --version`)
- **npm** (comes with Node.js)
- **Python 3.8+** (for backend)

### Step 1: Clone & Setup Backend First

```bash
# Create project folder
mkdir LocalLink && cd LocalLink

# Clone and setup backend
git clone https://github.com/MrNawir/LocalLink-Backend.git
cd LocalLink-Backend
git checkout ibrahim/dev

# Install Python dependencies
pip install pipenv
pipenv install
pipenv shell

# Initialize database
python -c "from config import app, db; from models import *; app.app_context().push(); db.create_all()"
python seed.py

# Start backend (keep this terminal running)
python app.py
```

### Step 2: Setup Frontend (New Terminal)

```bash
# Navigate to project folder
cd LocalLink

# Clone frontend
git clone https://github.com/MrNawir/LocalLink-Frontend.git
cd LocalLink-Frontend
git checkout ibrahim/dev

# Install and run
cd client
npm install
npm run dev
```

### Step 3: Open in Browser

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5555

---

## 🔐 Test Accounts

| Role | Email | Password | What to Test |
|------|-------|----------|--------------|
| **Admin** | admin@locallink.com | admin123 | Manage users, services, bookings |
| **Provider** | provider0@example.com | password123 | View gigs, confirm/complete jobs |
| **Client** | client0@example.com | password123 | Browse services, book, manage bookings |

---

## 📱 User Flows to Test

### Client Flow
1. Browse services on `/marketplace`
2. Click on a service → View details
3. Click "Sign In to Book" → Login as client
4. Complete booking form
5. View booking in `/dashboard`
6. Cancel or request reschedule

### Provider Flow
1. Click "Provider Login" in footer
2. Login as provider
3. View upcoming gigs on `/provider`
4. Confirm pending bookings
5. Mark completed jobs as "Done"

### Admin Flow
1. Login as admin → Auto-redirect to `/admin`
2. Switch tabs: Bookings, Users, Services, Categories
3. Change user roles, delete bookings
4. Add/edit services and categories

---

## Project Structure

```
LocalLink-Frontend/
├── client/                    # Main React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui base components
│   │   │   ├── NavBar.jsx     # Navigation bar
│   │   │   ├── Footer.jsx     # Site footer
│   │   │   └── ServiceCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Authentication state management
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Marketplace.jsx # Service listing
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx  # Client dashboard
│   │   │   ├── ProviderDashboard.jsx # Provider dashboard
│   │   │   └── AdminDashboard.jsx
│   │   ├── lib/               # Utility functions
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── package.json           # Dependencies
│   └── vite.config.js         # Vite configuration
└── README.md
```

## Pages & Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Home | Public |
| `/marketplace` | Marketplace | Public |
| `/services/:id` | ServiceDetail | Public |
| `/book/:id` | BookingForm | **Authenticated** |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/dashboard` | Dashboard | **Authenticated** |
| `/admin` | AdminDashboard | **Admin Only** |
| `/admin/services/new` | AdminServiceForm | **Admin Only** |
| `/admin/categories/new` | AdminCategoryForm | **Admin Only** |
| `/provider` | ProviderDashboard | **Provider Only** |

## Authentication Flow

1. User visits service detail page
2. Clicks "Book This Service"
3. If not logged in → redirected to login with return URL
4. After login → redirected back to booking form
5. Booking created with authenticated user's ID

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm install` fails | Ensure Node.js 18+ is installed: `node --version` |
| API requests fail | Make sure backend is running on port 5555 |
| CORS errors | Backend must be running before frontend |
| Login not working | Check backend console for errors, reseed if needed |
| Blank page | Check browser console for JavaScript errors |

## Build for Production

```bash
cd client
npm run build
```

Output will be in `client/dist/` directory.

---

## License

This project is part of a school project for educational purposes.

**LocalLink Team - 2026**
