export const QueryKeys = {
  SUBSCRIPTION: {
    DEFAULT: ['SUBSCRIPTION'],
    STATUS: ['SUBSCRIPTION_STATUS'],
  },
  CONSULTS: {
    DEFAULT: ['WEEK_CONSULTS'],
    WEEK: (offset?: number) => ['WEEK_CONSULTS', offset],
    NEXT_TREE_DAYS: ['NEXT_TREE_DAYS_CONSULTS'],
    GRAPH_YEAR: ['GRAPH_YEAR_CONSULT_DATA'],
    MONTH_METRICS: ['MONTH_METRICS'],
    MONTH_NOTES_ALL: ['MONTH_NOTES'],
    MONTH_NOTES: (date: string) => ['MONTH_NOTES', date],
  },
  USER: {
    PROFILE_IMAGE: ['PROFILE_IMAGE'],
    PERSON: ['PERSON'],
  },
  PATIENT: {
    LIST: ['PATIENT_LIST'],
  },
}
