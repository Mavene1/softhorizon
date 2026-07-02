import { format } from "date-fns";
import Link from "next/link";
import type { Webinar } from "@/content/webinars";
import { teamMembers } from "@/content/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/lib/icons";

export function WebinarCard({ webinar }: { webinar: Webinar }) {
  const speakers = webinar.speakerSlugs
    .map((slug) => teamMembers.find((member) => member.slug === slug))
    .filter((member): member is NonNullable<typeof member> => Boolean(member));

  const isUpcoming = webinar.status === "upcoming";

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Badge variant={isUpcoming ? "default" : "outline"}>{isUpcoming ? "Upcoming" : "Recorded"}</Badge>
        <span className="text-xs text-muted-foreground">{format(new Date(webinar.date), "MMMM d, yyyy")}</span>
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight">{webinar.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{webinar.description}</p>

      {speakers.length > 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          With {speakers.map((speaker) => speaker.name).join(" & ")}
        </p>
      )}

      {isUpcoming ? (
        <Button asChild className="mt-5 w-full">
          <Link href="/contact">
            <DynamicIcon name="CalendarDays" aria-hidden className="h-4 w-4" />
            Register interest
          </Link>
        </Button>
      ) : (
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href="/contact">
            <DynamicIcon name="Play" aria-hidden className="h-4 w-4" />
            Request the recording
          </Link>
        </Button>
      )}
    </div>
  );
}
