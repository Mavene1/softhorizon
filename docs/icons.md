# Icons

## Rule: Always Go Through `lib/icons.ts`

Never import from `lucide-react` directly. All icon usage goes through `lib/icons.ts` which exports `DynamicIcon`, `getIcon`, and `LucideIcon`.

## Two APIs, One Rule Each

### `DynamicIcon` — for JSX rendering from a string

Use any time you render an icon from a **string name** in JSX:

```tsx
// ✅ all correct
<DynamicIcon name="Plus" className="h-4 w-4" />
<DynamicIcon name={iconName} className="h-5 w-5 text-primary" />
<DynamicIcon name={row.statusIcon} className="h-4 w-4" />

// Add aria-hidden for decorative icons next to visible text
<DynamicIcon name="Signal" aria-hidden className="h-4 w-4" />
<span>Active</span>
```

### `getIcon` — for `LucideIcon` prop values

Use **only** when a component prop requires a `LucideIcon` or `React.ElementType` value:

```tsx
// ✅ correct — TabItem[] icon prop requires LucideIcon
const tabs = TABS.map((t) => ({
  id: t.id,
  label: t.label,
  icon: getIcon(t.icon),
}));

// ✅ correct — StatsCard icon prop requires LucideIcon
<StatsCard icon={getIcon("Signal")} label="Active" value="1,204" />
```

Never call `getIcon` just to render the result inline:

```tsx
// ❌ wrong — pointless detour
const Icon = getIcon("Settings");
return <Icon className="h-4 w-4" />;

// ✅ correct
return <DynamicIcon name="Settings" className="h-4 w-4" />;
```

## Icon Names in Config Files

Icon names in `constants.ts` or `mocks.ts` must be **plain strings** — never import Lucide components into those files:

```ts
// ✅ constants.ts — strings only
export const FEATURE_TABS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard" },
  { id: "users",    label: "Users",    icon: "Users" },
];

// ❌ wrong — Lucide import in constants.ts
import { LayoutDashboard } from "lucide-react";
export const FEATURE_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
];
```

## No Local Icon Maps

Never create a feature-local icon map:

```ts
// ❌ wrong
const STATUS_ICONS: Record<string, LucideIcon> = {
  active: Wifi,
  inactive: WifiOff,
};

// ✅ correct — strings in constants, DynamicIcon at render time
const STATUS_ICON_NAMES: Record<Status, string> = {
  active: "Wifi",
  inactive: "WifiOff",
};

// In the column renderer:
<DynamicIcon name={STATUS_ICON_NAMES[row.status]} className="h-4 w-4" />
```

## Adding a New Icon

1. Import the icon from `lucide-react` at the top of `lib/icons.ts`
2. Add it to the `iconMap` object

```ts
// lib/icons.ts
import {
  // ... existing imports ...
  Satellite,     // step 1 — import
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  // ... existing entries ...
  Satellite,     // step 2 — add to map
};
```

Then use anywhere via `<DynamicIcon name="Satellite" />` or `getIcon("Satellite")`.

**Note:** Unknown icon names fall back to the `Server` icon — double-check spelling if an icon shows as a server rack.

## `DynamicIconProps`

```ts
interface DynamicIconProps {
  name: string;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;  // add for decorative icons next to visible text
}
```

## Lucide React v1 Notes

Lucide React v1 may have renamed some icons compared to earlier versions in AI training data. Always verify icon names exist in the installed version:

```bash
# Check if an icon exists
grep -r "export.*IconName" node_modules/lucide-react/dist/lucide-react.d.ts
```

## Rules

- Import from `lib/icons.ts` — never from `lucide-react` directly
- `<DynamicIcon name={str} />` — render a Lucide icon from a string in JSX
- `getIcon(str)` — only when a `LucideIcon` prop is required
- Never call `createElement(getIcon(...))` directly in JSX — use `<DynamicIcon>`
- Icon names in `constants.ts` and `mocks.ts` must be **strings**, not Lucide imports
- Add `aria-hidden` to decorative icons next to visible text
