# Milestones — Rainbow Beats

Competition window: **Aug 13 – Sep 13, 2026**. Today: Aug 20 → **~24 days left.**
Internal targets leave ~4 days of buffer before the real deadline.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

## M0 — Setup ✅ (done Aug 19)
- [x] Boilerplate from js13k-typescript-starter running
- [x] Dev server + production build verified

## M1 — Audio engine (target: Aug 24)
> The riskiest system. If the music isn't solid, nothing else matters.
- [~] Web Audio context bootstrap (handle autoplay policy: start on first input)
- [~] Lookahead scheduler running off `audioCtx.currentTime`
- [ ] 4 instrument voices: kick, bass, hat, lead (oscillators + noise + envelopes)
- [ ] Song data format v1 (note arrays per channel) + one loop playing end-to-end
- [ ] First-time composer on-ramp: sketch 1–2 loops in BeepBox (browser chiptune
      tracker) to learn what a good 4-bar loop looks like before finalizing the format
- [ ] Beat → visual pulse hook (prove the master clock can drive graphics)

## M2 — Core rhythm gameplay (target: Aug 28)
- [ ] Track rendering (winding path of beat-tiles, camera follow) + gate/note markers
- [ ] Deterministic track generator: seeded direction-walk derived from song data
- [ ] Chart spawner reading from song data
- [ ] Keyboard input (D F J K) with press feedback on the gates
- [ ] Judgement: PERFECT / GOOD / MISS windows, combo counter, score
- [ ] MISS feedback (visual + audio duck)

## M3 — Characters & visual escalation (target: Sep 1)
- [ ] Unicorn gallop sprite (string-map pixels), legs synced to beat
- [ ] Rider sprite with 2–3 poses (neutral / lean / wobble)
- [ ] Combo tier system driving palette + effects (see GAME-DESIGN.md tiers)
- [ ] Rainbow trail + beat-synced background flash
- [ ] SUPERNOVA tier at 100+ combo

## M4 — Content & structure (target: Sep 5)
- [ ] Song 1 "Twilight Trot" charted
- [ ] Song 2 "Prism Gallop" charted
- [ ] Song 3 "Supernova" charted (if size budget allows)
- [ ] Title screen → song select → results screen flow
- [ ] Difficulty curve pass

## M5 — Polish & game feel (target: Sep 8)
- [ ] Screen shake / hit sparks / particle bursts (cheap ones)
- [ ] Sound effects beyond music (UI blips, miss scratch)
- [ ] Transitions between screens
- [ ] Playtest with a friend, tune judgement windows

## M6 — Size & submission build (target: Sep 10)
- [ ] `npm run build` + check zipped size — **must be ≤ 13,312 bytes**
- [ ] `npm run find-best-roadroller` / `build-with-best-roadroller` pass
- [ ] Test in Chrome + Firefox, clean profile
- [ ] Readable source pushed to GitHub (required by rules)

## M7 — Submit (target: Sep 11, hard deadline Sep 13)
- [ ] Submit zip + GitHub link on js13kgames.com
- [ ] 🦄🌈

## Session log
> One line per work session: date, what happened, next step. Keeps momentum visible.

- 2026-08-20 — Project kickoff, docs created. Locked: DFJK, 4 keys, taps only.
  Track concept: ADOFAI-style winding path (fusion options A/B/C being weighed).
  Next: pick track mechanic, start M1 audio spike.
- 2026-08-20 — Track mechanic locked: **A. Gates on the track**. All core design
  decisions now made → full speed on M1 audio spike.
- 2026-08-20 — M1 started: brainstormed bootstrap + lookahead scheduler architecture
  (two clocks; 25 ms tick / ~120 ms lookahead; absolute-time step grid; suspend = free
  pause). Next: spike context+resume on keypress, then a metronome loop.
- 2026-08-21 — Scheduler skeleton working: single lazy context, 25 ms tick / 120 ms
  buffer, clearInterval on stop, 16th-note grid at 120 BPM. Spike plays pitch-varying
  clicks. Next: channel-array song format + kick/hat voices (the dispatcher pivot).
