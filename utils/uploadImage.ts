export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );

  const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL!, {
    method: "POST",
    body: formData,
  });

  const { secure_url } = await response.json();
  return secure_url;
};
