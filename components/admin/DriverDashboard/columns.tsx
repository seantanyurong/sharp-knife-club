"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CollectionPictureInput } from "@/components/admin/DriverDashboard/CollectionPictureInput"


export type Order = {
  pageId: string;
  orderId: string;
  customerName: string;
  whatsApp: string;
  address: string;
  note: string;
  collected: boolean;
  delivered: boolean;
};

type MakeColumnsProps = {
  collectedById: Record<string, boolean>;
  deliveredById: Record<string, boolean>;
  // eslint-disable-next-line
  setCollectedAction: (orderId: string, value: boolean) => void;
  // eslint-disable-next-line
  setDeliveredAction: (orderId: string, value: boolean) => void;
};


export function makeColumns({ collectedById, setCollectedAction, deliveredById, setDeliveredAction }: MakeColumnsProps): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "orderId",
      header: "Order",
    },
    {
      accessorKey: "customerName",
      header: "Name",
    },
    {
      accessorKey: "whatsApp",
      header: "WhatsApp",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "note",
      header: "Note",
    },
    {
      accessorKey: "collected",
      header: "Collected",
      cell: ({ row }) => {
        const order = row.original

        return (
          <Checkbox
            checked={collectedById[order.orderId]}
            className="cursor-not-allowed"
          />
        )
      },
    },
    {
      accessorKey: "delivered",
      header: "Delivered",
      cell: ({ row }) => {
        const order = row.original

        return (
          <Checkbox
            checked={deliveredById[order.orderId]}
            className="cursor-not-allowed"
          />
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(order.address)}
              >
                Copy Address
              </DropdownMenuItem>
              <a href={`https://www.google.com/maps/search/?api=1&query=${order.address}`} target="_blank" rel="noreferrer">
                <DropdownMenuItem
                  className="cursor-pointer"
                >
                  Go to Google Maps
                </DropdownMenuItem>
              </a>
              <a href={`https://wa.me/${order.whatsApp}`} target="_blank" rel="noreferrer">
                <DropdownMenuItem
                  className="cursor-pointer"
                >
                  WhatsApp Customer
                </DropdownMenuItem>
              </a>
              <Link href={`/admin/order/${order.pageId}`}>
                <DropdownMenuItem
                  className="cursor-pointer"
                >
                  View Order Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <CollectionPictureInput orderId={order.orderId} kind="collection" collected={collectedById[order.orderId]} setCollectedAction={setCollectedAction} />
              <CollectionPictureInput orderId={order.orderId} kind="delivery" delivered={deliveredById[order.orderId]} setDeliveredAction={setDeliveredAction} />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
