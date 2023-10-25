const APP_URLs = {}

/* NOT INCLUDED IN THE SIDEBAR */

APP_URLs.LOGIN = '/auth/login'
APP_URLs.REGISTRATION = '/auth/signup'

APP_URLs.VIEW_PROFILE = '/profile-details'
APP_URLs.UPDATE_PROFILE = '/profile/update'
APP_URLs.PROFILE_SETTINGS = '/profile/settings'
APP_URLs.ASSIGN_GROUPS = '/profile/assign_groups'
APP_URLs.ASSIGN_PERMISSIONS = '/profile/assign_permissions'

/* NOT INCLUDED IN THE SIDEBAR */

APP_URLs.HOME = {
  groupName: 'Home/',
  modelName: 'home',
  displayName: 'Home',
  url: '/',
}

APP_URLs.DASHBOARD = {
  groupName: 'Home/Dashboard',
  modelName: 'dashboard',
  displayName: 'Dashboard',
  url: '/dashboard',
}

APP_URLs.CLIENTS = {
  groupName: 'Contact/Clients',
  modelName: 'client',
  displayName: 'Clients',
  url: '/clients',
}

APP_URLs.EMPLOYEES = {
  groupName: 'Employees/',
  modelName: 'employee',
  displayName: 'Employees',
  url: '/employees',
}

APP_URLs.MATTERS = {
  groupName: 'Matter/Matters',
  modelName: 'matter',
  displayName: 'Matters',
  url: '/matters',
}

APP_URLs.USERS = {
  groupName: 'User/Users',
  modelName: 'user',
  displayName: 'Users',
  url: '/users',
}

APP_URLs.CUSTOM_FIELDS = {
  groupName: 'Settings/Custom Fields',
  modelName: 'customfield',
  displayName: 'Custom Fields',
  url: '/custom_fields',
}

APP_URLs.COMPANIES = {
  groupName: 'Settings/Companies',
  modelName: 'company',
  displayName: 'Companies',
  url: '/companies',
}

APP_URLs.CONTACTS = {
  groupName: 'Contact/Contacts',
  modelName: 'contact',
  displayName: 'Contacts',
  url: '/contacts',
}

APP_URLs.JOB_TITLES = {
  groupName: 'Settings/Job_Title',
  modelName: 'jobtitle',
  displayName: 'Job Titles',
  url: '/job_titles',
}

APP_URLs.PRACTICE_AREA = {
  groupName: 'Matter/Practice_Area',
  modelName: 'practicearea',
  displayName: 'Practice Area',
  url: '/matters/practice_area',
}

APP_URLs.LITIGATION = {
  groupName: 'Matter/Litigation',
  modelName: 'litigation',
  displayName: 'Litigation',
  url: '/matters/litigation',
}

APP_URLs.ADVISING = {
  groupName: 'Matter/Advising',
  modelName: 'advising',
  displayName: 'Advising',
  url: '/matters/advising',
}

APP_URLs.BILLING_INVOICES = {
  groupName: 'Billing/Invoices',
  modelName: 'invoice',
  displayName: 'Invoices',
  url: '/billing/invoices',
}

APP_URLs.BILLING_DEEP_INVOICES = {
  groupName: 'Billing/Create_Invoice',
  modelName: 'invoice',
  displayName: 'Create Invoice',
  url: '/create_invoice',
}

APP_URLs.BILLING_PRICES = {
  groupName: 'Billing/Prices',
  modelName: 'price',
  displayName: 'Prices',
  url: '/billing/prices',
}

APP_URLs.BILLING_CURRENCIES = {
  groupName: 'Billing/Currencies',
  modelName: 'currency',
  displayName: 'Currencies',
  url: '/billing/currency',
}

APP_URLs.BILLING_SALE_TAXES = {
  groupName: 'Billing/Sale_Taxes',
  modelName: 'saletax',
  displayName: 'Sale taxes',
  url: '/billing/sale_taxes',
}

APP_URLs.ACTIVITY_ITEMS = {
  groupName: 'Activity/Activity_Items',
  modelName: 'activityitem',
  displayName: 'Activity Items',
  url: '/activities/activity_items',
}

APP_URLs.ALL_ACTIVITIES = {
  groupName: 'Activity/All_Activities',
  modelName: 'activity',
  displayName: 'All Activities',
  url: '/activities/all_activities',
}

APP_URLs.ACTIVITY_EXPENSES = {
  groupName: 'Activity/Expenses',
  modelName: 'expense',
  displayName: 'Expenses',
  url: '/activities/expenses',
}

APP_URLs.ACTIVITY_FEES = {
  groupName: 'Activity/Fees',
  modelName: 'flatfee',
  displayName: 'Fees',
  url: '/activities/flat_fees',
}

APP_URLs.ACTIVITY_TIME_ENTRIES = {
  groupName: 'Activity/Time_Entries',
  modelName: 'timeentry',
  displayName: 'Time Entries',
  url: '/activities/time_entries',
}

APP_URLs.COMPANY_GROUPS = {
  groupName: 'Settings/Groups',
  modelName: 'companygroup',
  displayName: 'Groups',
  url: '/groups',
}

APP_URLs.JUDICIAL_AUTHORITY_TYPES = {
  groupName: 'Inaba/judicial_authority_types',
  modelName: 'judicialauthoritytype',
  displayName: 'Judicial Authority Type',
  url: '/inaba/judicial_authority_types',
}

APP_URLs.SERVICE_SCOPES = {
  groupName: 'Inaba/service_scopes',
  modelName: 'servicescope',
  displayName: 'Service Scopes',
  url: '/inaba/service_scopes',
}

APP_URLs.OFFERED_SERVICES = {
  groupName: 'Inaba/offered_services/offered_services',
  modelName: 'offeredservice',
  displayName: 'Offered Services',
  url: '/inaba/offered_services',
}

APP_URLs.OFFERED_SERVICE_APPLICATIONS = {
  groupName: 'Inaba/offered_services/offered_service_applications',
  modelName: 'offeredserviceapplication',
  displayName: 'Offered Applications',
  url: '/inaba/offered_services/offered_service_applications',
}

APP_URLs.REQUESTED_SERVICES = {
  groupName: 'Inaba/requested_services/requested_services',
  modelName: 'requestedservice',
  displayName: 'Requested Services',
  url: '/inaba/requested_services',
}

APP_URLs.REQUESTED_SERVICE_APPLICATIONS = {
  groupName: 'Inaba/requested_services/requested_service_applications',
  modelName: 'requestedserviceapplication',
  displayName: 'Requested Applications',
  url: '/inaba/requested_services/requested_service_applications',
}

APP_URLs.FILE_EXPLORER = {
  groupName: 'Files/',
  modelName: 'fileexplorer',
  displayName: 'Files Explorer',
  url: '/files/explore',
}

export default APP_URLs
