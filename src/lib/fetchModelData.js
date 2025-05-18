export async function fetchModel(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Lỗi khi fetch dữ liệu");
  }
  const data = await response.json();
  return data;
}
