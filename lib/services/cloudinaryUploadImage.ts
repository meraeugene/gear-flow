export const cloudinaryUploadImage = async (file: File): Promise<string> => {
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

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("No secure_url returned by Cloudinary");
  }

  return data.secure_url as string;
};
