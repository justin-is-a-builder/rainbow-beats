# Rainbow Beats — Design Doc (living brainstorm)

> Status: BRAINSTORM. Nothing here is final. Strike through, annotate, argue.

## Elevator pitch

A pixel unicorn and its rider gallop across a twilight plain. Notes fly down a 4–5 lane
highway; hit them in time and the world ignites — rainbows, aurora skies, prismatic
trails. Drop the combo and the color drains away. Ride the song perfectly and become
a supernova.

## Design pillars

1. **Music is the world.** The song data is the single source of truth — it drives the
   audio *and* the note chart *and* the background pulse. (Also a huge byte-saving trick.)
2. **Combo = color.** The visual spectacle IS the score. No abstract numbers needed on
   screen beyond a tiny score — the player should *feel* their combo in the saturation.
3. **Readable at a glance.** Pixel-art clarity: lanes, hit line, and judgement feedback
   must read instantly even during maximum rainbow chaos.

## Core loop

- The unicorn gallops along a winding track (*A Dance of Fire and Ice*-inspired — see
  "Track concept" below), camera following, one beat-tile at a time.
- Press the matching key within the timing window → judgement: PERFECT / GOOD / MISS.
- Combo increments on PERFECT/GOOD, resets on MISS.
- Combo tier drives the visual state of the entire scene (see below).

## Track concept — "ADOFAI fusion" → LOCKED ✅ (Aug 20)

**Decision: Option A — Gates on the track.** The unicorn auto-gallops a winding
rainbow road (one tile per beat, camera following); playable beat-tiles carry one of
4 gate symbols (◆ ✚ ▲ ● = D F J K); press the gate's key the instant a hoof lands.
Track directions come from a **seeded deterministic walk derived from the song data** —
same song, same road every run, so players memorize roads like ADOFAI levels.

Options B (forks) and C (full ADOFAI angle-timing) kept below for the record.

- **A. Gates on the track.** ✅ CHOSEN. Playable beat-tiles carry one of 4 gate symbols
  (◆ ✚ ▲ ● = D F J K). Press the gate's key the instant a hoof lands on its tile.
  The audio grid owns timing; track geometry decoratively mirrors rhythm density.
- **B. Forks are the keys.** At each beat the path forks into up to 4 branches;
  DFJK steers the unicorn down the charted branch. Wrong key = stumble off.
  Dramatic, but pricier to render and chart (every fork draws all 4 branches).
- **C. Full ADOFAI timing.** Turn angle between tiles = time until next note
  (straight = 1 beat, 90° = ½ beat…), gates still say *which* key. Most elegant —
  you literally see the rhythm — but hardest to author without custom tooling.

Whichever wins: the track is a literal **rainbow road** through a starfield (theme
jackpot), and the layout is *generated from song data*, never hand-drawn art.

## Controls — LOCKED ✅ (Aug 20)

**D F J K, four inputs, taps only for v1.** Home-row standard for 4k rhythm games.
(Post-submission ideas: 5th input on Space, hold notes.)

## Judgement windows (starting values, tune by feel)

- PERFECT: ±45 ms → +300 pts, combo +1
- GOOD: ±90 ms → +100 pts, combo +1
- MISS: outside window or unpressed note → combo resets, color drains
- Score multiplier grows with combo tier (x1 → x2 → x4 → x8)

## Visual escalation tiers (the heart of the game)

| Tier | Combo | Visual state |
|---|---|---|
| 0 | 0–9 | Muted dusk palette, faint stars, unicorn trots |
| 1 | 10–24 | Pastel sky, rainbow trail appears behind unicorn |
| 2 | 25–49 | Saturated sky gradient, aurora bands, ground sparkles |
| 3 | 50–99 | Full rainbow rave: hue-cycling background, beat-synced flashes |
| 4 | 100+ | SUPERNOVA: screen pulses white→rainbow every beat, unicorn leaves prismatic afterimages |

- Beat-synced screen flash: cheap to do via palette swap or canvas `globalCompositeOperation`.
- MISS = brief desaturation "record scratch" moment. Painful but fair.

## Characters

- **Unicorn**: ~16×16 or 24×16 px sprite. Gallop cycle synced to BPM (leg position on beat = free juice).
  Mane/tail colors cycle with the rainbow at high tiers.
- **Rider**: sits on top, leans forward on PERFECT streaks, wobbles after a MISS.
  Silhouette = readable pose, 2–3 frames max.
- Sprites as string-map pixel data (rows of palette indices) — tiny and hand-editable.

## Audio approach (the biggest technical risk — spike early)

- No audio files — everything synthesized with the Web Audio API at runtime.
- Tiny tracker: song = arrays of note numbers per channel (kick / bass / hat / lead).
  Oscillators + noise buffer + simple envelopes.
- **Master clock = `audioCtx.currentTime`.** Never time notes off `requestAnimationFrame`
  or `Date.now()`. Schedule audio ahead with a lookahead scheduler; spawn visual notes
  from the same timeline. This is THE make-or-break architectural decision.
- Chiptune vibe: square/triangle waves fit the pixel art and are the cheapest to synthesize.

## Songs (scope: 2–3 short loops, 45–75s each)

1. **"Twilight Trot"** — tutorial-ish, ~100 BPM, sparse charts
2. **"Prism Gallop"** — ~128 BPM, introduces off-beats and two-note chords
3. **"Supernova"** — ~150 BPM, dense, the finale

Chart data derived from the same note arrays that drive audio → zero duplication.

## Name candidates

- Rainbow Beats (repo name — solid)
- Neighon / Neigh-on-Beat
- Hoofbeat Hero
- Prism Runner

## Open questions parking lot

- [x] ~~Track mechanic~~ → **A. Gates on the track** (Aug 20)
- [x] ~~4 or 5 lanes?~~ → 4 keys (DFJK), taps only for v1
- [ ] Gate identity: symbols, colors, or both? Lean: **symbols** — colorblind-safe and
      still readable during the SUPERNOVA rainbow chaos
- [ ] What does a HIT look like? (unicorn leaps through the gate? rider fist-pump?)
      And a MISS (gate shatters? unicorn stumbles, color drains)?
- [ ] Fail state: song just ends and score is shown, or can you "fall off"?
- [ ] Any progression between songs (menu → song select) or one continuous medley?
- [ ] Mobile/touch support? (js13k has a mobile category — but adds scope. Maybe skip v1.)
