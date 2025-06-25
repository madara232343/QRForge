
-- Create a table for smart links
CREATE TABLE public.smart_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code TEXT NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  password TEXT,
  tracking BOOLEAN NOT NULL DEFAULT true,
  expiry TIMESTAMP WITH TIME ZONE,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups by short_code
CREATE INDEX idx_smart_links_short_code ON public.smart_links(short_code);

-- Create index for expiry cleanup
CREATE INDEX idx_smart_links_expiry ON public.smart_links(expiry) WHERE expiry IS NOT NULL;

-- Enable Row Level Security (RLS) - allowing public read access for smart links
ALTER TABLE public.smart_links ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can access smart links)
CREATE POLICY "Anyone can view smart links" 
  ON public.smart_links 
  FOR SELECT 
  USING (true);

-- Create policy for public insert (anyone can create smart links)
CREATE POLICY "Anyone can create smart links" 
  ON public.smart_links 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for public update (for click tracking)
CREATE POLICY "Anyone can update smart links" 
  ON public.smart_links 
  FOR UPDATE 
  USING (true);
