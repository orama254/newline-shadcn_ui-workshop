"use client";

import React, { useState } from "react";
import {z} from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import {Form, FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl} from "./ui/form"
import {Input} from "./ui/input"
import {Textarea} from "./ui/textarea"
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { DatePicker } from "./date-picker"
import { useToast } from "./ui/use-toast"

const eventFormSchema = z.object({
  title: z.string().min(1, "Event Title is Required"),
  description: z.string(),
  date: z.string().min(1, "Event Date is required"),
  location: z.string().min(1, "Event Location is Required")
})


export type EventFormParams = z.infer<typeof eventFormSchema>


export const CreateEvent = ({
  onSubmit
}: {
  onSubmit: (event: EventFormParams) => void;
}) => {

  const { toast } = useToast();

  const [open, setOpen] = useState(false)

  const handleFormSubmit = (event: EventFormParams) => {
    setOpen(false)
    onSubmit(event)
    toast({
      title: "Event Created Successfully"
    })
  }
  return (
    <Dialog open={open} onOpenChange={(updatedOpen) => setOpen(updatedOpen)} >
      <DialogTrigger asChild>
        <Button>Create New Event</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateEventForm onSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  )
}




export const CreateEventForm = ({
  onSubmit
}:{
  onSubmit: (event: EventFormParams) => void;
}) => {

  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      date: new Date().toISOString(),
      location: '',
      description: '',
    }
  })

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
                <FormField
                  control={form.control}
                  name='title'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="the Event Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    Date
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      date={new Date(field.value)}
                      onChange={(date) =>
                        form.setValue("date", date?.toISOString() || "")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPinIcon className="size-4 text-muted-foreground" />
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full justify-start text-left font-normal"
                      placeholder="Event Location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            </form>
        </Form>
      </CardContent>
    </Card>
  )
}
