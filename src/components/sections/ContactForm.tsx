// Formularz „Umów bezpłatną rozmowę”. Zgłoszenia zbiera Netlify Forms: statyczna
// kopia formularza do wykrycia przy wdrożeniu jest w index.html, poza Reactem.
// Gdy wysyłka się nie uda, wpisane dane zostają w polach, a obok jest adres e-mail.
import * as React from 'react';
import { Check } from 'lucide-react';
import { CONTACT_EMAIL, PRIVACY_URL } from '@/lib/site';

declare global {
  interface Window {
    plausible?: (event: string) => void;
  }
}

const FORM_NAME = 'rozmowa';

type FieldName = 'imie' | 'firma' | 'kontakt';
type Errors = Partial<Record<FieldName, string>>;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (!values.imie) errors.imie = 'Wpisz imię.';
  if (!values.firma) errors.firma = 'Wpisz nazwę firmy.';
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.kontakt);
  const isPhone = /^[+\d\s()./-]+$/.test(values.kontakt) && values.kontakt.replace(/\D/g, '').length >= 9;
  if (!isEmail && !isPhone) errors.kontakt = 'Wpisz numer telefonu (min. 9 cyfr) albo adres e-mail.';
  return errors;
}

function Field({
  name,
  label,
  autoComplete,
  error,
}: {
  name: FieldName;
  label: string;
  autoComplete: string;
  error?: string;
}) {
  const errorId = `${name}-blad`;
  return (
    <div>
      <label htmlFor={name} className="block text-[13px] font-medium text-ink/72 mb-1.5">
        {label}
      </label>
      {/* 16 px: mniejszy tekst w polu powiększa stronę na iPhonie po dotknięciu. */}
      <input
        id={name}
        name={name}
        type="text"
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl border bg-cream px-4 py-3 text-[16px] text-ink transition-colors focus:bg-white focus:outline-2 focus:outline-offset-0 focus:outline-blu ${
          error ? 'border-red' : 'border-ink/8'
        }`}
      />
      {error && (
        <p id={errorId} className="text-[13px] text-red mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = React.useState<Errors>({});
  const [sentName, setSentName] = React.useState('');
  const doneRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (status === 'sent') doneRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? '').trim();
    const values = { imie: text('imie'), firma: text('firma'), kontakt: text('kontakt') };

    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(values) as FieldName[]).find((key) => found[key]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLInputElement).focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': FORM_NAME, ...values, 'bot-field': text('bot-field') }).toString(),
      });
      if (!response.ok) throw new Error(`Formularz: ${response.status}`);
      setSentName(values.imie);
      setStatus('sent');
      window.plausible?.('Formularz rozmowy');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div ref={doneRef} tabIndex={-1} className="rounded-[20px] bg-white text-ink p-8 text-center outline-none">
        <span className="mx-auto w-11 h-11 rounded-full bg-grn-tint text-[#1d5c0c] flex items-center justify-center">
          <Check size={20} strokeWidth={2.25} aria-hidden />
        </span>
        <h3 className="text-[20px] font-medium tracking-[-0.02em] mt-4">Dziękujemy, {sentName}!</h3>
        <p className="text-[15px] text-ink/64 leading-relaxed mt-2">
          Odezwiemy się tego samego dnia i umówimy krótką rozmowę o Twojej firmie.
        </p>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      noValidate
      onSubmit={onSubmit}
      className="relative rounded-[20px] bg-white text-ink p-7 max-[767px]:p-5 text-left flex flex-col gap-4"
    >
      {/* Pole-pułapka na boty: człowiek go nie widzi. */}
      <p aria-hidden className="absolute -left-[9999px]">
        <label>
          Nie wypełniaj tego pola
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Field name="imie" label="Imię" autoComplete="given-name" error={errors.imie} />
      <Field name="firma" label="Nazwa firmy" autoComplete="organization" error={errors.firma} />
      <Field name="kontakt" label="Telefon lub e-mail" autoComplete="tel" error={errors.kontakt} />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-1 w-full rounded-full bg-blu text-white font-medium text-[15px] px-6 py-3.5 cursor-pointer transition-colors duration-300 hover:bg-ink disabled:opacity-60 disabled:cursor-default"
      >
        {status === 'sending' ? 'Wysyłam…' : 'Umów bezpłatną rozmowę'}
      </button>

      <div aria-live="polite">
        {status === 'error' && (
          <p className="text-[14px] text-red leading-relaxed">
            Nie udało się wysłać. Spróbuj jeszcze raz albo napisz na{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
      </div>

      <p className="text-[13px] text-ink/48 leading-relaxed">
        Bez zobowiązań. Dane wykorzystamy tylko, żeby się z Tobą skontaktować.
        {PRIVACY_URL && (
          <>
            {' '}
            <a href={PRIVACY_URL} className="underline underline-offset-2 hover:text-ink">
              Polityka prywatności
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
