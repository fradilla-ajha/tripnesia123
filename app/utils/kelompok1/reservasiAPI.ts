export const API_URL = "https://sprightly-starburst-ae6a2a.netlify.app/api/public/products";

export async function tambahProduk(formData: FormData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData, // jangan ubah ke JSON!
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Gagal menambah produk");
    return data;
  } catch (error) {
    console.error("Error tambahProduk:", error);
    throw error;
  }
}
