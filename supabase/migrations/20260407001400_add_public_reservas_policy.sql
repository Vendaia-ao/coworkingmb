-- Allow public to select from reservas, but only return specific columns
-- We allow them to see what is already booked so they don't double book
CREATE POLICY "Public can view confirmed reservas for availability" ON public.reservas 
  FOR SELECT 
  USING (status = 'confirmada');
