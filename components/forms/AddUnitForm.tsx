"use client";

interface AddUnitFormProps {
  userId: string;
}

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Loader from "../Loader";
import { uploadImage } from "@/utils/uploadImage";
import { createUnit } from "@/app/auth/actions/unitActions";
import { Category } from "@/types";

// Image validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Schema with validations
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be at least ₱1" }) // .min comes BEFORE .refine
    .refine((val) => Number.isInteger(val), {
      message: "Price must be a whole number",
    }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  categoryId: z.string().min(1, { message: "Please select a category" }),
});

interface AddUnitForm {
  categories: Category[];
}

export default function AddUnitForm({ categories }: AddUnitForm) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: undefined,
      description: "",
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { image, ...data } = values;

    setLoading(true);

    if (image) {
      const imageUrl = await uploadImage(image);
      const res = await createUnit({
        name: data.name,
        price: data.price,
        image: imageUrl,
        description: data.description,
        categoryId: data.categoryId,
      });

      if (res.error) {
        toast.error(res.error);
        setLoading(false);
      } else {
        toast.success(res.success);
        form.reset();
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setLoading(false);
      }
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
              <FormLabel>Unit Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex. PS5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Per Day (₱)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex. 5000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Select */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="ring-offset-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
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
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 h-32 w-auto rounded-md border object-cover"
                />
              )}
              <FormDescription>
                Accepted formats: JPG, JPEG, PNG, WEBP. Max size: 2MB.
              </FormDescription>
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
                  placeholder="Tell us more about this unit..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
