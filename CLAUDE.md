# Rainbow Beats — js13kGames 2026

A music rhythm game for [js13kGames 2026](https://js13kgames.com/2026) (theme: **"Unicorns and Rainbows"**).
Player presses 4–5 keys in time with the music; a pixel unicorn and its rider gallop through a world that
erupts into rainbow color as the combo grows.

## Hard constraints

- Final zip must be **≤ 13,312 bytes** (13 KB). See `docs/TECH-NOTES.md` for the byte budget.
- Deadline: **~September 13, 2026**. Milestones in `docs/MILESTONES.md`.
- Boilerplate: `roblouie/js13k-typescript-starter` (Vite + TypeScript + Terser + Roadroller + ECT).

## Collaboration rules — READ FIRST

- **The user writes ALL game code.** Claude is a brainstorming and technical partner only.
- Claude must **never** create or edit files in `src/`, `index.html`, `style.css`, or any build config.
- Claude **may** create and maintain tracking docs (`docs/*.md`, this file) when asked.
- Appropriate Claude roles: discussing design, explaining Web Audio / timing / compression concepts,
  reviewing code the user pastes, brainstorming, playing devil's advocate, updating trackers on request.
- When the user asks "how would I do X", answer with explanations, sketches, and pseudocode in chat —
  not by writing files.
