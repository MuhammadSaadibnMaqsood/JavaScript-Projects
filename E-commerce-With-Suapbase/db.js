import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
  "https://cckgqejtxhjweobufcid.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNja2dxZWp0eGhqd2VvYnVmY2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTczOTMsImV4cCI6MjA3NjM5MzM5M30.fo4o5vYdzwjLFK9ZfRquBeLjrR-kOjpXei1-UCBis9A" // anon key
);

export const getData = async () => {
  const { data, error } = await supabase.from("Products").select("*");
  if (data) {
    return data;
  } else {
    console.log(error);
  }
};

// SIGN UP
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (data) {
    return data;
  } else {
    console.log(error);
  }
};

// GET SESSION

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (data?.session) {
    return data;
  } else {
    console.log(error);
  }
};

// LOGOUT

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
};

//LOGIN

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data?.user) {
    return data;
  } else {
    console.error(error);
    return null;
  }
};

// ADD PRODCUT

export const addProduct = async (name, price, img) => {
  const { data, error } = await supabase.from("Products").insert({
    name: name,
    price: price,
    img: img,
    email: "saad@gmail.com",
  });

  if (data) {
    return data;
  } else {
    console.log(error);
  }
};

//GET OWNER ITEMS

export const getOwnerData = async () => {
  const {data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("email", "saad@gmail.com");

  if (data) {
    console.log(data);
    return data
  } else {
    console.log(error);
  }
};
