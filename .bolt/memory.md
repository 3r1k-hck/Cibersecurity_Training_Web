# Project memory

## Product intent & audience

- Security awareness training platform with at least two modules: a general quiz/questionnaire and a phishing detection course.
- Users receive completion certificates per module; certificates must be visually distinct per training type.
- Content appears in Spanish (e.g., "Detección de Phishing e Ingeniería Social").

## Brand personality & voice

- Formal yet engaging; certificate language is professional/diplomatic.
- Spanish-first copy across UI and generated documents.

## Visual design & UX direction

- **Quiz certificate**: green-cyan palette, no seal, cleaner layout.
- **Phishing certificate**: amber palette (border, name underline, percentage, signature), circular decorative seal (double ring, radial marks, "PHISH EXPERT" + "Sello de Aptitud"), subtle micro-cross background pattern.
- Certificates share a common base component; per-module variants apply color, title, subtitle, and seal differences.
- Production-quality, non-cookie-cutter aesthetic expected per global prompt.
- Lucide React icons used where needed; Tailwind for styling.

## Decisions, constraints & rationale

- Extracted shared certificate base to avoid duplication; module-specific visual identity applied via variant props/styling.
- Phishing certificate differentiated by color (amber), seal, and custom course title to distinguish from quiz certificate.
- Quiz certificate intentionally left unchanged to preserve existing design.
- Build passes with no errors after refactor; visual rendering not browser-verified.
- Framework: Vite + React. Path alias `@/` → `src/` used for imports. No extra UI/icon packages beyond Tailwind and lucide-react.

## Open questions & assumptions

- Assumes certificates are generated client-side in React components.
- Unverified whether certificate export/print/PDF is supported or needed.
- Unverified whether additional module certificates will be added and require a scalable variant system.
- Accessibility and print-specific styling not yet discussed.