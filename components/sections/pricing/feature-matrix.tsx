import { pricingTiers } from "@/content/pricing";
import { DynamicIcon } from "@/lib/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionHeader } from "@/components/common/section-header";
import { cn } from "@/lib/utils";

export function FeatureMatrix() {
  const rows = pricingTiers[0]?.features.map((feature) => feature.label) ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <SectionHeader overline="Compare" title="Every feature, side by side" align="center" />
      <div className="mt-10 overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-auto py-4 pl-6 text-sm font-semibold text-foreground">Feature</TableHead>
              {pricingTiers.map((tier) => (
                <TableHead key={tier.id} className="h-auto py-4 text-center text-sm font-semibold text-foreground">
                  {tier.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((label) => (
              <TableRow key={label}>
                <TableCell className="py-4 pl-6 whitespace-normal text-sm font-medium">{label}</TableCell>
                {pricingTiers.map((tier) => {
                  const included = tier.features.find((feature) => feature.label === label)?.included;
                  return (
                    <TableCell key={tier.id} className="py-4 text-center">
                      {typeof included === "string" ? (
                        <span className="text-sm text-muted-foreground">{included}</span>
                      ) : (
                        <DynamicIcon
                          name={included ? "CheckCircle2" : "X"}
                          aria-hidden
                          className={cn("mx-auto h-4 w-4", included ? "text-primary" : "text-muted-foreground/40")}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
