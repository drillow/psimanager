export const QueryKeys = {
  SUBSCRIPTION: {
    DEFAULT: ['SUBSCRIPTION'],
    STATUS: ['SUBSCRIPTION_STATUS']
  },
  CONSULTS: {
    DEFAULT: ['WEEK_CONSULTS'],
    WEEK: (offset?: number) => ['WEEK_CONSULTS', offset],
    NEXT_TREE_DAYS: ['NEXT_TREE_DAYS_CONSULTS']
  },
  USER: {
    PROFILE_IMAGE: ['PROFILE_IMAGE'],
    PERSON: ['PERSON']
  },
  PATIENT: {
    LIST: ['PATIENT_LIST']
  }
}