const FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
})

export function formatDate(date: Date): string {
  return FORMATTER.format(date)
}

// The journal is written in French, so its dates are too.
const FR_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function formatDateFr(date: Date): string {
  // French writes the first of the month as "1er"; Intl has no option for it.
  return FR_FORMATTER.format(date).replace(/^0?1 /, '1er ')
}
