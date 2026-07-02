"use client";

import { useState } from "react";
import type { Webinar, WebinarStatus } from "@/content/webinars";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebinarCard } from "./webinar-card";

export function WebinarsFilter({ webinars }: { webinars: Webinar[] }) {
  const [active, setActive] = useState<WebinarStatus | "all">("all");
  const filtered = active === "all" ? webinars : webinars.filter((webinar) => webinar.status === active);

  return (
    <div>
      <Tabs value={active} onValueChange={(value) => setActive(value as WebinarStatus | "all")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recorded">Recorded</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((webinar) => (
          <WebinarCard key={webinar.slug} webinar={webinar} />
        ))}
      </div>
    </div>
  );
}
