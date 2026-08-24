import { useMemo, useRef, useState } from 'react'
import './App.css'

/* ============================================================
   DISCORD TIME
   App.tsx

   ÍNDICE
   ------------------------------------------------------------
   01. Tipos
   02. Locales
   03. Traducciones
   04. Configuración de formatos Discord
   05. Utilidades de idioma
   06. Utilidades de fecha y hora
   07. Preview de timestamps
   08. Preview del mensaje Discord
   09. Componente principal App
      09.1 Estado
      09.2 Datos derivados
      09.3 Cambio de idioma
      09.4 Acciones rápidas de tiempo
      09.5 Copiar timestamps
      09.6 Message Builder
   10. JSX
      10.1 Navbar
      10.2 Hero
      10.3 Paso 01
      10.4 Paso 02
      10.5 Paso 03
      10.6 Paso 04
      10.7 Footer
   ============================================================ */


/* ============================================================
   01. TIPOS
   ============================================================ */

/*
 * Idiomas soportados por la interfaz.
 *
 * Si en el futuro agregás otro idioma:
 * 1. añadilo acá;
 * 2. agregalo a localeMap;
 * 3. agregá sus traducciones;
 * 4. agregá la opción en el <select>.
 */
type Language =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'ja'

/*
 * Formatos oficiales de timestamps de Discord.
 *
 * Ejemplo:
 * <t:1234567890:F>
 */
type TimestampCode =
  | 't'
  | 'T'
  | 'd'
  | 'D'
  | 'f'
  | 'F'
  | 'R'

/*
 * Estructura que debe tener cada idioma.
 *
 * TypeScript usa esto para avisarnos si olvidamos
 * traducir algún texto nuevo.
 */
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

/*
 * Información visual de cada formato Discord.
 */
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
   ============================================================ */

/*
 * Locale usado por Intl.DateTimeFormat e
 * Intl.RelativeTimeFormat.
 *
 * Esto controla cómo se muestran fechas,
 * horas, meses y tiempo relativo.
 */
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
   ============================================================ */

/*
 * Todos los textos visibles de la aplicación.
 *
 * Si querés cambiar una frase de la UI,
 * casi siempre la vas a encontrar acá.
 */
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
   04. CONFIGURACIÓN DE FORMATOS DISCORD
   ============================================================ */

/*
 * Discord soporta estos siete formatos.
 *
 * Acá se configuran:
 * - nombre visible;
 * - descripción;
 * - idioma.
 *
 * La lógica real del formato está más abajo
 * en formatTimestampPreview().
 */
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

/*
 * Decide qué idioma mostrar inicialmente.
 *
 * Orden:
 * 1. idioma guardado en localStorage;
 * 2. idioma del navegador;
 * 3. inglés como fallback.
 */
function getInitialLanguage():
  Language {
  const savedLanguage =
    localStorage.getItem(
      'discord-time-language',
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

/*
 * Convierte Date al formato requerido por:
 *
 * <input type="datetime-local">
 *
 * Importante:
 * datetime-local no lleva timezone incluido.
 */
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


/*
 * Genera textos como:
 *
 * EN: in 2 hours
 * ES: dentro de 2 horas
 * FR: dans 2 heures
 *
 * Se usa para el formato Discord "R".
 */
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

/*
 * Simula cómo Discord va a mostrar cada formato.
 *
 * No genera el código <t:...>.
 * Genera solamente el texto visual.
 */
function formatTimestampPreview(
  date: Date,
  format: TimestampCode,
  language: Language,
) {
  const locale =
    localeMap[language]

  switch (format) {
    /* Hora corta */
    case 't':
      return new Intl.DateTimeFormat(
        locale,
        {
          hour: '2-digit',
          minute: '2-digit',
        },
      ).format(date)

    /* Hora larga */
    case 'T':
      return new Intl.DateTimeFormat(
        locale,
        {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        },
      ).format(date)

    /* Fecha corta */
    case 'd':
      return new Intl.DateTimeFormat(
        locale,
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      ).format(date)

    /* Fecha larga */
    case 'D':
      return new Intl.DateTimeFormat(
        locale,
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      ).format(date)

    /* Fecha + hora */
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

    /* Día + fecha + hora */
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

    /* Tiempo relativo */
    case 'R':
      return formatRelativeTime(
        date,
        language,
      )
  }
}


/* ============================================================
   08. PREVIEW DEL MENSAJE DISCORD
   ============================================================ */

/*
 * Busca timestamps dentro del mensaje:
 *
 * <t:123456789:F>
 *
 * y los reemplaza visualmente por:
 *
 * Monday, August 24...
 *
 * OJO:
 * esto afecta solamente la preview.
 *
 * El texto real que copiamos mantiene
 * el timestamp original de Discord.
 */
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
     09.1 ESTADO
     ---------------------------------------------------------- */

  /*
   * Idioma actual.
   */
  const [
    language,
    setLanguage,
  ] = useState<Language>(
    getInitialLanguage,
  )

  /*
   * Fecha/hora seleccionada por el usuario.
   */
  const [
    dateTime,
    setDateTime,
  ] = useState(
    () =>
      toLocalInputValue(
        new Date(),
      ),
  )

  /*
   * Guarda qué formato acabamos de copiar.
   *
   * Se usa para mostrar "Copied!"
   * momentáneamente.
   */
  const [
    copied,
    setCopied,
  ] =
    useState<TimestampCode | null>(
      null,
    )

  /*
   * Mensaje del Message Builder.
   */
  const [
    message,
    setMessage,
  ] =
    useState('')

  /*
   * Estado temporal del botón
   * "Copy message".
   */
  const [
    messageCopied,
    setMessageCopied,
  ] =
    useState(false)

  /*
   * Referencia al textarea.
   *
   * Nos permite saber dónde está
   * posicionado el cursor para insertar
   * el timestamp exactamente ahí.
   */
  const messageRef =
    useRef<HTMLTextAreaElement>(
      null,
    )


  /* ----------------------------------------------------------
     09.2 DATOS DERIVADOS
     ---------------------------------------------------------- */

  /*
   * Traducciones del idioma actual.
   *
   * Ejemplo:
   * t.copy
   * t.tomorrow
   * t.buildMessage
   */
  const t =
    translations[language]

  /*
   * Detecta automáticamente la timezone
   * configurada en el navegador.
   *
   * Ejemplos:
   * America/Argentina/Buenos_Aires
   * Europe/London
   * Asia/Tokyo
   */
  const timezone =
    useMemo(
      () =>
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone,

      [],
    )

  /*
   * Convierte el valor del input
   * datetime-local en un Date válido.
   */
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

  /*
   * Convierte Date a Unix timestamp.
   *
   * Discord necesita segundos,
   * no milisegundos.
   */
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
     09.3 CAMBIO DE IDIOMA
     ---------------------------------------------------------- */

  /*
   * Cambia el idioma y lo guarda
   * en localStorage.
   *
   * Así permanece después de recargar.
   */
  const changeLanguage = (
    newLanguage: Language,
  ) => {
    setLanguage(
      newLanguage,
    )

    localStorage.setItem(
      'discord-time-language',
      newLanguage,
    )

    document.documentElement.lang =
      newLanguage
  }


  /* ----------------------------------------------------------
     09.4 ACCIONES RÁPIDAS DE TIEMPO
     ---------------------------------------------------------- */

  /*
   * Se usa para:
   * Now
   * +15 min
   * +1 hour
   */
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

  /*
   * Selecciona mañana
   * manteniendo aproximadamente
   * la hora actual.
   */
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
     09.5 COPIAR TIMESTAMPS
     ---------------------------------------------------------- */

  /*
   * Genera:
   *
   * <t:123456789:F>
   *
   * y lo copia al clipboard.
   */
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
     09.6 MESSAGE BUILDER
     ---------------------------------------------------------- */

  /*
   * Inserta texto exactamente
   * donde está el cursor del textarea.
   *
   * También reemplaza cualquier texto
   * seleccionado.
   */
  const insertIntoMessage = (
    value: string,
  ) => {
    const textarea =
      messageRef.current

    /*
     * Fallback por si la referencia
     * todavía no está disponible.
     */
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

    /*
     * Después del render volvemos
     * a poner el cursor justo después
     * del timestamp insertado.
     */
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

  /*
   * Genera un timestamp Discord
   * y lo inserta dentro del mensaje.
   */
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

  /*
   * Convierte una plantilla como:
   *
   * Raid at {time} — starts {relative}
   *
   * en:
   *
   * Raid at <t:123:F> — starts <t:123:R>
   */
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

  /*
   * Copia el mensaje completo.
   *
   * El mensaje conserva los timestamps
   * reales para que Discord los renderice.
   */
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
          10.1 NAVBAR
          Logo + idioma + GitHub
          ====================================================== */}

      <header className="topbar">

        <a
          className="brand"
          href="#"
          aria-label="Discord Time home"
        >
          <img
            className="brand-logo"
            src="/ds-favicon.png"
            alt="Discord Time"
          />

          <span>

            <strong className="brand-title">
              <span className="brand-discord">
                Discord
              </span>

              <span className="brand-time">
                Time
              </span>
            </strong>

            <small>
              {t.localTimeForEveryone}
            </small>

          </span>
        </a>


        <nav className="topbar-actions">

          {/* Selector de idioma */}
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


          {/* Repo público */}
          <a
            className="github-link"

            href="https://github.com/Linth84/Discord-Time-For-Local-Folks"

            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

        </nav>
      </header>


      {/* ======================================================
          10.2 HERO
          Texto principal + planeta/reloj decorativo.
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


        {/* Imagen decorativa de la derecha */}
        <div
          className="hero-visual"
          aria-hidden="true"
        >
          <div className="hero-logo-glow" />

          <img
            src="/ds-favicon.png"
            alt=""
            className="hero-logo"
          />
        </div>

      </section>


      {/* ======================================================
          10.3 PASOS 01 + 02
          ====================================================== */}

      <section className="workspace">

        {/* ----------------------------------------------------
            PASO 01
            Elegir fecha y hora
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

            {/* Timezone detectada */}
            <span className="timezone-badge">
              {timezone}
            </span>
          </div>


          {/* Input principal */}
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
                    event.target
                      .value,
                  )
              }
            />

          </label>


          {/* Accesos rápidos */}
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


          {/* Información de timezone */}
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
            PASO 02
            Elegir formato de timestamp
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

                /*
                 * Código real que vamos
                 * a copiar a Discord.
                 */
                const code =
                  unixTimestamp
                    ? `<t:${unixTimestamp}:${format.code}>`
                    : t.invalidDate

                /*
                 * Texto visual aproximado
                 * de cómo Discord lo mostrará.
                 */
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

                    {/* t / T / d / etc */}
                    <div className="format-icon">
                      {format.code}
                    </div>


                    {/* Nombre + descripción */}
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


                    {/* Código Discord */}
                    <code>
                      {code}
                    </code>


                    {/* Estado de copia */}
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
          10.5 PASO 03
          Preview simple estilo Discord.
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
          10.6 PASO 04
          MESSAGE BUILDER
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
            Plantillas rápidas
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
            Campo de escritura
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
            Insertar timestamps + copiar mensaje
            ---------------------------------------------------- */}

        <div className="message-actions">

          <div className="insert-actions">

            {/* Inserta formato F */}
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


            {/* Inserta formato R */}
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


          {/* Copia el mensaje completo */}
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
            Preview del mensaje estilo Discord
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
          10.7 FOOTER
          ====================================================== */}

      <footer>

        <span>
          Discord Time
        </span>

        <span>
          {t.builtFor}
        </span>

      </footer>

    </main>
  )
}

export default App