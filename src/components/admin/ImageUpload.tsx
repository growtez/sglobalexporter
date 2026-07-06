"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { UploadCloud, Trash2, Loader2, AlertCircle, Star } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  // Split comma-separated URLs and filter out empty strings
  const urls = value ? value.split(",").filter((url) => url.trim() !== "") : [];

  const handleUpload = async (files: File[]) => {
    // Only upload up to the remaining slot capacity
    const urlsToUpload = files.slice(0, 3 - urls.length);
    if (urlsToUpload.length === 0) return;

    setIsUploading(true);
    setError(null);

    const newUrls = [...urls];

    try {
      for (const file of urlsToUpload) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          setError("Please upload image files (PNG, JPG, WebP, etc.)");
          continue;
        }

        // Validate size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`"${file.name}" exceeds the 5MB size limit.`);
          continue;
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        // Upload file to Supabase storage bucket 'product-images'
        const { data, error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        newUrls.push(publicUrl);
      }

      onChange(newUrls.filter(Boolean).join(","));
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(
        err.message ||
          "Failed to upload images. Make sure the 'product-images' storage bucket is created and public in Supabase."
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(Array.from(e.target.files));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const newUrls = urls.filter((_, i) => i !== indexToRemove);
    onChange(newUrls.join(","));
  };

  const makePrimary = (index: number) => {
    if (index === 0) return;
    const newUrls = [...urls];
    const [selected] = newUrls.splice(index, 1);
    newUrls.unshift(selected);
    onChange(newUrls.join(","));
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* File input (hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Render existing images */}
        {urls.map((url, index) => (
          <div
            key={url}
            className="relative group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 flex items-center justify-center aspect-square shadow-sm transition-all duration-300"
          >
            <img
              src={url}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges/Tags */}
            {index === 0 ? (
              <div className="absolute top-3 left-3 bg-forest text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm bg-forest/90">
                <Star className="w-3.5 h-3.5 fill-current" />
                Main Image
              </div>
            ) : (
              <div className="absolute top-3 left-3 bg-stone-900/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-md backdrop-blur-sm">
                Image {index + 1}
              </div>
            )}

            {/* Overlay buttons on Hover */}
            <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => makePrimary(index)}
                  className="px-3 py-2 bg-white text-forest hover:bg-stone-50 rounded-xl shadow-md transition transform hover:scale-105 text-xs font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Star className="w-4 h-4" />
                  Set Main
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-2 bg-red-600 text-white hover:bg-red-700 rounded-xl shadow-md transition transform hover:scale-105 cursor-pointer"
                title="Remove image"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Upload dropzone (if less than 3 images) */}
        {urls.length < 3 && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerSelect}
            className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[160px] ${
              urls.length === 0 ? "sm:col-span-3 py-10" : "col-span-1 aspect-square p-4"
            } ${
              dragActive
                ? "border-forest bg-forest/5"
                : "border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center text-center p-2">
                <Loader2 className="w-8 h-8 text-forest animate-spin mb-2" />
                <p className="text-xs font-medium text-stone-600">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center mb-2.5 text-stone-400 group-hover:text-stone-500 transition-colors">
                  <UploadCloud className="w-5.5 h-5.5" />
                </div>
                <p className="text-xs font-semibold text-stone-700">
                  {urls.length === 0 ? "Click to upload or drag images" : "Add Image"}
                </p>
                {urls.length === 0 && (
                  <p className="text-[10px] text-stone-400 mt-1.5">
                    Upload up to 3 images (max 5MB each)
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="mt-3 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Upload failed</p>
            <p className="text-red-500 mt-0.5">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
