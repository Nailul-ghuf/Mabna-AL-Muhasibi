# Full Stack Development Plan: Mabna Al Muhasibi

This document details the strategic plan to transform the **Mabna Al Muhasibi** website from a static (Frontend Only) state into a dynamic **Full Stack** application, integrated with the **Supabase** backend, and equipped with an **Admin Dashboard** for content management.

---

## 1. Architecture & Tech Stack
As a professional measure to ensure long-term scalability, security, and manageability, we recommend migrating the frontend to a modern framework.

### Recommended Stack (Professional Tier)
* **Frontend Framework**: **Next.js (App Router)** or **Vite + React**.
* *Reason*: Ease of routing, better SEO (Next.js), robust state management, and seamless integration with Supabase. Component reuse (Header, Footer) becomes easier.
* **Styling**: **Tailwind CSS** (already in use, just needs to be integrated into the framework).

* Backend Services: Supabase (Backend-as-a-Service).
* Database: PostgreSQL (relational data).
* Auth: Secure admin authentication.
* Storage: Storage of activity photos/documentation.
* Deployment: Vercel (Frontend) + Supabase (Backend).

*(Note: If you want to maintain a static HTML format, you can use Supabase via CDN (JavaScript Modules), but the security features and admin routing will be more limited and manual).*

---

## 2. Database Structure (Schema Design)
Based on the current website content, here is the required database table design:

### A. Main Table
1. **`profiles`** / **`admins`**
* `id` (UUID, Primary Key, linked to auth.users)
* `email` (Text)
* `full_name` (Text)
* `role` (Enum: 'superadmin', 'editor')

2. **`programs`** (For the "Featured Programs" section)
* `id` (UUID)
* `title` (Text) - Example: "Taklim Afkar"
* `description` (Text)
* `icon_name` (Text) - Icon name Feather/Lucide
* `order` (Integer) - Display order

3. **`activities`** (For the "Activities" page & Preview on the Homepage)
* `id` (UUID)
* `title` (Text)
* `slug` (Text, Unique) - For detailed URLs (e.g., /kegiatan/kajian-ramadhan)
* `content` (Text/Rich Text)
* `image_url` (Text) - Link to Supabase Storage
* `event_date` (Date)
* `created_at` (Timestamp)

4. **`schedules`** (For the "Schedules" page)
* `id` (UUID)
* `day` (Enum: Monday-Sunday)
* `time_start` (Time)
* `time_end` (Time)
* `activity_name` (Text)
* `location` (Text)

5. **`gallery`** (Visual Documentation)
* `id` (UUID)
* `image_url` (Text)
* `caption` (Text)
* `category` (Text)

---

## 3. Admin Dashboard Features
The Admin Dashboard will serve as a control center (Control Panel) for Mabna Al Muhasibi administrators.

### Pages & Features
1. **Login Page**
* Secure login page using Supabase Auth (Email & Password).
* Route Protection: Only authenticated users can access `/admin`.

2. **Dashboard Overview** (Admin Main Page)
* Summary statistics: Number of Activities, Today's Schedule.
* Server/database status.

3. **Activity Management (CRUD)**
* **List**: View a list of activities.
* **Create**: Add a new activity form (Upload Photos + Text Input).
* **Update**: Edit activity details.
* **Delete**: Delete past/incorrect activities.

4. **Schedule Management**
* Table interface for editing daily student schedules in *real-time*.

5. **Gallery Management**
* Bulk photo uploads for documentation.
* Delete old photos.

6. **Profile Settings**
* Update contact information or the "Welcome" text on the front page without coding.

---

## 4. Implementation Stages (Roadmap)

### Phase 1: Preparation & Migration (Week 1)
- [x] Setup the Next.js / React + Tailwind project.
- [x] Setup the Supabase project (Create Tables, Storage Buckets) - *SQL Schema Prepared*.
- [x] Migrate existing UI components (Navbar, Footer, Hero) to React Components.

### Phase 2: Backend Integration (Week 2)
- [x] Connect the Supabase Client to the Frontend.
- [x] Create the Admin Login page and Auth Logic.
- [x] Replace the static (hardcoded) content on the Home Page with data from the Database (Fetch Data). 

Supabase:
Api URL: https://nozwgjjkecyrpkpybrdf.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vendnamprZWN5cnBrcHlicmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODQwMzIsImV4cCI6MjA4NjA2MDAzMn0.jz7eUl7OhwM-NgeNIBS8_Kx73FTxilpeF1NZSkGZu88

### Phase 3: Admin Dashboard Development (Week 3)
- [ ] Create the Admin Layout (Sidebar Menu).
- [ ] Create an Input Form for Activities & Schedules.
- [ ] Implement the Image Upload function to Supabase Storage.

### Phase 4: Finalization & Deployment (Week 4)
- [ ] Test all features (Data Input, Data Display).
- [ ] Implement Row Level Security (RLS) in Supabase to ensure data security.
- [ ] Deploy to Vercel (Frontend).

---

## 5. Benefits of This Plan
1. **Dynamic**: Administrators don't need to manually edit HTML/CSS code just to change schedules or update news.
2. **Secure**: Admin access is protected by a modern authentication system.
3. **Scalable**: Easy to expand if you want to add features (e.g., Online New Student Registration).