# Supabase Database Setup Guide

To make the Admin Panel work, we need to create tables in your Supabase database to store the bikes, site configuration, and appointments, alongside a storage bucket for images.

Please go to your [Supabase Dashboard](https://supabase.com/dashboard/projects), open the **SQL Editor** on the left menu, and run the following exact SQL script.

```sql
-- 1. Create Bikes Table
CREATE TABLE IF NOT EXISTS public.bikes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  image text NOT NULL,
  engine text,
  power text,
  torque text,
  mileage text,
  brakes text,
  tyres text,
  suspension text,
  features text[],
  colors text[],
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Site Config Table (for Hero & Offers)
CREATE TABLE IF NOT EXISTS public.site_config (
  id integer PRIMARY KEY DEFAULT 1,
  hero_slides jsonb,
  exclusive_deal jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  bike_model text NOT NULL,
  preferred_date date NOT NULL,
  message text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Set up RLS (Row Level Security) Policies
ALTER TABLE public.bikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to bikes and config
CREATE POLICY "Public profiles are viewable by everyone." ON public.bikes FOR SELECT USING (true);
CREATE POLICY "Public config is viewable by everyone." ON public.site_config FOR SELECT USING (true);

-- Allow authenticated users (who we will treat as admins for now) to update bikes and config
CREATE POLICY "Auth users can insert bikes" ON public.bikes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update bikes" ON public.bikes FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can delete bikes" ON public.bikes FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth users can update config" ON public.site_config FOR ALL USING (auth.role() = 'authenticated');

-- Appointments policies: Everyone can insert, only authenticated users (admins) can view
CREATE POLICY "Anyone can insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can view appointments" ON public.appointments FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update appointments" ON public.appointments FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can delete appointments" ON public.appointments FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Insert Initial Config Data
INSERT INTO public.site_config (id, exclusive_deal) 
VALUES (
  1, 
  '{"title": "Festival Offers", "discount": 7000, "subtitle": "Get up to ₹7,000 discount on selected Hero performance machines. Limited time only."}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 6. Create Storage Bucket for Images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- 7. Initialize Admin User
-- This inserts the fixed admin credentials explicitly into the authentication table.
-- Email: savitashete85@gmail.com
-- Password: adminpassword123
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'savitashete85@gmail.com',
  crypt('adminpassword123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);
```

## After running this:
Reply **"done"** so I can proceed with writing the Admin Panel code to manage these tables!

---

## 8. Migration: Add Bike-Specific Offers
Run this script to add individual offer fields to each bike.

```sql
-- Add discount and offer_title columns to bikes table
ALTER TABLE IF EXISTS public.bikes 
ADD COLUMN IF NOT EXISTS discount numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS offer_title text DEFAULT 'Festival Offer';
```

---

## 9. Migration: Admin Activity Blog
Run this script to enable tracking of website visits, logins, and form submissions.

```sql
-- Create User Activity Table
CREATE TABLE IF NOT EXISTS public.user_activity (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_type text NOT NULL, -- 'visit', 'login', 'form_submission'
  user_email text,
  details text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies for Activity Table
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert activity (for tracking visits and logins)
CREATE POLICY "Anyone can insert activity" ON public.user_activity FOR INSERT WITH CHECK (true);

-- Only admins can view activity
CREATE POLICY "Admins can view activity" ON public.user_activity FOR SELECT USING (auth.role() = 'authenticated');

---

## 10. Migration: Customer Profiles
Run this script to store and manage customer contact details for the admin panel.

```sql
-- Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  phone text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
```
```
