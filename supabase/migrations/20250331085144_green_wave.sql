/*
  # Create Pine Script Database Schema

  1. New Tables
    - `scripts`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text)
      - `code` (text, not null)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on `scripts` table
    - Add policies for:
      - Authenticated users can read all scripts
      - Only admin can create/update/delete scripts
*/

CREATE TABLE scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  code text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all scripts
CREATE POLICY "Authenticated users can read scripts"
  ON scripts
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admin can manage scripts (we'll set admin role in Supabase dashboard)
CREATE POLICY "Admin can manage scripts"
  ON scripts
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));