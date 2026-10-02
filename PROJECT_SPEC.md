# CatFocus — Product Specification

## Product vision

CatFocus is a calm, cute focus timer built around a virtual grey cat. Tasks are represented as Morandi-coloured yarn balls. Completing work unlocks a feeding interaction, turning productivity into a lightweight reward loop.

## Design language

- Soft Morandi neutrals: grey, sage, dusty rose, blue-grey, taupe, lilac
- Rounded surfaces and minimal borders
- Chibi grey cat as the visual centre
- Slow, calming motion rather than energetic motion
- Black/dark-grey timer typography
- No noisy gradients, neon colours or aggressive gamification

## Core user flow

1. User lands on home screen.
2. Existing active tasks appear as floating yarn balls around the cat.
3. User clicks the bottom-right add paw.
4. User enters task name, deadline, duration, category, notes and optional file metadata.
5. User may save or start immediately.
6. Focus screen begins counting elapsed time.
7. When the configured duration is reached, show an in-app paw reminder and browser notification.
8. User can return and click “我弄完了！”.
9. Feeding scene appears.
10. User adds food three times.
11. Cat eats for five seconds.
12. Task becomes completed and user returns home.

## Task model

- id
- name
- deadline
- durationHours
- category
- notes
- attachments metadata
- status
- createdAt
- completedAt

## Timer behaviour

- Persist timer state in localStorage.
- Derive elapsed time from timestamps instead of increment-only counters.
- Support pause/resume.
- Refreshing the page must not reset active timer progress.
- Only one active timer in v1.

## Filter behaviour

Duration ranges:

- 1–2
- 3–4
- 5–8
- 9–10
- 11–12
- 13–14
- 15–16 hours

Also filter by exact deadline date and status.

## Browser limitations

A web application cannot reliably show a custom always-on-top paw above arbitrary desktop apps after the browser is closed. v1 uses Web Notifications plus an in-app reminder. Electron/Tauri is the intended route for the full desktop behaviour.

## Privacy

- No account required.
- No remote backend in v1.
- Task data stays in the user's local browser storage.
- Attached file contents are not uploaded.
