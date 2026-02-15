-- ================================================
-- Gallery Migration: Merge Activities into Gallery
-- ================================================
-- Run this in Supabase SQL Editor

-- 1. Add new columns to gallery table
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS event_date date;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS instagram_url text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS sub_category text;

-- 2. Make image_url nullable (since some activities might not have images)
ALTER TABLE gallery ALTER COLUMN image_url DROP NOT NULL;

-- 3. Create new storage bucket for gallery
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true) 
ON CONFLICT DO NOTHING;

-- 4. Storage policies for gallery-images bucket
CREATE POLICY "Public Access Gallery" ON storage.objects FOR SELECT 
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated Upload Gallery" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update Gallery" ON storage.objects FOR UPDATE 
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete Gallery" ON storage.objects FOR DELETE 
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

-- 5. Migrate existing activities data into gallery
INSERT INTO gallery (image_url, caption, category, title, content, event_date, sub_category)
SELECT 
  image_url,
  LEFT(content, 200) as caption,
  'Kegiatan Mahasantri' as category,
  title,
  content,
  event_date,
  'Acara Khusus' as sub_category
FROM activities
WHERE NOT EXISTS (
  SELECT 1 FROM gallery g WHERE g.title = activities.title
);

-- 6. (Optional) Drop activities table after verifying migration
-- DROP TABLE IF EXISTS activities;

-- ================================================
-- INSTRUCTIONS:
-- 1. Run this script in Supabase SQL Editor
-- 2. Verify gallery table has new columns
-- 3. Verify gallery-images bucket exists
-- 4. Check that activities data appeared in gallery table
-- ================================================
