"use client";

import { useState } from "react";
import { format } from "date-fns"

import { CreateEvent, EventFormParams } from "@/components/creeate-event-form"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

export default function IndexPage() {

  const [events, setEvents] = useState<Array<EventFormParams>>([])
  return (
    <div className="container mt-12 flex size-full max-w-2xl flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold">Events</h2>
      <CreateEvent onSubmit={(event) => setEvents([...events, event])} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Title
            </TableHead>
            <TableHead>
              Location
            </TableHead>
            <TableHead>
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow>
              <TableCell>
                {event.title}
              </TableCell>
              <TableCell>
                {event.location}
              </TableCell>
              <TableCell>
                {format(event.date, 'PPP')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
