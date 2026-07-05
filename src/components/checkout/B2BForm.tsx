"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { submitInquiry } from "@/app/b2b/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inquirySchema = z.object({
  requestedKg: z.number().min(50, "Minimum wholesale order is 50kg."),
  destinationCountry: z.string().min(2, "Please enter a valid country."),
  message: z.string().optional(),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function B2BForm() {
  const searchParams = useSearchParams();
  const productId = searchParams?.get("product") || undefined;
  
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      requestedKg: 100,
      destinationCountry: "",
      message: "",
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setServerError(null);
    const res = await submitInquiry({ ...data, productId });
    
    if (res.error) {
      setServerError(res.error);
    } else if (res.success) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="bg-forest/10 border border-forest p-8 text-center">
        <h3 className="text-2xl font-serif text-forest mb-4">Inquiry Received</h3>
        <p className="text-stone-700">
          Thank you for reaching out. Our wholesale team will review your request and get back to you with a custom quote shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 text-sm font-medium border border-red-200">
          {serverError}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="requestedKg">Estimated Volume (kg)</Label>
          <Input
            id="requestedKg"
            type="number"
            {...register("requestedKg", { valueAsNumber: true })}
          />
          {errors.requestedKg && (
            <p className="text-sm text-red-500">{errors.requestedKg.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="destinationCountry">Destination Country</Label>
          <Input
            id="destinationCountry"
            placeholder="e.g., United Kingdom"
            {...register("destinationCountry")}
          />
          {errors.destinationCountry && (
            <p className="text-sm text-red-500">{errors.destinationCountry.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Additional Requirements (Optional)</Label>
          <textarea
            id="message"
            rows={4}
            className="flex w-full border border-stone-200 bg-transparent px-4 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest text-charcoal"
            placeholder="Any specific processing, packaging, or delivery requirements?"
            {...register("message")}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Quote"}
      </Button>
    </form>
  );
}
