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
import { BeforePictureInput } from "@/components/admin/SharpenerDashboard/SharpenerDashboardTable/BeforePictureInput"
import { type Order } from "../../Types"

type MakeColumnsProps = {
  submittedBeforePictureById: Record<string, boolean>;
  // eslint-disable-next-line
  setSubmittedBeforePictureAction: (orderId: string, value: boolean) => void;
};

export function makeColumns({ submittedBeforePictureById, setSubmittedBeforePictureAction }: MakeColumnsProps): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "orderId",
      header: "Order",
    },
    {
      accessorKey: 'knives',
      header: 'Knives',
    },
    {
      accessorKey: 'repairs',
      header: 'Repairs',
    },
    {
      accessorKey: "sharpeningNote",
      header: "Note",
    },
    {
      accessorKey: "submittedBeforePicture",
      header: "Submitted Before Picture",
      cell: ({ row }) => {
        const order = row.original

        return (
          <Checkbox
            checked={submittedBeforePictureById[order.orderId]}
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
              <Link href={`/admin/order/${order.pageId}`}>
                <DropdownMenuItem
                  className="cursor-pointer"
                >
                  View Order Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <BeforePictureInput orderId={order.orderId} submittedBeforePicture={submittedBeforePictureById[order.orderId]} setSubmittedBeforePictureAction={setSubmittedBeforePictureAction} />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
