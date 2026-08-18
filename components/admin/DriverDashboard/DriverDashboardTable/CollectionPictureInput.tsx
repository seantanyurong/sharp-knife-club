"use client";

import * as React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { refreshDashboard } from "@/app/actions/helper";
import { compressImage } from "@/lib/client-compress";

type Kind = "collection" | "delivery";

type BaseProps = {
  orderId: string;
  pageId?: string;
  customerName?: string;
  whatsApp?: string;
  kind?: Kind;
  collected?: boolean;
  delivered?: boolean;
  // eslint-disable-next-line
  setCollectedAction?: (orderId: string, value: boolean) => void;
  // eslint-disable-next-line
  setDeliveredAction?: (orderId: string, value: boolean) => void;
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
  collection: "/api/collection-picture",
  delivery: "/api/delivery-picture",
};

export function CollectionPictureInput({
  orderId,
  pageId,
  customerName,
  whatsApp,
  kind = "collection",
  collected,
  delivered,
  setCollectedAction,
  setDeliveredAction,
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
      if (customerName) form.append("customerName", customerName);
      if (whatsApp) form.append("whatsApp", whatsApp);

      const res = await fetch(ENDPOINTS[kind], {
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
        `[upload:${kind}] client timings — original=${Math.round(file.size / 1024)}KB compressed=${Math.round(compressed.size / 1024)}KB compress=${Math.round(tCompress - t0)}ms fetch=${Math.round(tFetch - tCompress)}ms total=${Math.round(tFetch - t0)}ms`,
        body?.timings ? { server: body.timings } : {}
      );

      if (setCollectedAction) setCollectedAction(orderId, true);
      if (setDeliveredAction) setDeliveredAction(orderId, true);

      toast.success(SUCCESS[kind]);
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
        disabled={uploading || collected || delivered}
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
