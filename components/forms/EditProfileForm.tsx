"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { toast } from "sonner";
import Image from "next/image";
import Loader from "../Loader";
import { cloudinaryUploadImage } from "@/lib/services/cloudinaryUploadImage";
import { editProfile } from "@/actions/profileActions";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  profilePicture: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file?.[0] ||
        (["image/jpeg", "image/png", "image/webp"].includes(file[0].type) &&
          file[0].size <= MAX_FILE_SIZE),
      {
        message: "Only images under 2MB (jpg, png, webp) are allowed",
      },
    ),
});

type EditProfileFormValues = z.infer<typeof formSchema>;

interface EditProfileFormProps {
  defaultValues: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    profilePictureUrl?: string;
  };
}

export default function EditProfileForm({
  defaultValues,
}: EditProfileFormProps) {
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [preview, setPreview] = useState<string | null>(
    defaultValues.profilePictureUrl || null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: EditProfileFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Basic fields
      const fields = [
        "firstName",
        "lastName",
        "address",
        "phoneNumber",
      ] as const;
      fields.forEach((field) => {
        const value = values[field];
        if (value) formData.append(field, value);
      });

      // Upload profile picture to Cloudinary
      if (values.profilePicture?.[0]) {
        const imageUrl = await cloudinaryUploadImage(values.profilePicture[0]);
        formData.append("profilePictureUrl", imageUrl);
      }

      const result = await editProfile(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success || "Profile updated");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-6"
      >
        {/* Profile Picture */}
        <FormField
          control={form.control}
          name="profilePicture"
          render={({}) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 basis-20">
                  {preview ? (
                    <Image
                      src={preview?.trimStart().trimEnd() || ""}
                      alt="Profile Preview"
                      layout="fill" // Fill the parent container
                      objectFit="cover" // Ensure the image fills the container without stretching
                      className="rounded-full" // Ensure it's circular
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gray-200" /> // Circular placeholder
                  )}
                </div>

                <div className="w-auto flex-none">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-full max-w-[250px]" // Restrict width of the input
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                          form.setValue("profilePicture", e.target.files);
                        }
                      }}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} readOnly className="bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-32 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
