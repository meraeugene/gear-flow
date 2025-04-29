"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

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
  FormDescription,
} from "@/components/ui/form";

import Loader from "@/components/Loader";
import { cloudinaryUploadImage } from "@/lib/services/cloudinaryUploadImage";
import { addCategory } from "@/actions/categoryActions";
import { useAuthStore } from "@/stores/useAuthStore";
import { IoClose } from "react-icons/io5";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});

export default function AddCategoryForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const { role } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { image, name, description } = values;
    setLoading(true);

    try {
      if (role !== "admin") {
        toast.error("Not authorized. Admin access only.");
        return;
      }

      const imageUrl = await cloudinaryUploadImage(image);

      const res = await addCategory({
        name,
        description,
        image_url: imageUrl,
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message || "Category added successfully!");
        form.reset();
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        router.push("/admin/manage-categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading the image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
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
                <Textarea
                  placeholder="Describe this category"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>

              {preview ? (
                <FormControl>
                  <div className="relative h-64 w-64">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="rounded-md border object-cover"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 h-5 w-5 cursor-pointer bg-red-700 p-2"
                      onClick={() => {
                        setPreview(null);
                        field.onChange(undefined);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      <IoClose />
                    </Button>
                  </div>
                </FormControl>
              ) : (
                <FormControl>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      if (file) setPreview(URL.createObjectURL(file));
                    }}
                  />
                </FormControl>
              )}

              <FormDescription>
                Accepted formats: JPG, JPEG, PNG, WEBP. Max size: 5MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-32 cursor-pointer"
          disabled={loading}
        >
          {loading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
