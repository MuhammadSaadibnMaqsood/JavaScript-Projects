import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
  "https://cckgqejtxhjweobufcid.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNja2dxZWp0eGhqd2VvYnVmY2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTczOTMsImV4cCI6MjA3NjM5MzM5M30.fo4o5vYdzwjLFK9ZfRquBeLjrR-kOjpXei1-UCBis9A" // anon key
);

console.log(supabase);

export const getData = async () => {
  const { data, error } = await supabase.from("Products").select("*");
  if (data) {
    return data;
  } else {
    console.log(error);
  }
};

