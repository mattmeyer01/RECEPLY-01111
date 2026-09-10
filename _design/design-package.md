# Design package — Receply

## 1. Producer
- Tier 1: one continuous 6s generated shot, scrubbed by scroll.
- Segments: 1 video + 1 start frame + 3 supporting stills.
- Budget: start frame ~2 cr, video 10-55 cr (model chosen with user), 3 stills ~6 cr.
- Assets: none supplied. Everything generated. Footer discloses pre-launch demo.
- Mobile: designed static hero (poster frame). Video on desktop only.

## 2. Researcher
Audience: Polish beauty salons, barbers, cosmetology, physio, small clinics.

Buyer language (verbatim themes from research):
- "Telefon dzwoni, kiedy mam rece w farbie." 15-30 calls/day mid-treatment.
- "Instagram to druga recepcja." Price / free slot / duration / contraindication
  questions arrive in the evening, at weekends, mid-treatment.
- A missed call does not come back. Most callers do not leave a message.
- No-shows and last-minute cancellations. Many just forgot; a reminder solves it.

Objections to disarm: sounds like a robot; client will be offended; hard to set up;
does it work with Booksy; what about my clients' data / RODO.

ONE call to action: join the early access list (email).

## 3. Storyboard (single shot, 6s)
World: deep ink-navy void, volumetric haze, one electric-blue glass ribbon shaped
like a voice waveform. Camera flies forward along the ribbon. Mid-shot the ribbon
separates into three parallel light threads (call, message, calendar) that weave
back together into one calm glowing ring. The ring settles left of centre and
breathes. Action lane: left third. Text lane: right two thirds.

Beat map (scroll bands):
1. 0-15%   "Telefon dzwoni."            / "Masz rece w farbie."
2. 15-38%  "Klientka nie zostawia wiadomosci." / "Dzwoni do salonu obok."
3. 38-62%  "Instagram to Twoja druga recepcja." / "I tez nikt jej nie pilnuje."
4. 62-84%  "Receply odbiera. Zawsze."   / "Telefon, Instagram, Messenger. Jeden glos."
5. 84-100% SETTLE: "Recepcja, ktora nigdy nie ma wolnego." + CTA
(Ranges are starting points, validated by the flick test.)

## 4. Prompts
Start frame: abstract blue waveform ribbon, ink-navy void, right two thirds empty,
no text no logos no people.
Motion: slow forward dolly along the ribbon; ribbon splits into three threads and
weaves into a single glowing ring; camera decelerates; final frame rests on the
ring, left of centre, breathing glow.

## 5. Designer
Palette (from the footage world):
  --ink      #0A0E1A   canvas, never pure black
  --ink-2    #121829   raised surfaces
  --ink-3    #1C2440   borders / hairlines
  --ivory    #F2EFE9   primary text, warm not white
  --muted    #97A1BC   secondary text
  --blue     #3D6BFF   accent, rare doses
  --blue-lo  #8FB0FF   accent text on dark
  --mint     #7BE5B0   success / confirmations only

Type trio:
  Display: Bricolage Grotesque (character, full Polish diacritics)
  Body:    Hanken Grotesk
  Mono:    Martian Mono (small uppercase labels)

Motif system: the waveform. Recurs as section dividers (drawn SVG that draws itself
on scroll), as the bullet marker, as the loading ring, and as the underline on the
active nav item.

Signature element: a hand-drawn SVG waveform line that stitches the whole page
together, drawing itself section by section as the visitor scrolls.

Vector layer: fixed background environment layer of drifting particles at whisper
level plus a soft radial blue glow that follows section changes.

## 6. Website producer (below the fold)
1. Trust bar (mono labels): Dane w UE / Zgodnosc z RODO / Bez umowy / Integracja z Booksy
2. Koszt nieodebranego telefonu (three counters, buyer language)
3. Jak to dziala (3 steps, each with its own generated still)
4. Co Receply obsluguje (grid of capabilities)
5. Interactive moment: playable call transcript, visitor presses play, the
   conversation types itself out, booking lands in the calendar
6. Integracje (Booksy, Google Calendar, Instagram, Messenger, telefon)
7. Cennik (3 honest tiers, pre-launch pricing)
8. FAQ (the five objections above, answered plainly)
9. Final CTA: early access form + footer with the demo disclosure

## 7. Gatekeeper
Storyboard approved -> image check -> video gate -> self-test -> live verify.
