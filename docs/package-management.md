# Package Management

## Critical: M4 Pro MacBook Freeze Prevention

Installing multiple packages in a single `pnpm add` command causes the machine to freeze due to simultaneous peer dependency resolution, parallel postinstall scripts, and file system pressure on the pnpm content-addressable store.

**Always install packages in small groups of 2–3 max.**

```bash
# ❌ WILL FREEZE THE MACHINE
pnpm add -D jest jest-environment-jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest

# ✅ CORRECT — small groups, wait for each to complete
pnpm add -D jest jest-environment-jsdom
pnpm add -D @testing-library/react @testing-library/jest-dom
pnpm add -D @testing-library/user-event @types/jest
```

## Grouping Strategy

Group by relatedness and install one group at a time:

| Group | Packages |
|---|---|
| React core | `react`, `react-dom`, `@types/react` |
| Next.js | `next`, `eslint-config-next` |
| Forms | `react-hook-form`, `@hookform/resolvers` |
| TanStack Query | `@tanstack/react-query`, `@tanstack/react-query-devtools` |
| Testing core | `jest`, `jest-environment-jsdom` |
| Testing library | `@testing-library/react`, `@testing-library/jest-dom` |
| Testing utils | `@testing-library/user-event`, `@types/jest` |
| UI utilities | `lucide-react`, `framer-motion`, `tailwind-merge` |
| State & validation | `zustand`, `zod` |
| Date | `date-fns`, `react-day-picker` |
| Dev types | `@types/node` (alone — major version jumps are heavy) |

The same rule applies to updates:

```bash
# ❌ Never
pnpm update --latest react react-dom next eslint zustand framer-motion lucide-react

# ✅ Always in groups
pnpm update --latest react react-dom @types/react
pnpm update --latest next eslint-config-next
```

## Critical: Background Task Rules

**Before any `pnpm add` or `pnpm update`:** stop `next dev` (Ctrl+C).

### Never run in parallel

- `pnpm add` / `pnpm install` / `pnpm update` while `next dev` is active
- `tsc --watch` or `eslint --watch` during package installs
- `pnpm build` and `pnpm add` at the same time
- Multiple shell `&` / `&&` chains mixing pnpm installs with build/watch tasks

### Safe to run in parallel with `next dev`

- Reading/editing files
- `git` commands
- `pnpm lint` or `pnpm test`

### Trusted commands — never caused a freeze

```bash
pnpm build          # safe — use freely
pnpm tsc --noEmit   # safe — use freely for type checking
```

## General pnpm Hygiene

Run periodically (weekly or after heavy install sessions) to prevent store bloat:

```bash
pnpm store prune
```

If an install hangs for more than 60 seconds:

1. `Ctrl+C` to kill it
2. `rm -rf node_modules`
3. `pnpm store prune`
4. Re-install in small groups

## Version Pinning Convention

Never pin `next`, `react`, `react-dom`, or `eslint-config-next` without a caret:

```json
"next": "^16.2.9"   // ✅
"next": "16.2.9"    // ❌ prevents pnpm update from working
```

## shadcn/ui Component Installation

Always use the CLI — never hand-edit `components/ui/`:

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog form input
```

Install shadcn components one at a time or in small groups (same freeze risk).
