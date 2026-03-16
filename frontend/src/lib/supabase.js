import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqmvipsglnaopbbzbspb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxbXZpcHNnbG5hb3BiYnpic3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTQ2MTIsImV4cCI6MjA4OTA3MDYxMn0.K7ebPx7IkbnDTUUObPW_DdO0M4jnsAhDwO51aHHESk8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
