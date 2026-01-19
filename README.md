# LocalLink Frontend

> A modern React-based frontend for the LocalLink local services marketplace.

[![React](https://img.shields.io/badge/React-18-blue?style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan?style=flat-square)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

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
│   │   │   ├── Dashboard.jsx  # User dashboard
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

> **Note**: The `locallink-frontend/` folder is deprecated and will be removed. All active development is in `client/`.

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Environment Configuration

The frontend proxies API requests to the backend. Configure in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5555',
    '/categories': 'http://localhost:5555',
    '/services': 'http://localhost:5555',
    // ... other endpoints
  }
}
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

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@locallink.com | admin123 |
| Client | client0@example.com | password123 |
| Provider | provider0@example.com | password123 |

## Running as a Service

The frontend can run as a systemd service for production:

```bash
sudo systemctl start locallink-frontend
sudo systemctl enable locallink-frontend
```

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
