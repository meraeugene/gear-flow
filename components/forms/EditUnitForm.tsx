"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

import { getUnitById, updateUnit } from "@/actions/unitActions";
import { cloudinaryUploadImage } from "@/lib/services/cloudinaryUploadImage";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "../Loader";
import { Category, Unit } from "@/types"; // if you have types for categories

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  categoryId: z.string().min(1, { message: "Please select a category" }),
  image: z.any().optional(),
});

interface EditUnitFormProps {
  unitId: string;
  categories: Category[];
}

export default function EditUnitForm({
  unitId,
  categories,
}: EditUnitFormProps) {
  const [unitData, setUnitData] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      image: undefined,
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    async function fetchUnit() {
      const { data, error } = await getUnitById(unitId);

      console.log(unitId);
      if (error) {
        console.log(error);
        toast.error(error);
        return;
      }
      if (data) {
        setUnitData(data);
        reset({
          name: data.name || "",
          price: data.price_per_day || 0,
          description: data.description || "",
          categoryId: data.category_id || "",
          image: undefined,
        });
        setPreview(data.image_url || null);
      }
    }

    fetchUnit();
  }, [unitId, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let imageUrl = unitData?.image_url || "";

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

      const res = await updateUnit(unitId, {
        name: values.name,
        description: values.description,
        price: values.price,
        category_id: values.categoryId,
        image_url: imageUrl,
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Unit updated successfully!");
        router.push("/account/units");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating unit.");
    } finally {
      setLoading(false);
    }
  };

  if (!unitData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[70px] w-full" />
        <Skeleton className="h-[130px] w-[130px]" />
        <Skeleton className="h-[40px] w-[200px]" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
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

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <div className="space-y-2">
          <FormLabel>Unit Image</FormLabel>
          {preview ? (
            <div className="relative h-40 w-40">
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
                className="absolute top-2 right-2 h-5 w-5 cursor-pointer p-2"
                onClick={() => {
                  setPreview(null);
                  setSelectedImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <IoClose />
              </Button>
            </div>
          ) : (
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > MAX_FILE_SIZE) {
                    toast.error("Image must be less than 5MB.");
                    return;
                  }
                  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                    toast.error("Invalid image type.");
                    return;
                  }
                  setSelectedImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-32 cursor-pointer"
          disabled={loading}
        >
          {loading ? <Loader /> : "Update Unit"}
        </Button>
      </form>
    </Form>
  );
}
