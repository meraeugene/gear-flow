"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Image from "next/image";
import { getCategoryById, updateCategory } from "@/actions/categoryActions";
import { cloudinaryUploadImage } from "@/lib/services/cloudinaryUploadImage";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { IoClose } from "react-icons/io5";
import { Category } from "@/types";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
});

export default function EditCategoryForm({
  categoryId,
}: {
  categoryId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    async function fetchCategory() {
      const { data, error } = await getCategoryById(categoryId);
      if (error) {
        console.log(error);
        toast.error(error);
        return;
      }
      if (data) {
        setCategoryData(data);
        reset({
          name: data.name || "",
          description: data.description || "",
        });
        setPreviewImage(data.image_url || null);
      }
    }

    fetchCategory();
  }, [categoryId, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image must be less than 2MB.");
        return;
      }
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let imageUrl = categoryData?.image_url || "";

      if (selectedImage) {
        const uploadResult = await cloudinaryUploadImage(selectedImage);
        if (uploadResult) {
          imageUrl = uploadResult;
        } else {
          toast.error("Failed to upload image.");
          setLoading(false);
          return;
        }
      }

      const res = await updateCategory(categoryId, {
        name: data.name,
        description: data.description,
        image_url: imageUrl,
      });

      if (res.error) {
        console.log(res.error);
        toast.error(res.error);
      } else {
        toast.success("Category updated successfully!");
        router.push("/admin/manage-categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating category.");
    } finally {
      setLoading(false);
    }
  };

  if (!categoryData)
    return (
      <div className="space-y-6">
        <Skeleton className="flex h-[40px] w-full items-center justify-center rounded-lg" />
        <Skeleton className="flex h-[70px] w-full items-center justify-center rounded-lg" />
        <Skeleton className="flex h-[130px] w-[130px] items-center justify-center rounded-lg" />
        <Skeleton className="flex h-[40px] w-[200px] items-center justify-center rounded-lg" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image upload */}
        <div className="space-y-2">
          <FormLabel>Category Image</FormLabel>
          {previewImage && (
            <div className="relative h-32 w-32">
              <Image
                src={previewImage}
                alt="Category Preview"
                width={128}
                height={128}
                priority
                className="rounded-md object-cover"
              />

              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 h-5 w-5 cursor-pointer p-2"
                onClick={() => {
                  setPreviewImage(null);
                  setSelectedImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <IoClose />
              </Button>
            </div>
          )}
          <Input
            ref={fileInputRef}
            type="file"
            className="w-[250px]"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <Button
          className="w-32 cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader /> : "Update Category"}
        </Button>
      </form>
    </Form>
  );
}
