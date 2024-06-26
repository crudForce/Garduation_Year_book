// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exttgrmtjbijllepzsxv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dHRncm10amJpamxsZXB6c3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MzY4MDMsImV4cCI6MjAzNDAxMjgwM30.-m-nif2yJmggOVd-HgPT2AJJJIo5-etkbVW3j57KfFk";
const Supabase = createClient(supabaseUrl, supabaseKey);

export default Supabase;
