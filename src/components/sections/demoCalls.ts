// Nagrania przykładowych rozmów do sekcji „Posłuchaj". Głosy z Higgsfield
// (Seed Audio): Receply — Daisy; klienci — Holden, Brielle, Faye i Dylan,
// przepuszczeni przez filtr pasma telefonicznego (ffmpeg). Teksty to
// jednocześnie transkrypcje; czasy (s) i obwiednie fali (RMS w 96
// przedziałach) policzone z gotowych plików mp3.
import { BellRing, CalendarCheck, CalendarClock, CalendarX, Inbox, PhoneIncoming, Receipt, type LucideIcon } from 'lucide-react';

export type CallLine = { from: 'receply' | 'klient'; text: string; start: number; end: number };

export type CallScenario = {
  id: string;
  tab: string;
  caller: string;
  audio: string;
  duration: number;
  lines: CallLine[];
  wave: number[];
  outcomes: {
    icon: LucideIcon;
    title: string;
    detail: string;
    chip: { tone: 'green' | 'blue' | 'neutral'; label: string };
    at: number;
  }[];
  stat: { value: string; text: string };
};

const GREETING = 'Salon Anna, dzień dobry! W czym mogę pomóc?';

export const CALLS: CallScenario[] = [
  {
    id: 'rezerwacja',
    tab: 'Rezerwacja',
    caller: '+48 512 *** 204',
    audio: '/audio/rozmowa-salon-anna.mp3',
    duration: 25.75,
    lines: [
      { from: 'receply', text: GREETING, start: 0.3, end: 3.54 },
      { from: 'klient', text: 'Dzień dobry, chciałbym umówić strzyżenie. Macie coś jutro po południu?', start: 3.99, end: 9.22 },
      { from: 'receply', text: 'Jutro mamy wolne 15:30 i 17:00. Która godzina panu pasuje?', start: 9.67, end: 15.7 },
      { from: 'klient', text: '17:00 będzie idealnie.', start: 16.15, end: 18.69 },
      { from: 'receply', text: 'Zapisane — jutro o 17:00. Dzień wcześniej wyślemy SMS-a z przypomnieniem. Do zobaczenia!', start: 19.14, end: 25.35 },
    ],
    wave: [
      0.08, 0.93, 0.8, 0.83, 0.76, 0.93, 0.43, 0.15, 0.08, 0.69, 0.9, 0.78, 0.22, 0.08, 0.08, 0.49, 0.66, 0.13, 0.08, 0.56,
      0.91, 0.73, 0.5, 0.43, 0.57, 0.12, 0.08, 0.43, 0.66, 0.56, 0.57, 0.85, 0.66, 0.52, 0.26, 0.08, 0.9, 0.95, 0.9, 0.72,
      0.63, 0.77, 0.69, 0.55, 0.86, 0.14, 0.22, 0.08, 0.85, 0.85, 0.74, 0.54, 1.0, 0.73, 0.76, 0.91, 0.43, 0.42, 0.25, 0.08,
      0.47, 0.73, 0.54, 0.17, 0.73, 0.36, 0.35, 0.7, 0.64, 0.12, 0.08, 0.88, 0.74, 0.62, 0.77, 0.75, 0.81, 0.27, 0.08, 0.56,
      0.76, 0.81, 0.62, 0.88, 0.74, 0.72, 0.66, 0.78, 0.57, 0.26, 0.08, 0.9, 0.87, 0.51, 0.19, 0.08,
    ],
    outcomes: [
      { icon: CalendarCheck, title: 'Wizyta w kalendarzu', detail: 'Strzyżenie · jutro 17:00 · Tomasz', chip: { tone: 'green', label: 'Zapisano' }, at: 19.14 },
      { icon: BellRing, title: 'Przypomnienie SMS', detail: 'Wysyłka dzień przed wizytą', chip: { tone: 'blue', label: 'Zaplanowane' }, at: 21.8 },
      { icon: Inbox, title: 'Podsumowanie dla Ciebie', detail: 'Tomasz umówił strzyżenie na jutro, 17:00.', chip: { tone: 'neutral', label: 'Wysłano' }, at: 25.35 },
    ],
    stat: { value: '26 s', text: 'od telefonu do wizyty w kalendarzu. Bez odkładania nożyczek.' },
  },
  {
    id: 'cena',
    tab: 'Pytanie o cenę',
    caller: '+48 600 *** 117',
    audio: '/audio/rozmowa-cena.mp3',
    duration: 31.08,
    lines: [
      { from: 'receply', text: GREETING, start: 0.3, end: 3.54 },
      { from: 'klient', text: 'Dzień dobry, ile kosztuje u was koloryzacja?', start: 3.99, end: 9.2 },
      { from: 'receply', text: 'Koloryzacja kosztuje od 250 zł, zależnie od długości włosów, i trwa około 2 godzin.', start: 9.65, end: 17.53 },
      { from: 'klient', text: 'A macie coś wolnego w sobotę?', start: 17.98, end: 19.79 },
      { from: 'receply', text: 'W sobotę mamy wolne o 10:00. Zapisać panią?', start: 20.24, end: 24.99 },
      { from: 'klient', text: 'Tak, poproszę.', start: 25.44, end: 26.56 },
      { from: 'receply', text: 'Gotowe — koloryzacja w sobotę o 10:00. Do zobaczenia!', start: 27.01, end: 30.68 },
    ],
    wave: [
      0.08, 0.91, 0.87, 0.68, 0.95, 0.41, 0.08, 0.6, 0.85, 0.72, 0.14, 0.08, 0.9, 0.87, 0.49, 0.08, 0.08, 0.6, 0.94, 0.79,
      0.98, 0.65, 0.08, 0.08, 0.08, 0.64, 0.85, 0.62, 0.43, 0.08, 0.93, 0.87, 0.41, 0.77, 0.41, 0.75, 0.62, 0.75, 0.27, 0.08,
      0.81, 0.7, 0.61, 0.74, 0.7, 0.25, 0.08, 0.25, 0.92, 0.61, 0.56, 0.6, 0.69, 0.26, 0.08, 0.58, 0.68, 0.86, 0.75, 0.69,
      0.82, 0.08, 0.17, 1.0, 0.83, 0.86, 0.79, 0.57, 0.62, 0.53, 0.23, 0.08, 0.08, 0.83, 0.9, 0.41, 0.69, 0.11, 0.74, 0.62,
      0.8, 0.55, 0.08, 0.67, 0.88, 0.57, 0.78, 0.8, 0.76, 0.79, 0.55, 0.32, 0.46, 0.66, 0.21, 0.08,
    ],
    outcomes: [
      { icon: Receipt, title: 'Cena z Twojego cennika', detail: 'Koloryzacja od 250 zł · ok. 2 h', chip: { tone: 'blue', label: 'Baza wiedzy' }, at: 9.65 },
      { icon: CalendarCheck, title: 'Wizyta w kalendarzu', detail: 'Koloryzacja · sobota 10:00', chip: { tone: 'green', label: 'Zapisano' }, at: 27.01 },
      { icon: Inbox, title: 'Podsumowanie dla Ciebie', detail: 'Nowa wizyta: koloryzacja, sobota 10:00.', chip: { tone: 'neutral', label: 'Wysłano' }, at: 30.68 },
    ],
    stat: { value: '31 s', text: 'od pytania o cenę do zapisanej wizyty. Pytanie o cenę to często gotowy klient.' },
  },
  {
    id: 'przelozenie',
    tab: 'Przełożenie wizyty',
    caller: '+48 793 *** 552',
    audio: '/audio/rozmowa-przelozenie.mp3',
    duration: 25.61,
    lines: [
      { from: 'receply', text: GREETING, start: 0.3, end: 3.54 },
      { from: 'klient', text: 'Dzień dobry, tu Karolina Nowak. Mam wizytę we wtorek o 15:00, ale niestety nie dam rady. Da się przełożyć?', start: 3.99, end: 11.88 },
      { from: 'receply', text: 'Oczywiście, pani Karolino. Mogę zaproponować czwartek o 15:00 albo piątek o 11:00.', start: 12.33, end: 18.41 },
      { from: 'klient', text: 'To poproszę czwartek.', start: 18.86, end: 19.9 },
      { from: 'receply', text: 'Przełożone na czwartek, 15:00. Dziękuję, że pani dała znać. Do zobaczenia!', start: 20.35, end: 25.21 },
    ],
    wave: [
      0.08, 0.98, 0.83, 0.89, 0.8, 1.0, 0.46, 0.16, 0.08, 0.72, 0.95, 0.81, 0.28, 0.08, 0.08, 0.83, 0.92, 0.22, 0.43, 0.92,
      0.59, 0.24, 0.08, 0.08, 0.89, 0.81, 0.8, 1.0, 0.57, 0.54, 0.28, 0.19, 0.08, 0.58, 0.52, 0.68, 0.81, 0.62, 0.17, 0.08,
      0.08, 0.61, 0.55, 0.66, 0.1, 0.08, 0.74, 0.61, 0.63, 0.75, 0.95, 0.35, 0.12, 0.08, 0.94, 0.8, 0.75, 0.81, 0.94, 0.53,
      0.63, 0.82, 0.86, 0.69, 0.78, 0.62, 0.8, 0.46, 0.34, 0.08, 0.34, 0.73, 0.44, 0.5, 0.15, 0.08, 0.97, 0.96, 0.83, 0.88,
      0.55, 0.61, 0.3, 0.08, 0.08, 0.81, 0.8, 0.95, 0.94, 0.82, 0.3, 0.57, 0.95, 0.58, 0.2, 0.08,
    ],
    outcomes: [
      { icon: CalendarClock, title: 'Termin przeniesiony', detail: 'wtorek 15:00 → czwartek 15:00', chip: { tone: 'blue', label: 'Przełożona' }, at: 20.35 },
      { icon: CalendarX, title: 'Wtorek 15:00 znów wolny', detail: 'Termin wraca do rezerwacji', chip: { tone: 'green', label: 'Zwolniony' }, at: 21.2 },
      { icon: Inbox, title: 'Podsumowanie dla Ciebie', detail: 'Pani Karolina przełożyła wizytę z wtorku na czwartek, 15:00.', chip: { tone: 'neutral', label: 'Wysłano' }, at: 25.21 },
    ],
    stat: { value: '26 s', text: 'na przełożenie wizyty. Zwolniony termin od razu wraca do kalendarza.' },
  },
  {
    id: 'po-godzinach',
    tab: 'Po godzinach',
    caller: 'niedziela, 21:15',
    audio: '/audio/rozmowa-po-godzinach.mp3',
    duration: 29.71,
    lines: [
      { from: 'receply', text: 'Salon Anna, dobry wieczór! W czym mogę pomóc?', start: 0.3, end: 4.98 },
      { from: 'klient', text: 'Dobry wieczór, wiem, że już późno. Jest jutro rano coś wolnego na strzyżenie męskie?', start: 5.43, end: 10.9 },
      { from: 'receply', text: 'Nic nie szkodzi, odbieramy o każdej porze. Jutro mamy wolne o 9:00 i 10:30. Która godzina pasuje?', start: 11.35, end: 21.69 },
      { from: 'klient', text: '9:00 będzie super.', start: 22.14, end: 23.75 },
      { from: 'receply', text: 'Zapisane: strzyżenie męskie, jutro o 9:00. Miłego wieczoru!', start: 24.2, end: 29.31 },
    ],
    wave: [
      0.08, 0.92, 0.79, 0.21, 0.08, 0.7, 0.72, 0.55, 0.18, 0.08, 0.08, 0.69, 0.76, 0.7, 0.7, 0.22, 0.08, 0.56, 0.78, 0.43,
      0.08, 0.65, 0.65, 0.36, 0.21, 0.08, 0.58, 0.56, 0.92, 0.43, 0.86, 0.58, 0.61, 0.52, 0.58, 0.08, 0.75, 0.85, 0.71, 0.4,
      0.12, 0.08, 0.87, 0.83, 0.77, 0.71, 0.71, 0.24, 0.08, 0.22, 0.82, 0.9, 0.83, 0.83, 0.72, 0.56, 0.86, 0.66, 0.59, 0.66,
      0.82, 0.67, 0.33, 0.08, 0.08, 1.0, 0.8, 0.71, 0.5, 0.72, 0.08, 0.37, 0.62, 0.83, 0.46, 0.35, 0.33, 0.08, 0.71, 0.81,
      0.42, 0.74, 0.57, 0.58, 0.45, 0.85, 0.63, 0.32, 0.2, 0.08, 0.08, 0.39, 0.73, 0.6, 0.26, 0.08,
    ],
    outcomes: [
      { icon: PhoneIncoming, title: 'Odebrane po godzinach', detail: 'Niedziela 21:15 — salon zamknięty', chip: { tone: 'blue', label: '24/7' }, at: 0.3 },
      { icon: CalendarCheck, title: 'Wizyta w kalendarzu', detail: 'Strzyżenie męskie · jutro 9:00', chip: { tone: 'green', label: 'Zapisano' }, at: 24.2 },
      { icon: Inbox, title: 'Podsumowanie na rano', detail: 'Czeka na Ciebie, kiedy otworzysz salon.', chip: { tone: 'neutral', label: 'Wysłano' }, at: 29.31 },
    ],
    stat: { value: '21:15', text: 'w niedzielę. Salon zamknięty, a klient i tak umówiony na rano.' },
  },
];
