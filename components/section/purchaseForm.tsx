'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePurchaseForm } from "@/context/purchaseForm"
import NextPickUpDate from "@/components/NextPickupDate"

export default function PurchaseForm() {
  const { isOpen, setIsOpen } = usePurchaseForm()

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Let's get your knives sharp again!</DrawerTitle>
          <DrawerDescription>Free doorstep pickup and delivery.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <form className="grid items-start gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" defaultValue="shadcn@example.com" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@shadcn" />
            </div>
            <div className='text-sm'>
              Next Collection: <NextPickUpDate />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  )
}
