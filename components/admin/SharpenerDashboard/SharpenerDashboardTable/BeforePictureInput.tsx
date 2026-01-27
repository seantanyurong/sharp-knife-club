"use client";

import * as React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { refreshDashboard } from "@/app/actions/helper";

type BaseProps = {
  orderId: string;
  submittedBeforePicture?: boolean;
  // eslint-disable-next-line
  setSubmittedBeforePictureAction?: (orderId: string, value: boolean) => void;
};

export function BeforePictureInput({
  orderId,
  submittedBeforePicture,
  setSubmittedBeforePictureAction,
}: BaseProps) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL || 'https://server.knifesharpening.sg';
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const triggerPicker = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      if (!orderId) throw new Error("No order ID");

      const form = new FormData();
      form.append("image", file);
      form.append("orderId", orderId);

      const endpoint = '/before-picture';
      const url = `${apiBaseUrl.replace(/\/$/, "")}${endpoint}`;

      const res = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const msg = await safeError(res, "Upload failed");
        throw new Error(msg);
      }

      if (setSubmittedBeforePictureAction) setSubmittedBeforePictureAction(orderId, true);

      toast.success('Before picture uploaded!');
      refreshDashboard();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        console.error(err);
        toast.error("Something went wrong");
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {/* THIS MUST BE OUTSIDE THE MENU PORTAL */}
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />

      <DropdownMenuItem
        className="cursor-pointer"
        onSelect={(e) => {
          e.preventDefault(); // keep the menu open until the picker opens
          triggerPicker();
        }}
        disabled={uploading || submittedBeforePicture}
      >
        {uploading ? "Uploading…" : 'Submit Picture'}
      </DropdownMenuItem>
    </>
  );
}

/** Try to extract a meaningful error message from the response */
async function safeError(res: Response, fallback: string) {
  try {
    const data = await res.json();
    return (data?.error as string) || (data?.message as string) || fallback;
  } catch {
    try {
      const t = await res.text();
      return t || fallback;
    } catch {
      return fallback;
    }
  }
}
