/*
# Add quiz duration to sessions

1. Modified Tables
- `sessions`: new nullable column `duration_seconds` (integer). Stores how many seconds the student spent on the module in that attempt. Nullable so existing rows remain valid.
2. Security
- No RLS changes: the existing table-level INSERT/SELECT grants for `authenticated` automatically cover the new column, and existing policies continue to apply.
*/

ALTER TABLE sessions ADD COLUMN IF NOT EXISTS duration_seconds integer;
