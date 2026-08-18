"use client";

import * as React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { refreshDashboard } from "@/app/actions/helper";
import { compressImage } from "@/lib/client-compress";

type BaseProps = {
  orderId: string;
  pageId?: string;
  submittedBeforePicture?: boolean;
  // eslint-disable-next-line
  setSubmittedBeforePictureAction?: (orderId: string, value: boolean) => void;
};

export function BeforePictureInput({
  orderId,
  pageId,
  submittedBeforePicture,
  setSubmittedBeforePictureAction,
}: BaseProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const triggerPicker = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const t0 = performance.now();
    try {
      setUploading(true);
      if (!orderId) throw new Error("No order ID");

      const compressed = await compressImage(file);
      const tCompress = performance.now();
      const form = new FormData();
      form.append("image", compressed);
      form.append("orderId", orderId);
      if (pageId) form.append("pageId", pageId);

      const res = await fetch('/api/before-picture', {
        method: "POST",
        body: form,
      });
      const tFetch = performance.now();

      if (!res.ok) {
        const msg = await safeError(res, "Upload failed");
        throw new Error(msg);
      }

      const body = await res.json().catch(() => null);
      console.log(
        `[upload:before] client timings — original=${Math.round(file.size / 1024)}KB compressed=${Math.round(compressed.size / 1024)}KB compress=${Math.round(tCompress - t0)}ms fetch=${Math.round(tFetch - tCompress)}ms total=${Math.round(tFetch - t0)}ms`,
        body?.timings ? { server: body.timings } : {}
      );

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
