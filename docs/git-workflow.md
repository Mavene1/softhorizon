# Git Workflow

## Commit Convention

```
feat: add user invitation flow
fix: resolve pagination reset on filter change
refactor: extract useTableFilter shared hook
style: update button variants to match design system
chore: update TanStack Query to v5.101
docs: add state management guide
```

Prefix types: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `test`.

Never use `--no-verify`.

## GPG Commit Signing

If using GitLab, GPG signing may be enforced. One-time setup:

```bash
git config --global commit.gpgsign true
git config --global user.signingkey <YOUR_KEY_ID>
```

After this, every `git commit` is signed automatically. Verify:

```bash
git log --show-signature -1
# Should show: gpg: Good signature from "..."
```

## Branch Strategy

- `main` — stable, always deployable
- `feat/description` — new features
- `fix/description` — bug fixes
- `chore/description` — dependency updates, config changes

## Before Committing

Always run type-check before committing:

```bash
pnpm tsc --noEmit
pnpm lint
```

Fix all TypeScript errors before committing. Do not suppress errors with `// @ts-ignore` or `// @ts-expect-error` unless you add a comment explaining the specific reason.

## Re-signing Unsigned Commits

If commits were made before signing was configured, re-sign before pushing:

```bash
# Find unsigned commits (N = no signature)
git log --pretty=format:"%G? %s" | grep "^N"

# Re-sign from a specific parent commit
git rebase <parent-sha> --exec "git commit --amend --no-edit -S"

# Force push after re-signing (rewrites SHA)
git push -uf origin <branch>
```
