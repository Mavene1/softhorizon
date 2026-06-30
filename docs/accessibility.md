# Accessibility

## Icon-Only Buttons

Any `<Button>` that renders only an icon must have an `aria-label`:

```tsx
// ✅ correct
<Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy to clipboard">
  <DynamicIcon name="Copy" className="h-4 w-4" />
</Button>

// ✅ toggle — describe the intended action
<Button
  type="button"
  aria-label={expanded ? "Collapse" : "Expand"}
  onClick={() => setExpanded(!expanded)}
>
  <DynamicIcon name={expanded ? "ChevronUp" : "ChevronDown"} className="h-4 w-4" />
</Button>

// ❌ wrong — screen reader announces nothing useful
<Button variant="ghost" onClick={handleDelete}>
  <DynamicIcon name="Trash2" className="h-4 w-4" />
</Button>
```

## Decorative Icons

Icons next to visible text are decorative — mark with `aria-hidden`:

```tsx
// ✅ decorative icon next to text
<DynamicIcon name="Signal" aria-hidden className="h-4 w-4 text-primary" />
<span>Active</span>

// ✅ decorative background element
<div className="absolute inset-0 bg-grid-pattern pointer-events-none" aria-hidden />
```

`DynamicIcon` does not add `aria-hidden` automatically — always add it for decorative icons.

## Form Labels

`FormFields` components handle label association via React Hook Form's `FormField` id. Always provide the `label` prop — it is required and always renders a `<FormLabel>`:

```tsx
// ✅ label associated automatically via FormField
<TextField control={form.control} name="email" label="Email address" />
<SelectField control={form.control} name="role" label="Role" options={ROLE_OPTIONS} />

// ❌ wrong — no label
<Input placeholder="Email address" />
```

## Dialog Titles and Descriptions

shadcn/ui `<Dialog>` handles focus trapping and `aria-modal` automatically when used through `BaseDialog`, `FormDialog`, or `ActionDialog`. Provide meaningful `title` and `description` — they are announced when the dialog opens:

```tsx
// ✅ descriptive
<FormDialog
  title="Invite Team Member"
  description="The user will receive an email invitation to join your organisation."
/>
<ActionDialog
  title="Delete API Key"
  description="This cannot be undone. Integrations using this key will stop working."
/>

// ❌ wrong — vague
<FormDialog title="Edit" />
```

## Color Contrast

Always use semantic CSS tokens — they are designed to meet WCAG AA contrast ratios:

| Token pair | Usage |
|---|---|
| `text-foreground` on `bg-background` | Body text |
| `text-muted-foreground` on `bg-background` | Supporting text |
| `text-primary-foreground` on `bg-primary` | Text on primary buttons |
| `text-destructive` | Error/danger text |

Never use `text-muted-foreground` for body text or interactive labels where contrast is critical — it is for supporting/decorative text only.

## Status Indicators

Status colors must never be the **only** signal — always pair color with text or shape:

```tsx
// ✅ color + text — use StatusBadge
<StatusBadge status="active" />

// ✅ color + text inline
<span className="flex items-center gap-1">
  <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
  Active
</span>

// ❌ color-only dot — inaccessible
<span className="h-2 w-2 rounded-full bg-red-500" />
```

## Tab Navigation

`TabNavigation` renders shadcn `<Tabs>` with arrow, Home, and End key handling built in. Do not reimplement tab keyboard behavior manually.

## DataTable Keyboard Navigation

For rows that navigate to a detail page, prefer wrapping the primary content in `<Button variant="link" asChild><Link href="...">` rather than using `onRowClick` alone — this makes the row actionable via keyboard.

## Navigation Landmarks

The app layout renders semantic landmarks via shadcn Sheet and nav elements. Do not replace structural elements with generic `<div>` containers.

## Hydration and `suppressHydrationWarning`

The root `<html>` element requires `suppressHydrationWarning` when using `next-themes` — the theme class is set before hydration and creates a known mismatch:

```tsx
// app/layout.tsx
<html lang="en" suppressHydrationWarning>
```

Only add `suppressHydrationWarning` where it is genuinely needed (theme toggle on `<html>`). Never suppress warnings to hide real hydration errors.

## Do NOT

- Add icon-only buttons without `aria-label`
- Render decorative icons without `aria-hidden="true"`
- Use color alone to convey status — always pair with text or shape
- Skip `title` and `description` on dialogs — both are announced when the dialog opens
- Use `text-muted-foreground` for body text or interactive labels
- Suppress hydration warnings without understanding the cause
