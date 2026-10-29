import React from 'react'

const icons = {
  home: <><path d='M3 12 12 3l9 9' /><path d='M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10' /></>,
  calendar: <><rect x='3' y='5' width='18' height='16' rx='2' /><path d='M3 10h18M8 3v4M16 3v4' /></>,
  clock: <><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 3' /></>,
  file: <><path d='M9 12h6m-6 4h6M9 8h6' /><path d='M5 3h14a1 1 0 0 1 1 1v16l-4-2-3 2-3-2-3 2-3-2V4a1 1 0 0 1 1-1Z' /></>,
  edit: <><path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' /><path d='m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5Z' /></>,
  card: <><rect x='2' y='5' width='20' height='14' rx='2' /><path d='M2 10h20' /></>,
  id: <><rect x='3' y='6' width='18' height='12' rx='2' /><circle cx='8' cy='12' r='2' /><path d='M13 10h5M13 14h3' /></>,
  user: <><circle cx='12' cy='8' r='4' /><path d='M4 21c1.5-4 6-6 8-6s6.5 2 8 6' /></>,
  search: <><circle cx='11' cy='11' r='7' /><path d='m21 21-3.5-3.5' /></>,
  bell: <><path d='M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5' /><path d='M15 17a3 3 0 1 1-6 0' /></>,
  menu: <path d='M4 6h16M4 12h16M4 18h16' />,
  close: <path d='M6 18 18 6M6 6l12 12' />,
  back: <path d='m15 18-6-6 6-6' />,
  chevron: <path d='m6 9 6 6 6-6' />
}

const NavIcon = ({ name, className = 'h-5 w-5' }) => (
  <svg
    aria-hidden='true'
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {icons[name]}
  </svg>
)

export default NavIcon
