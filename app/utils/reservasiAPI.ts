import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================
// READ DATA
// ============================
export const getReservasi = async () => {
  const { data, error } = await supabase
    .from("reservasi")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("❌ Gagal mengambil data:", error.message);
    return [];
  }
  return data;
};

// ============================
// CREATE DATA
// ============================
export const addReservasi = async (newData: any) => {
  const { data, error } = await supabase.from("reservasi").insert([newData]);
  if (error) {
    console.error("❌ Gagal menambah data:", error.message);
    return null;
  }
  return data;
};

// ============================
// UPDATE DATA
// ============================
export const updateReservasi = async (id: number, updatedData: any) => {
  const { data, error } = await supabase
    .from("reservasi")
    .update(updatedData)
    .eq("id", id);
  if (error) {
    console.error("❌ Gagal memperbarui data:", error.message);
    return null;
  }
  return data;
};

// ============================
// DELETE DATA
// ============================
export const deleteReservasi = async (id: number) => {
  const { data, error } = await supabase.from("reservasi").delete().eq("id", id);
  if (error) {
    console.error("❌ Gagal menghapus data:", error.message);
    return null;
  }
  return data;
};
