const API_URLs = {}

API_URLs.BASE_URL = 'https://api.lexalgeria.info/'
API_URLs.REGISTRATION = '/api/auth/register/'
API_URLs.PASSWORD__CHANGE = '/api/auth/password/change/'
API_URLs.LOGIN = '/api/auth/login/'
API_URLs.CURRENT_USER_PROFILE = '/api/users/me/'
API_URLs.CURRENT_USER_PERMISSIONS = '/api/users/me/permissions'
API_URLs.NEW_ACCESS_TOKEN = '/api/auth/token/refresh/'
API_URLs.CLIENTS = '/api/contacts/clients/'
API_URLs.EMPLOYEES = '/api/employees/'
API_URLs.MATTERS = '/api/matters/'
API_URLs.COMPANIES = '/api/settings/admin_area/companies/'
API_URLs.CONTACTS = '/api/contacts/contacts/'
API_URLs.USERS = '/api/users/'
API_URLs.VUE_FINDER = 'https://api.lexalgeria.info/api/vuefinder/'

API_URLs.GROUPS = '/api/settings/groups/'
API_URLs.PERMISSIONS = '/api/settings/permissions/'

API_URLs.JOB_TITLES = '/api/settings/admin_area/job_titles/'

API_URLs.CUSTOM_FIELDS = '/api/custom_fields/'

API_URLs.JUDICIAL_AUTHORITY_TYPES = '/api/inaba/judicial_authority_types/'
API_URLs.SERVICE_SCOPES = '/api/inaba/service_scopes/'

API_URLs.OFFERED_SERVICES = '/api/inaba/offered_services/offered_services/'
API_URLs.OFFERED_SERVICE_APPLICATIONS =
  '/api/inaba/offered_services/offered_service_applications/'

API_URLs.REQUESTED_SERVICES = '/api/inaba/requested_services/requested_services/'
API_URLs.REQUESTED_SERVICE_APPLICATIONS =
  '/api/inaba/requested_services/requested_service_applications/'

API_URLs.PRACTICE_AREA = '/api/matters_/practice_area/'
API_URLs.ADVISING = '/api/matters_/advising/'
API_URLs.LITIGATION = '/api/matters_/litigation/'

API_URLs.BILLING__INVOICES = '/api/billing/invoices/'
API_URLs.BILLING__PRICES = '/api/billing/prices/'
API_URLs.BILLING__CURRENCY = '/api/billing/currency/'
API_URLs.BILLING__SALE_TAXES = '/api/billing/sale_taxes/'

API_URLs.ACTIVITIES__ACTIVITY_ITEMS = '/api/activities/activity_items/'
API_URLs.ACTIVITIES__ALL_ACTIVITIES = '/api/activities/all_activities/'
API_URLs.ACTIVITIES__EXPENSES = '/api/activities/expenses/'
API_URLs.ACTIVITIES__FLAT_FEES = '/api/activities/flat_fees/'
API_URLs.ACTIVITIES__TIME_ENTRIES = '/api/activities/time_entries/'

export default API_URLs
