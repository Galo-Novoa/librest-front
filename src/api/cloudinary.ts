export async function uploadImage(file: File): Promise<string> {
  const sigRes = await fetch("http://localhost:8080/cloudinary/signature");
  const { signature, timestamp, apiKey, cloudName } = await sigRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await cloudRes.json();

  if (!cloudRes.ok) throw new Error(data.error?.message || "Error al subir la imagen");

  return data.secure_url;
}