"use client";

import * as React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Kind = "collection" | "delivery";

type BaseProps = {
  orderId?: string;
  kind?: Kind;
};

const LABELS: Record<Kind, string> = {
  collection: "Submit Collection Picture",
  delivery: "Submit Delivery Picture",
};

const SUCCESS: Record<Kind, string> = {
  collection: "Collection picture uploaded!",
  delivery: "Delivery picture uploaded!",
};

const ENDPOINTS: Record<Kind, string> = {
  collection: "/collection-picture",
  delivery: "/delivery-picture",
};

export function CollectionPictureInput({
  orderId,
  kind = "collection",
}: BaseProps) {
  const apiBaseUrl = 'http://localhost:8080';
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const triggerPicker = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const form = new FormData();
      form.append("image", file);
      if (orderId) form.append("orderId", orderId);
      // Helpful for a single backend route to branch on:
      form.append("kind", kind);

      const endpoint = ENDPOINTS[kind];
      const url = `${apiBaseUrl.replace(/\/$/, "")}${endpoint}`;

      const res = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const msg = await safeError(res, "Upload failed");
        throw new Error(msg);
      }

      toast.success(SUCCESS[kind]);
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
        capture="environment"
        onChange={onFileChange}
      />

      <DropdownMenuItem
        className="cursor-pointer"
        onSelect={(e) => {
          e.preventDefault(); // keep the menu open until the picker opens
          triggerPicker();
        }}
        disabled={uploading}
      >
        {uploading ? "Uploading…" : LABELS[kind]}
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
