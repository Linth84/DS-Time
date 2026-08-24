import { useMemo, useRef, useState } from 'react'
import './App.css'

/* ============================================================
   DS-TIME
   App.tsx

   ÍNDICE
   ------------------------------------------------------------
   01. Tipos
   02. Locales
   03. Traducciones
   04. Formatos de timestamp
   05. Utilidades de idioma
   06. Utilidades de fecha y hora
   07. Preview de timestamps
   08. Preview del mensaje
   09. Componente principal
   10. JSX
   ============================================================ */


/* ============================================================
   01. TIPOS
   ============================================================ */

type Language =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'ja'

type TimestampCode =
  | 't'
  | 'T'
  | 'd'
  | 'D'
  | 'f'
  | 'F'
  | 'R'

type Translation = {
  languageName: string
  localTimeForEveryone: string

  heroEyebrow: string
  heroTitlePrimary: string
  heroTitleSecondary: string
  heroDescription: string

  chooseTime: string
  chooseFormat: string
  pasteDiscord: string

  dateTime: string
  now: string
  plus15: string
  plusHour: string
  tomorrow: string

  detectedTimezone: string
  timezoneDescription: string

  copy: string
  copied: string

  discordMessage: string

  buildMessage: string
  messageDescription: string
  messagePlaceholder: string

  insertTimestamp: string
  insertRelative: string

  copyMessage: string
  messageCopied: string

  templates: string

  raidTemplate: string
  meetingTemplate: string
  streamTemplate: string
  eventTemplate: string

  discordPreview: string

  builtFor: string
  invalidDate: string
}

type TimestampFormat = {
  code: TimestampCode

  label: Record<
    Language,
    string
  >

  description: Record<
    Language,
    string
  >
}


/* ============================================================
   02. LOCALES
   Controlan cómo se muestran fechas y horas en cada idioma.
   ============================================================ */

const localeMap: Record<
  Language,
  string
> = {
  en: 'en-US',
  es: 'es-AR',
  fr: 'fr-FR',
  de: 'de-DE',
  ja: 'ja-JP',
}


/* ============================================================
   03. TRADUCCIONES
   Todos los textos visibles de la aplicación.
   ============================================================ */

const translations: Record<
  Language,
  Translation
> = {

  /* ----------------------------------------------------------
     ENGLISH
     ---------------------------------------------------------- */

  en: {
    languageName: 'English',

    localTimeForEveryone:
      'Local time for everyone',

    heroEyebrow:
      'DISCORD TIMESTAMP GENERATOR',

    heroTitlePrimary:
      'One time.',

    heroTitleSecondary:
      ' Every timezone.',

    heroDescription:
      "Create Discord timestamps that automatically display in each person's local time.",

    chooseTime:
      'Choose your time',

    chooseFormat:
      'Choose a format',

    pasteDiscord:
      'Paste it into Discord',

    dateTime:
      'Date and time',

    now:
      'Now',

    plus15:
      '+15 min',

    plusHour:
      '+1 hour',

    tomorrow:
      'Tomorrow',

    detectedTimezone:
      'Detected timezone',

    timezoneDescription:
      'Discord will automatically convert this time for every person who sees it.',

    copy:
      'Copy',

    copied:
      'Copied!',

    discordMessage:
      'Hey everyone! Our event starts',

    buildMessage:
      'Build your Discord message',

    messageDescription:
      'Write your message and insert Discord timestamps wherever you need them.',

    messagePlaceholder:
      'Raid starts at...',

    insertTimestamp:
      'Insert date & time',

    insertRelative:
      'Insert relative time',

    copyMessage:
      'Copy message',

    messageCopied:
      'Message copied!',

    templates:
      'Quick templates',

    raidTemplate:
      'Raid at {time} — starts {relative}',

    meetingTemplate:
      'Meeting at {time} — starts {relative}',

    streamTemplate:
      'Stream starts at {time} — {relative}',

    eventTemplate:
      'Event at {time} — starts {relative}',

    discordPreview:
      'Discord preview',

    builtFor:
      'Built for global communities.',

    invalidDate:
      'Invalid date',
  },


  /* ----------------------------------------------------------
     ESPAÑOL
     ---------------------------------------------------------- */

  es: {
    languageName:
      'Español',

    localTimeForEveryone:
      'Hora local para todos',

    heroEyebrow:
      'GENERADOR DE TIMESTAMPS PARA DISCORD',

    heroTitlePrimary:
      'Una hora.',

    heroTitleSecondary:
      ' Todas las zonas.',

    heroDescription:
      'Creá timestamps de Discord que se muestran automáticamente en la hora local de cada persona.',

    chooseTime:
      'Elegí tu horario',

    chooseFormat:
      'Elegí un formato',

    pasteDiscord:
      'Pegalo en Discord',

    dateTime:
      'Fecha y hora',

    now:
      'Ahora',

    plus15:
      '+15 min',

    plusHour:
      '+1 hora',

    tomorrow:
      'Mañana',

    detectedTimezone:
      'Zona horaria detectada',

    timezoneDescription:
      'Discord convertirá automáticamente este horario para cada persona que lo vea.',

    copy:
      'Copiar',

    copied:
      '¡Copiado!',

    discordMessage:
      '¡Hola a todos! Nuestro evento comienza',

    buildMessage:
      'Armá tu mensaje para Discord',

    messageDescription:
      'Escribí tu mensaje e insertá timestamps de Discord donde los necesites.',

    messagePlaceholder:
      'Raid a las...',

    insertTimestamp:
      'Insertar fecha y hora',

    insertRelative:
      'Insertar tiempo relativo',

    copyMessage:
      'Copiar mensaje',

    messageCopied:
      '¡Mensaje copiado!',

    templates:
      'Plantillas rápidas',

    raidTemplate:
      'Raid a las {time} — empieza {relative}',

    meetingTemplate:
      'Reunión a las {time} — empieza {relative}',

    streamTemplate:
      'El stream comienza a las {time} — {relative}',

    eventTemplate:
      'Evento a las {time} — empieza {relative}',

    discordPreview:
      'Vista previa en Discord',

    builtFor:
      'Creado para comunidades globales.',

    invalidDate:
      'Fecha inválida',
  },


  /* ----------------------------------------------------------
     FRANÇAIS
     ---------------------------------------------------------- */

  fr: {
    languageName:
      'Français',

    localTimeForEveryone:
      'Heure locale pour tous',

    heroEyebrow:
      'GÉNÉRATEUR DE TIMESTAMPS DISCORD',

    heroTitlePrimary:
      'Une heure.',

    heroTitleSecondary:
      ' Tous les fuseaux.',

    heroDescription:
      "Créez des timestamps Discord qui s'affichent automatiquement dans l'heure locale de chaque personne.",

    chooseTime:
      'Choisissez votre heure',

    chooseFormat:
      'Choisissez un format',

    pasteDiscord:
      'Collez-le dans Discord',

    dateTime:
      'Date et heure',

    now:
      'Maintenant',

    plus15:
      '+15 min',

    plusHour:
      '+1 heure',

    tomorrow:
      'Demain',

    detectedTimezone:
      'Fuseau horaire détecté',

    timezoneDescription:
      "Discord convertira automatiquement cette heure pour chaque personne qui la verra.",

    copy:
      'Copier',

    copied:
      'Copié !',

    discordMessage:
      'Salut tout le monde ! Notre événement commence',

    buildMessage:
      'Créez votre message Discord',

    messageDescription:
      'Écrivez votre message et insérez des timestamps Discord où vous le souhaitez.',

    messagePlaceholder:
      'Raid à...',

    insertTimestamp:
      'Insérer date et heure',

    insertRelative:
      'Insérer le temps relatif',

    copyMessage:
      'Copier le message',

    messageCopied:
      'Message copié !',

    templates:
      'Modèles rapides',

    raidTemplate:
      'Raid à {time} — commence {relative}',

    meetingTemplate:
      'Réunion à {time} — commence {relative}',

    streamTemplate:
      'Le stream commence à {time} — {relative}',

    eventTemplate:
      'Événement à {time} — commence {relative}',

    discordPreview:
      'Aperçu Discord',

    builtFor:
      'Créé pour les communautés internationales.',

    invalidDate:
      'Date invalide',
  },


  /* ----------------------------------------------------------
     DEUTSCH
     ---------------------------------------------------------- */

  de: {
    languageName:
      'Deutsch',

    localTimeForEveryone:
      'Lokale Zeit für alle',

    heroEyebrow:
      'DISCORD-ZEITSTEMPEL-GENERATOR',

    heroTitlePrimary:
      'Eine Zeit.',

    heroTitleSecondary:
      ' Jede Zeitzone.',

    heroDescription:
      'Erstelle Discord-Zeitstempel, die automatisch in der lokalen Zeit jeder Person angezeigt werden.',

    chooseTime:
      'Wähle deine Zeit',

    chooseFormat:
      'Wähle ein Format',

    pasteDiscord:
      'In Discord einfügen',

    dateTime:
      'Datum und Uhrzeit',

    now:
      'Jetzt',

    plus15:
      '+15 Min.',

    plusHour:
      '+1 Stunde',

    tomorrow:
      'Morgen',

    detectedTimezone:
      'Erkannte Zeitzone',

    timezoneDescription:
      'Discord konvertiert diese Zeit automatisch für jede Person, die sie sieht.',

    copy:
      'Kopieren',

    copied:
      'Kopiert!',

    discordMessage:
      'Hallo zusammen! Unser Event beginnt',

    buildMessage:
      'Erstelle deine Discord-Nachricht',

    messageDescription:
      'Schreibe deine Nachricht und füge Discord-Zeitstempel an beliebigen Stellen ein.',

    messagePlaceholder:
      'Raid um...',

    insertTimestamp:
      'Datum & Uhrzeit einfügen',

    insertRelative:
      'Relative Zeit einfügen',

    copyMessage:
      'Nachricht kopieren',

    messageCopied:
      'Nachricht kopiert!',

    templates:
      'Schnellvorlagen',

    raidTemplate:
      'Raid um {time} — beginnt {relative}',

    meetingTemplate:
      'Meeting um {time} — beginnt {relative}',

    streamTemplate:
      'Stream beginnt um {time} — {relative}',

    eventTemplate:
      'Event um {time} — beginnt {relative}',

    discordPreview:
      'Discord-Vorschau',

    builtFor:
      'Für globale Communities entwickelt.',

    invalidDate:
      'Ungültiges Datum',
  },


  /* ----------------------------------------------------------
     日本語
     ---------------------------------------------------------- */

  ja: {
    languageName:
      '日本語',

    localTimeForEveryone:
      'みんなの現地時間',

    heroEyebrow:
      'DISCORD タイムスタンプ生成ツール',

    heroTitlePrimary:
      'ひとつの時刻。',

    heroTitleSecondary:
      ' すべてのタイムゾーン。',

    heroDescription:
      'Discordのタイムスタンプを作成し、それぞれのユーザーの現地時間で自動表示します。',

    chooseTime:
      '時刻を選択',

    chooseFormat:
      '形式を選択',

    pasteDiscord:
      'Discordに貼り付け',

    dateTime:
      '日付と時刻',

    now:
      '現在',

    plus15:
      '+15分',

    plusHour:
      '+1時間',

    tomorrow:
      '明日',

    detectedTimezone:
      '検出されたタイムゾーン',

    timezoneDescription:
      'Discordでは、この時刻が見る人それぞれの現地時間に自動変換されます。',

    copy:
      'コピー',

    copied:
      'コピーしました',

    discordMessage:
      'みなさん、こんにちは！イベント開始は',

    buildMessage:
      'Discordメッセージを作成',

    messageDescription:
      'メッセージを書いて、必要な場所にDiscordタイムスタンプを挿入できます。',

    messagePlaceholder:
      'レイド開始...',

    insertTimestamp:
      '日時を挿入',

    insertRelative:
      '相対時間を挿入',

    copyMessage:
      'メッセージをコピー',

    messageCopied:
      'コピーしました！',

    templates:
      'クイックテンプレート',

    raidTemplate:
      'レイドは {time} — 開始 {relative}',

    meetingTemplate:
      'ミーティングは {time} — 開始 {relative}',

    streamTemplate:
      '配信開始 {time} — {relative}',

    eventTemplate:
      'イベントは {time} — 開始 {relative}',

    discordPreview:
      'Discordプレビュー',

    builtFor:
      '世界中のコミュニティのために。',

    invalidDate:
      '無効な日付',
  },
}


/* ============================================================
   04. FORMATOS DE TIMESTAMP
   ============================================================ */

const timestampFormats:
  TimestampFormat[] = [

    {
      code: 't',

      label: {
        en: 'Short Time',
        es: 'Hora corta',
        fr: 'Heure courte',
        de: 'Kurze Uhrzeit',
        ja: '短い時刻',
      },

      description: {
        en: 'Displays only the local time',
        es: 'Muestra solamente la hora local',
        fr: "Affiche uniquement l'heure locale",
        de: 'Zeigt nur die lokale Uhrzeit',
        ja: '現地時刻のみを表示',
      },
    },

    {
      code: 'T',

      label: {
        en: 'Long Time',
        es: 'Hora larga',
        fr: 'Heure longue',
        de: 'Lange Uhrzeit',
        ja: '長い時刻',
      },

      description: {
        en: 'Displays time including seconds',
        es: 'Muestra la hora incluyendo segundos',
        fr: "Affiche l'heure avec les secondes",
        de: 'Zeigt die Uhrzeit mit Sekunden',
        ja: '秒を含む時刻を表示',
      },
    },

    {
      code: 'd',

      label: {
        en: 'Short Date',
        es: 'Fecha corta',
        fr: 'Date courte',
        de: 'Kurzes Datum',
        ja: '短い日付',
      },

      description: {
        en: 'Displays the local date',
        es: 'Muestra la fecha local',
        fr: 'Affiche la date locale',
        de: 'Zeigt das lokale Datum',
        ja: '現地の日付を表示',
      },
    },

    {
      code: 'D',

      label: {
        en: 'Long Date',
        es: 'Fecha larga',
        fr: 'Date longue',
        de: 'Langes Datum',
        ja: '長い日付',
      },

      description: {
        en: 'Displays the full local date',
        es: 'Muestra la fecha local completa',
        fr: 'Affiche la date locale complète',
        de: 'Zeigt das vollständige lokale Datum',
        ja: '完全な現地の日付を表示',
      },
    },

    {
      code: 'f',

      label: {
        en: 'Date & Time',
        es: 'Fecha y hora',
        fr: 'Date et heure',
        de: 'Datum & Uhrzeit',
        ja: '日付と時刻',
      },

      description: {
        en: 'Displays date and time',
        es: 'Muestra fecha y hora',
        fr: "Affiche la date et l'heure",
        de: 'Zeigt Datum und Uhrzeit',
        ja: '日付と時刻を表示',
      },
    },

    {
      code: 'F',

      label: {
        en: 'Full Date & Time',
        es: 'Fecha y hora completas',
        fr: 'Date et heure complètes',
        de: 'Vollständiges Datum & Uhrzeit',
        ja: '完全な日付と時刻',
      },

      description: {
        en: 'Displays weekday, date and time',
        es: 'Muestra día, fecha y hora',
        fr: "Affiche le jour, la date et l'heure",
        de: 'Zeigt Wochentag, Datum und Uhrzeit',
        ja: '曜日、日付、時刻を表示',
      },
    },

    {
      code: 'R',

      label: {
        en: 'Relative Time',
        es: 'Tiempo relativo',
        fr: 'Temps relatif',
        de: 'Relative Zeit',
        ja: '相対時間',
      },

      description: {
        en: 'Displays time relative to now',
        es: 'Muestra el tiempo relativo al momento actual',
        fr: 'Affiche le temps par rapport à maintenant',
        de: 'Zeigt die Zeit relativ zu jetzt',
        ja: '現在からの相対時間を表示',
      },
    },
  ]


/* ============================================================
   05. UTILIDADES DE IDIOMA
   ============================================================ */

function getInitialLanguage():
  Language {

  const savedLanguage =
    localStorage.getItem(
      'ds-time-language',
    )

  if (
    savedLanguage === 'en' ||
    savedLanguage === 'es' ||
    savedLanguage === 'fr' ||
    savedLanguage === 'de' ||
    savedLanguage === 'ja'
  ) {
    return savedLanguage
  }

  const browserLanguage =
    navigator.language.toLowerCase()

  if (
    browserLanguage.startsWith('es')
  ) {
    return 'es'
  }

  if (
    browserLanguage.startsWith('fr')
  ) {
    return 'fr'
  }

  if (
    browserLanguage.startsWith('de')
  ) {
    return 'de'
  }

  if (
    browserLanguage.startsWith('ja')
  ) {
    return 'ja'
  }

  return 'en'
}


/* ============================================================
   06. UTILIDADES DE FECHA Y HORA
   ============================================================ */

function toLocalInputValue(
  date: Date,
) {
  const offset =
    date.getTimezoneOffset()

  const localDate =
    new Date(
      date.getTime() -
      offset * 60_000,
    )

  return localDate
    .toISOString()
    .slice(0, 16)
}


function formatRelativeTime(
  date: Date,
  language: Language,
) {
  const differenceSeconds =
    Math.round(
      (
        date.getTime() -
        Date.now()
      ) / 1000,
    )

  const absoluteSeconds =
    Math.abs(
      differenceSeconds,
    )

  let value: number

  let unit:
    Intl.RelativeTimeFormatUnit

  if (
    absoluteSeconds < 60
  ) {
    value =
      differenceSeconds

    unit =
      'second'
  } else if (
    absoluteSeconds < 3600
  ) {
    value =
      Math.round(
        differenceSeconds / 60,
      )

    unit =
      'minute'
  } else if (
    absoluteSeconds < 86400
  ) {
    value =
      Math.round(
        differenceSeconds / 3600,
      )

    unit =
      'hour'
  } else {
    value =
      Math.round(
        differenceSeconds / 86400,
      )

    unit =
      'day'
  }

  return new Intl.RelativeTimeFormat(
    localeMap[language],
    {
      numeric: 'always',
    },
  ).format(
    value,
    unit,
  )
}


/* ============================================================
   07. PREVIEW DE TIMESTAMPS
   ============================================================ */

function formatTimestampPreview(
  date: Date,
  format: TimestampCode,
  language: Language,
) {
  const locale =
    localeMap[language]

  switch (format) {

    case 't':
      return new Intl.DateTimeFormat(
        locale,
        {
          hour: '2-digit',
          minute: '2-digit',
        },
      ).format(date)

    case 'T':
      return new Intl.DateTimeFormat(
        locale,
        {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        },
      ).format(date)

    case 'd':
      return new Intl.DateTimeFormat(
        locale,
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      ).format(date)

    case 'D':
      return new Intl.DateTimeFormat(
        locale,
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      ).format(date)

    case 'f':
      return new Intl.DateTimeFormat(
        locale,
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',

          hour: '2-digit',
          minute: '2-digit',
        },
      ).format(date)

    case 'F':
      return new Intl.DateTimeFormat(
        locale,
        {
          weekday: 'long',

          year: 'numeric',
          month: 'long',
          day: 'numeric',

          hour: '2-digit',
          minute: '2-digit',
        },
      ).format(date)

    case 'R':
      return formatRelativeTime(
        date,
        language,
      )
  }
}


/* ============================================================
   08. PREVIEW DEL MENSAJE
   Reemplaza visualmente los timestamps por fechas legibles.
   El texto copiado conserva el formato real de Discord.
   ============================================================ */

function renderDiscordMessagePreview(
  message: string,
  language: Language,
) {
  const timestampRegex =
    /<t:(\d+):([tTdDfFR])>/g

  return message.replace(
    timestampRegex,

    (
      _match,
      unix,
      format: TimestampCode,
    ) => {

      const date =
        new Date(
          Number(unix) * 1000,
        )

      return formatTimestampPreview(
        date,
        format,
        language,
      )
    },
  )
}


/* ============================================================
   09. COMPONENTE PRINCIPAL
   ============================================================ */

function App() {

  /* ----------------------------------------------------------
     ESTADO
     ---------------------------------------------------------- */

  const [
    language,
    setLanguage,
  ] = useState<Language>(
    getInitialLanguage,
  )

  const [
    dateTime,
    setDateTime,
  ] = useState(
    () =>
      toLocalInputValue(
        new Date(),
      ),
  )

  const [
    copied,
    setCopied,
  ] =
    useState<TimestampCode | null>(
      null,
    )

  const [
    message,
    setMessage,
  ] =
    useState('')

  const [
    messageCopied,
    setMessageCopied,
  ] =
    useState(false)

  const messageRef =
    useRef<HTMLTextAreaElement>(
      null,
    )


  /* ----------------------------------------------------------
     DATOS DERIVADOS
     ---------------------------------------------------------- */

  const t =
    translations[language]

  const timezone =
    useMemo(
      () =>
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone,

      [],
    )

  const selectedDate =
    useMemo(
      () => {

        const date =
          new Date(dateTime)

        if (
          Number.isNaN(
            date.getTime(),
          )
        ) {
          return null
        }

        return date
      },

      [dateTime],
    )

  const unixTimestamp =
    useMemo(
      () => {

        if (
          !selectedDate
        ) {
          return null
        }

        return Math.floor(
          selectedDate.getTime() /
          1000,
        )
      },

      [selectedDate],
    )


  /* ----------------------------------------------------------
     CAMBIO DE IDIOMA
     ---------------------------------------------------------- */

  const changeLanguage = (
    newLanguage: Language,
  ) => {

    setLanguage(
      newLanguage,
    )

    localStorage.setItem(
      'ds-time-language',
      newLanguage,
    )

    document.documentElement.lang =
      newLanguage
  }


  /* ----------------------------------------------------------
     ACCIONES RÁPIDAS DE FECHA/HORA
     ---------------------------------------------------------- */

  const setQuickTime = (
    minutes: number,
  ) => {

    const date =
      new Date()

    date.setMinutes(
      date.getMinutes() +
      minutes,
    )

    setDateTime(
      toLocalInputValue(
        date,
      ),
    )
  }


  const setTomorrow = () => {

    const date =
      new Date()

    date.setDate(
      date.getDate() + 1,
    )

    setDateTime(
      toLocalInputValue(
        date,
      ),
    )
  }


  /* ----------------------------------------------------------
     COPIAR TIMESTAMP
     ---------------------------------------------------------- */

  const copyTimestamp = async (
    format: TimestampCode,
  ) => {

    if (
      !unixTimestamp
    ) {
      return
    }

    const timestamp =
      `<t:${unixTimestamp}:${format}>`

    await navigator.clipboard
      .writeText(
        timestamp,
      )

    setCopied(
      format,
    )

    window.setTimeout(
      () => {

        setCopied(
          null,
        )

      },
      1400,
    )
  }


  /* ----------------------------------------------------------
     MESSAGE BUILDER
     ---------------------------------------------------------- */

  const insertIntoMessage = (
    value: string,
  ) => {

    const textarea =
      messageRef.current

    if (
      !textarea
    ) {

      setMessage(
        current =>
          current + value,
      )

      return
    }

    const start =
      textarea.selectionStart

    const end =
      textarea.selectionEnd

    const updatedMessage =
      message.slice(
        0,
        start,
      ) +
      value +
      message.slice(
        end,
      )

    setMessage(
      updatedMessage,
    )

    requestAnimationFrame(
      () => {

        textarea.focus()

        const newPosition =
          start +
          value.length

        textarea
          .setSelectionRange(
            newPosition,
            newPosition,
          )
      },
    )
  }


  const insertTimestampIntoMessage = (
    format: TimestampCode,
  ) => {

    if (
      !unixTimestamp
    ) {
      return
    }

    insertIntoMessage(
      `<t:${unixTimestamp}:${format}>`,
    )
  }


  const applyTemplate = (
    template: string,
  ) => {

    if (
      !unixTimestamp
    ) {
      return
    }

    const result =
      template
        .replace(
          '{time}',
          `<t:${unixTimestamp}:F>`,
        )
        .replace(
          '{relative}',
          `<t:${unixTimestamp}:R>`,
        )

    setMessage(
      result,
    )
  }


  const copyFullMessage =
    async () => {

      if (
        !message.trim()
      ) {
        return
      }

      await navigator.clipboard
        .writeText(
          message,
        )

      setMessageCopied(
        true,
      )

      window.setTimeout(
        () => {

          setMessageCopied(
            false,
          )

        },
        1500,
      )
    }


  /* ==========================================================
     10. JSX
     ========================================================== */

  return (
    <main className="app-shell">

      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <header className="topbar">

        <a
          className="brand"
          href="#"
          aria-label="DS-Time home"
        >

          {/* Logo de DS-Time.
              BASE_URL permite que funcione correctamente
              dentro de /DS-Time/ en GitHub Pages. */}
          <img
            className="brand-logo"
            src={`${import.meta.env.BASE_URL}ds-favicon.png`}
            alt="DS-Time"
          />

          <span>

            <strong className="brand-title">

              <span className="brand-discord">
                DS
              </span>

              <span className="brand-time">
                -Time
              </span>

            </strong>

            <small>
              {t.localTimeForEveryone}
            </small>

          </span>
        </a>


        <nav className="topbar-actions">

          <select
            className="language-select"

            value={
              language
            }

            onChange={
              event =>
                changeLanguage(
                  event.target
                    .value as Language,
                )
            }

            aria-label="Language"
          >

            <option value="en">
              English
            </option>

            <option value="es">
              Español
            </option>

            <option value="fr">
              Français
            </option>

            <option value="de">
              Deutsch
            </option>

            <option value="ja">
              日本語
            </option>

          </select>


          {/* Repo actual de DS-Time */}
          <a
            className="github-link"

            href="https://github.com/Linth84/DS-Time"

            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

        </nav>
      </header>


      {/* ======================================================
          HERO
          ====================================================== */}

      <section className="hero">

        <span className="eyebrow">
          {t.heroEyebrow}
        </span>

        <h1>
          {t.heroTitlePrimary}

          <span>
            {t.heroTitleSecondary}
          </span>
        </h1>

        <p>
          {t.heroDescription}
        </p>


        {/* Logo grande decorativo.
            También usa BASE_URL para GitHub Pages. */}
        <div
          className="hero-visual"
          aria-hidden="true"
        >

          <div className="hero-logo-glow" />

          <img
            src={`${import.meta.env.BASE_URL}ds-favicon.png`}
            alt=""
            className="hero-logo"
          />

        </div>

      </section>


      {/* ======================================================
          PASOS 01 + 02
          ====================================================== */}

      <section className="workspace">

        {/* ----------------------------------------------------
            PASO 01 — FECHA Y HORA
            ---------------------------------------------------- */}

        <div className="generator-card">

          <div className="section-heading">

            <div>

              <span className="step-number">
                01
              </span>

              <h2>
                {t.chooseTime}
              </h2>

            </div>

            <span className="timezone-badge">
              {timezone}
            </span>

          </div>


          <label className="field">

            <span>
              {t.dateTime}
            </span>

            <input
              type="datetime-local"

              value={
                dateTime
              }

              onChange={
                event =>
                  setDateTime(
                    event.target.value,
                  )
              }
            />

          </label>


          <div className="quick-actions">

            <button
              type="button"

              onClick={
                () =>
                  setQuickTime(0)
              }
            >
              {t.now}
            </button>


            <button
              type="button"

              onClick={
                () =>
                  setQuickTime(15)
              }
            >
              {t.plus15}
            </button>


            <button
              type="button"

              onClick={
                () =>
                  setQuickTime(60)
              }
            >
              {t.plusHour}
            </button>


            <button
              type="button"
              onClick={setTomorrow}
            >
              {t.tomorrow}
            </button>

          </div>


          <div className="timezone-info">

            <span>
              {t.detectedTimezone}
            </span>

            <strong>
              {timezone}
            </strong>

            <small>
              {t.timezoneDescription}
            </small>

          </div>

        </div>


        {/* ----------------------------------------------------
            PASO 02 — FORMATO
            ---------------------------------------------------- */}

        <div className="results-card">

          <div className="section-heading">

            <div>

              <span className="step-number">
                02
              </span>

              <h2>
                {t.chooseFormat}
              </h2>

            </div>

          </div>


          <div className="timestamp-list">

            {timestampFormats.map(
              format => {

                const code =
                  unixTimestamp
                    ? `<t:${unixTimestamp}:${format.code}>`
                    : t.invalidDate

                const preview =
                  selectedDate
                    ? formatTimestampPreview(
                        selectedDate,
                        format.code,
                        language,
                      )
                    : ''

                return (
                  <button
                    className="timestamp-row"

                    type="button"

                    key={
                      format.code
                    }

                    onClick={
                      () =>
                        copyTimestamp(
                          format.code,
                        )
                    }

                    disabled={
                      !unixTimestamp
                    }
                  >

                    <div className="format-icon">
                      {format.code}
                    </div>


                    <div className="format-info">

                      <strong>
                        {
                          format.label[
                            language
                          ]
                        }
                      </strong>

                      <span>
                        {
                          format.description[
                            language
                          ]
                        }
                      </span>

                      <span className="format-preview">
                        {preview}
                      </span>

                    </div>


                    <code>
                      {code}
                    </code>


                    <span className="copy-action">

                      {
                        copied ===
                        format.code

                          ? t.copied

                          : t.copy
                      }

                    </span>

                  </button>
                )
              },
            )}

          </div>

        </div>

      </section>


      {/* ======================================================
          PASO 03 — PREVIEW SIMPLE
          ====================================================== */}

      <section className="discord-preview">

        <div className="section-heading">

          <div>

            <span className="step-number">
              03
            </span>

            <h2>
              {t.pasteDiscord}
            </h2>

          </div>

        </div>


        <div className="discord-message">

          <div className="discord-avatar">
            L
          </div>


          <div className="discord-content">

            <div className="discord-author">

              <strong>
                Linth
              </strong>

            </div>


            <p>

              {t.discordMessage}{' '}

              <span className="discord-timestamp">

                {
                  selectedDate

                    ? formatTimestampPreview(
                        selectedDate,
                        'R',
                        language,
                      )

                    : ''
                }

              </span>

            </p>

          </div>

        </div>

      </section>


      {/* ======================================================
          PASO 04 — MESSAGE BUILDER
          ====================================================== */}

      <section className="message-builder">

        <div className="section-heading">

          <div>

            <span className="step-number">
              04
            </span>

            <h2>
              {t.buildMessage}
            </h2>

          </div>

        </div>


        <p className="message-builder-description">
          {t.messageDescription}
        </p>


        {/* ----------------------------------------------------
            PLANTILLAS
            ---------------------------------------------------- */}

        <div className="template-area">

          <span>
            {t.templates}
          </span>


          <div className="template-buttons">

            <button
              type="button"

              onClick={
                () =>
                  applyTemplate(
                    t.raidTemplate,
                  )
              }
            >
              Raid
            </button>


            <button
              type="button"

              onClick={
                () =>
                  applyTemplate(
                    t.meetingTemplate,
                  )
              }
            >
              Meeting
            </button>


            <button
              type="button"

              onClick={
                () =>
                  applyTemplate(
                    t.streamTemplate,
                  )
              }
            >
              Stream
            </button>


            <button
              type="button"

              onClick={
                () =>
                  applyTemplate(
                    t.eventTemplate,
                  )
              }
            >
              Event
            </button>

          </div>

        </div>


        {/* ----------------------------------------------------
            TEXTAREA
            ---------------------------------------------------- */}

        <textarea
          ref={messageRef}

          className="message-input"

          value={
            message
          }

          onChange={
            event =>
              setMessage(
                event.target.value,
              )
          }

          placeholder={
            t.messagePlaceholder
          }

          rows={5}
        />


        {/* ----------------------------------------------------
            BOTONES DE INSERCIÓN + COPY
            ---------------------------------------------------- */}

        <div className="message-actions">

          <div className="insert-actions">

            <button
              type="button"

              onClick={
                () =>
                  insertTimestampIntoMessage(
                    'F',
                  )
              }
            >
              + {t.insertTimestamp}
            </button>


            <button
              type="button"

              onClick={
                () =>
                  insertTimestampIntoMessage(
                    'R',
                  )
              }
            >
              + {t.insertRelative}
            </button>

          </div>


          <button
            className="copy-message-button"

            type="button"

            onClick={
              copyFullMessage
            }

            disabled={
              !message.trim()
            }
          >

            {
              messageCopied
                ? t.messageCopied
                : t.copyMessage
            }

          </button>

        </div>


        {/* ----------------------------------------------------
            PREVIEW DEL MENSAJE
            ---------------------------------------------------- */}

        {
          message && (

            <div className="builder-preview">

              <span className="builder-preview-label">
                {t.discordPreview}
              </span>


              <div className="discord-message builder-discord-message">

                <div className="discord-avatar">
                  L
                </div>


                <div className="discord-content">

                  <div className="discord-author">

                    <strong>
                      Linth
                    </strong>

                  </div>


                  <p className="builder-rendered-message">

                    {
                      renderDiscordMessagePreview(
                        message,
                        language,
                      )
                    }

                  </p>

                </div>

              </div>

            </div>

          )
        }

      </section>


      {/* ======================================================
          FOOTER
          ====================================================== */}

      <footer>

        <span>
          DS-Time
        </span>

        <span>
          {t.builtFor}
        </span>

      </footer>

    </main>
  )
}

export default App