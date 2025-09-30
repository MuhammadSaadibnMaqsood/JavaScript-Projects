import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
  "https://kqwvsoenmnfwixcqbsqb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxd3Zzb2VubW5md2l4Y3Fic3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTExMDIsImV4cCI6MjA3NDU2NzEwMn0.GrkKpM13ERKU6R5zRcmK1CNWLZloM2fvERbECd5fzg8" // anon key
);
// console.log(supabase);

export const getData = async () => {
  const { data, error } = await supabase.from("ContactBook").select("*");
  if (data) {
    // console.log(data);
    return data;
  } else {
    console.log(error);
  }
};

export const deleteData = async (id) => {
  const { data, error } = await supabase
    .from("ContactBook")
    .delete()
    .eq("id", id);



  if (error) {
    console.error("Delete error:", error);
  }
};

export const addData = async (name, number) => {
  const { data, error } = await supabase.from("ContactBook").insert({
    Name: name,
    Number: number,
  });

  if (error) {
    console.log(error);
  }
};

export const editData = async (id, name, number) => {
  const { data, error } = await supabase
    .from("ContactBook")
    .update({
      Name: name,
      Number: number,
    })
    .eq("id", id);

  if (error) {
    console.log(error);
  }
};
