# LocalLink Frontend

A modern React application for the LocalLink local services marketplace, built with Vite and shadcn/ui.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-black)

## Features

- **Modern UI** - Beautiful, responsive design with shadcn/ui components
- **Service Marketplace** - Browse and search local services by category
- **Booking System** - Book services with form validation (Formik + Yup)
- **Admin Dashboard** - Manage services, categories, and bookings
- **Real-time Search** - Filter services by name and category

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM 7
- **Forms**: Formik + Yup validation

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero and category grid |
| `/marketplace` | Browse all services with search/filter |
| `/services/:id` | Service detail page |
| `/book/:id` | Booking form |
| `/admin` | Admin dashboard |
| `/admin/services/new` | Add new service |
| `/admin/categories/new` | Add new category |

## Installation

### Prerequisites
- Node.js 20+
- npm

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

The app runs on `http://localhost:3000`

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Marketplace.jsx
│   │   ├── ServiceDetail.jsx
│   │   ├── BookingForm.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminServiceForm.jsx
│   │   └── AdminCategoryForm.jsx
│   ├── lib/
│   │   └── utils.js      # shadcn utilities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # Tailwind + custom styles
├── index.html
├── vite.config.js
├── components.json       # shadcn configuration
└── package.json
```

## API Proxy

The Vite dev server proxies API requests to the Flask backend at `http://127.0.0.1:5555`:
- `/services` → Backend API
- `/categories` → Backend API
- `/bookings` → Backend API
- `/users` → Backend API

## Running as a Service

```bash
sudo systemctl start locallink-frontend
sudo systemctl enable locallink-frontend
```

## Live Demo

**URL**: https://locallink.dpdns.org

## Authors

LocalLink Team - School Project 2026
