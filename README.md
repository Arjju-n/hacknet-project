# Smart Campus Auditorium Booking System

A comprehensive venue booking system for educational institutions built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🎓 Multi-Role Support
- **Students**: Book venues for club activities, events, and study sessions
- **Faculty**: Priority booking with enhanced privileges for academic activities
- **Administrators**: Full system management with approval workflows

### 🏢 Venue Management
- Real-time availability checking
- Comprehensive venue information (capacity, equipment, type)
- Conflict detection and resolution
- Equipment and facility tracking

### 📅 Smart Booking System
- Intuitive booking interface
- Automated approval workflows
- Priority booking for faculty
- Document upload support
- Booking history and tracking

### 🔐 Security & Authentication
- Role-based access control (RBAC)
- Secure authentication with Supabase Auth
- Row-level security policies
- Data validation and sanitization

### 📊 Analytics & Reporting
- Booking statistics and trends
- Venue utilization reports
- User activity tracking
- System performance metrics

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify/Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`
   ```bash
   cp .env.example .env
   ```
   - Fill in your Supabase credentials

4. **Run database migrations**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the migration file: `supabase/migrations/create_booking_system_schema.sql`

5. **Set up Storage (Optional)**
   - Create a storage bucket named `booking-documents`
   - Configure appropriate policies for file uploads

6. **Start the development server**
   ```bash
   npm run dev
   ```

## Database Schema

### Tables

#### `profiles`
User profile information extending Supabase auth
- Links to `auth.users`
- Stores role, department, and additional user data

#### `venues`
Available venues for booking
- Name, type, capacity, equipment
- Availability status and descriptions

#### `bookings`
Venue booking requests and approvals
- Links users to venues
- Tracks status, priority, and approval workflow
- Includes conflict detection

#### `booking_documents`
Supporting documents for bookings
- File storage integration
- Links to specific bookings

### Security

The system implements comprehensive Row Level Security (RLS) policies:

- **Students**: Can only access their own bookings and profiles
- **Faculty**: Enhanced privileges with priority booking access
- **Administrators**: Full system access for management

## API Structure

### Authentication
- `signUp()` - User registration with profile creation
- `signIn()` - User authentication
- `signOut()` - Session termination
- `getCurrentUser()` - Get current authenticated user
- `getCurrentProfile()` - Get current user's profile

### Bookings
- `createBooking()` - Submit new booking request
- `getUserBookings()` - Get user's booking history
- `getPendingBookings()` - Get pending approvals (admin/faculty)
- `approveBooking()` - Approve booking request
- `rejectBooking()` - Reject booking with reason

### Venues
- `getVenues()` - Get all venues
- `getAvailableVenues()` - Get available venues only
- `checkVenueAvailability()` - Check for booking conflicts
- `createVenue()` - Add new venue (admin only)

### Documents
- `uploadBookingDocument()` - Upload supporting documents
- `getBookingDocuments()` - Get documents for a booking
- `downloadDocument()` - Download document file

## Usage Examples

### Creating a Booking
```typescript
import { createBooking } from './lib/api/bookings';

const booking = await createBooking({
  venue_id: 'venue-uuid',
  event_name: 'Tech Club Meeting',
  description: 'Weekly tech club gathering',
  event_type: 'club-activity',
  start_date: '2025-01-20',
  start_time: '14:00',
  end_time: '16:00',
  expected_attendees: 25,
  priority: false
});
```

### Checking Venue Availability
```typescript
import { checkVenueAvailability } from './lib/api/venues';

const isAvailable = await checkVenueAvailability(
  'venue-uuid',
  '2025-01-20',
  '14:00',
  '16:00'
);
```

### Using React Hooks
```typescript
import { useBookings, useVenues, useAuth } from './hooks';

function BookingDashboard() {
  const { user, profile, isAdmin } = useAuth();
  const { bookings, loading } = useBookings('user');
  const { venues } = useVenues(true); // available only
  
  // Component logic here
}
```

## Deployment

### Environment Variables
Ensure these environment variables are set in your deployment platform:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The built files in the `dist` directory can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the database schema and API structure

## Roadmap

- [ ] Mobile app development
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-campus support
- [ ] Integration with existing campus systems