# Technical Notes — byte budget & rhythm-game engineering

## The 13 KB budget

Limit: **13,312 bytes zipped** (that's the *compressed* size — Roadroller + ECT in this
starter do heavy lifting). Rough mental budget to keep you honest as you build:

| System | Est. zipped bytes | Notes |
|---|---|---|
| HTML + CSS shell | 400–600 | Keep the shell nearly empty; draw everything on canvas |
| Core engine (loop, input, state) | 1,500–2,500 | |
| Rhythm/judgement + highway render | 1,500–2,000 | |
| Audio synth + scheduler | 2,000–3,000 | The star of the show — don't skimp |
| Song/chart data (3 songs) | 1,000–2,000 | Compress by *deriving* charts from music data |
| Sprites (unicorn, rider, effects) | 800–1,500 | String-map pixels, shared palettes |
| **Reserve / slush** | ~2,000 | You WILL need it |

Size workflow: `npm run build` shows output size; `npm run find-best-roadroller` searches
Roadroller configs; check the *zipped* artifact, not the raw bundle. Measure early, measure
often — a size surprise on Sep 10 is how entries die.

## Rhythm-game timing rules (hard-won wisdom)

1. **`audioCtx.currentTime` is the only clock.** `requestAnimationFrame` and `Date.now()`
   drift and jitter; audio time is sample-accurate. Note positions each frame =
   `f(noteTime - audioCtx.currentTime)`.
2. **Lookahead scheduler**: a `setInterval` (~25 ms) schedules all notes whose time falls
   within the next ~100–150 ms. Never schedule audio from inside the render loop.
3. **Judge input against audio time too**: on keydown, read `audioCtx.currentTime`,
   compare to nearest note time, apply window. Input latency on keyboard is small but
   nonzero — tune the windows by feel, and consider a small global input-offset constant.
4. **One source of truth for songs**: the same note arrays drive the synth *and* spawn
   the highway notes. If a channel's note is "playable," flag it in the data. This saves
   a whole chart file's worth of bytes and guarantees sync by construction.
5. **Autoplay policy**: `AudioContext` starts suspended; create/resume it on the first
   keypress/click (your title screen "press any key" handles this for free).

## Byte-saving tricks that fit this design

- Pixel sprites as strings: `"00011000"` rows → palette lookup. Hand-editable, tiny.
- Palette swaps over new sprites: hue-rotate via precomputed palettes or composite ops.
- Reuse one noise buffer for hat/snare/scratch; shape with filters + envelopes.
- Note data as packed numbers (e.g. step index + pitch in one byte) — but only pack
  *after* the game works; Roadroller compresses readable arrays surprisingly well.
- Don't import ZzFX/sound libraries blindly — a hand-rolled 4-voice synth you control
  may compress better and you only pay for what you use. Evaluate both in M1.

## Track & movement (ADOFAI-style)

- **Beat-locked movement**: the unicorn doesn't move continuously — it hops tile to
  tile, one tile per step of the song grid, with a little interpolation for the gallop.
  Position becomes a pure function of song time → perfect sync for free.
- **Camera follow**: translate the canvas so the current tile sits center; lerp for
  smoothness. One `ctx.translate`, huge ADOFAI feel.
- **Quantize track tiles to 8 directions** (45° increments): each tile = a direction
  code (0–7) + optional gate type (0–3). A whole track becomes two tiny arrays.
- Judging is unchanged: gate tiles are just notes; `audioCtx.currentTime` still rules.

## Composing your first chiptune (M1 cheat sheet)

- **Sketch in [BeepBox](https://beepbox.co) first** — free browser chiptune tracker.
  See your loop as note data, iterate by ear, THEN transcribe the idea into your own
  tiny format. Don't compose by typing numbers into a file cold.
- **Think in patterns**: 4 bars × 16 steps (16th-note grid) = one pattern.
  A song = 3–5 patterns with small variations. Loops are a feature, not a cop-out.
- **Build voices in this order**: drums (kick on quarter notes, hat on off-8ths) →
  bass (root note of each chord, mostly 8ths) → lead LAST.
- **Melody cheat code**: A minor pentatonic (A C D E G) — almost any sequence sounds
  fine over A minor. Repetition with one note changed per bar reads as musicality.
- **Progression cheat code**: Am–F–C–G, one chord per bar. Four chords, infinite songs.
- Voices = oscillator + volume envelope: kick = sine with fast pitch drop, hat = short
  filtered noise, bass = triangle/square, lead = square + slight vibrato.

## Known risks

| Risk | Mitigation |
|---|---|
| Audio sync drifts/jitters | M1 spike proves the scheduler before anything else |
| Rainbow visuals tank framerate | Palette/composite tricks only; no per-pixel filters; test on a weak machine |
| 3 songs don't fit | 2 songs is fine; medley structure means song 3 is a bonus |
| Scope creep (hold notes, mobile, extra modes) | Taps-only 4-lane desktop v1. Everything else is post-submission. |
