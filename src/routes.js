import React from 'react'

const Dashboard = React.lazy(() => import('./components/Dashbord'))
const Colors = React.lazy(() => import('./components/Dashbord'))
const Typography = React.lazy(() => import('./components/Dashbord'))

// Base
const Accordion = React.lazy(() => import('./components/Dashbord'))
const Breadcrumbs = React.lazy(() => import('./components/Dashbord'))
const Cards = React.lazy(() => import('./components/Dashbord'))
const Carousels = React.lazy(() => import('./components/Dashbord'))
const Collapses = React.lazy(() => import('./components/Dashbord'))
const ListGroups = React.lazy(() => import('./components/Dashbord'))
const Navs = React.lazy(() => import('./components/Dashbord'))
const Paginations = React.lazy(() => import('./components/Dashbord'))
const Placeholders = React.lazy(() => import('./components/Dashbord'))
const Popovers = React.lazy(() => import('./components/Dashbord'))
const Progress = React.lazy(() => import('./components/Dashbord'))
const Spinners = React.lazy(() => import('./components/Dashbord'))
const Tables = React.lazy(() => import('./components/Dashbord'))
const Tooltips = React.lazy(() => import('./components/Dashbord'))

// Buttons
const Buttons = React.lazy(() => import('./components/Dashbord'))
const ButtonGroups = React.lazy(() => import('./components/Dashbord'))
const Dropdowns = React.lazy(() => import('./components/Dashbord'))

//Forms
const ChecksRadios = React.lazy(() => import('./components/Dashbord'))
const FloatingLabels = React.lazy(() => import('./components/Dashbord'))
const FormControl = React.lazy(() => import('./components/Dashbord'))
const InputGroup = React.lazy(() => import('./components/Dashbord'))
const Layout = React.lazy(() => import('./components/Dashbord'))
const Range = React.lazy(() => import('./components/Dashbord'))
const Select = React.lazy(() => import('./components/Dashbord'))
const Validation = React.lazy(() => import('./components/Dashbord'))

const Charts = React.lazy(() => import('./components/Dashbord'))

// Icons
const CoreUIIcons = React.lazy(() => import('./components/Dashbord'))
const Flags = React.lazy(() => import('./components/Dashbord'))
const Brands = React.lazy(() => import('./components/Dashbord'))

// Notifications
const Alerts = React.lazy(() => import('./components/Dashbord'))
const Badges = React.lazy(() => import('./components/Dashbord'))
const Modals = React.lazy(() => import('./components/Dashbord'))
const Toasts = React.lazy(() => import('./components/Dashbord'))

const Widgets = React.lazy(() => import('./components/Dashbord'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
