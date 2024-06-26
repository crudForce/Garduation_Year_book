// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pixobpdscpbakwlbeoxu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeG9icGRzY3BiYWt3bGJlb3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NTI5MjIsImV4cCI6MjAzNDEyODkyMn0.9_fS7bkkxoiBtV2THfI_lbsa9-ToP6YCiEqPj_3fVZE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
