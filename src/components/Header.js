import * as React from 'react'
import { Link } from 'gatsby'

export const Header = () => {
  return (
    <header className='site-header'>
      <Link to='/'>
        <div className='logo'>Example Site</div>
      </Link>
    </header>
  )
}
