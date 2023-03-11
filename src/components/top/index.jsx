import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  const isResume = location.pathname === '/about'

  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}

      <div className="gnb-container">
        {!isResume && (
          <Link to={`/about`} className="link">
            Resume
          </Link>
        )}

        <GitHubIcon />
      </div>
    </div>
  )
}
