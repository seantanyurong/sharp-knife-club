"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Order = {
  orderId: string;
  customerName: string;
  whatsApp: string;
  address: string;
  note: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
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
            <a href={`https://wa.me/${order.whatsApp}`} target="_blank" rel="noreferrer">
              <DropdownMenuItem
                className="cursor-pointer"
              >
                WhatsApp Customer
              </DropdownMenuItem>
            </a>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Submit Collection Picture</DropdownMenuItem>
            <DropdownMenuItem>Submit Delivery Picture</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
