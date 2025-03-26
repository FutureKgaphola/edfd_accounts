
"use client";

import { customBadgeTheme, customProgTheme, customTimeLine } from "@/app/SiteTheme/Theme";
import { Badge, Progress, Timeline } from "flowbite-react";
import { HiCheck, HiCalendar, HiClock } from "react-icons/hi";

export function TimelineUpdates() {
  return (
    <Timeline className="rounded border shadow" theme={customTimeLine}>
      <Timeline.Item>
        <Timeline.Point icon={() => <HiCalendar color="white" />} />
        <Timeline.Content>
          <Timeline.Time>April 2025</Timeline.Time>
          <div className="flex gap-2">
            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">Status : in progress</Badge>
            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">category : Bussiness</Badge>
          </div>
          <Timeline.Title>Address validation</Timeline.Title>
          <Timeline.Body className=" tracking-tight text-wrap">
            Leada is reviwing your address details to ensure that they are correct and up to date.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <div className="flex flex-row ml-4 mb-2 gap-2">
        <Badge className="w-fit bg-appGreen text-white" icon={HiCheck}>Contact verified</Badge>
        <Badge className="w-fit bg-appGreen text-white" icon={HiCheck}>Marital Status verified</Badge>
        <Badge color="warning" className="w-fit bg-warning-700 text-white" icon={HiClock}>Address</Badge>
      </div>
      <Progress progress={15} theme={customProgTheme} size="sm" color="red" />
    </Timeline>
  );
}
