import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pixobpdscpbakwlbeoxu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeG9icGRzY3BiYWt3bGJlb3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NTI5MjIsImV4cCI6MjAzNDEyODkyMn0.9_fS7bkkxoiBtV2THfI_lbsa9-ToP6YCiEqPj_3fVZE"
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
