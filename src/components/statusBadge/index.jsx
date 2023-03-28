// status : { type: 어떤 활동인지, description: 설명 }
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
  faBookTanakh,
  faSkull,
  faGraduationCap,
  faPencil,
  faFeather,
} from '@fortawesome/free-solid-svg-icons'
import { SwitchCase } from '../SwitchCase'

import './index.scss'

export const StatusBadge = ({ status }) => {
  return (
    <div className={`status-badge`}>
      {/* 타입에 따라 다른 아이콘 렌더링 */}
      <SwitchCase
        value={status.type}
        caseBy={{
          reading: (
            <FontAwesomeIcon
              icon={faBookTanakh}
              className="status-badge__icon"
            />
          ),
          exam: (
            <FontAwesomeIcon icon={faSkull} className="status-badge__icon" />
          ),
          graduation: (
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="status-badge__icon"
            />
          ),
          study: (
            <FontAwesomeIcon icon={faPencil} className="status-badge__icon" />
          ),
          writing: (
            <FontAwesomeIcon icon={faFeather} className="status-badge__icon" />
          ),
        }}
      />

      <span
        className={`status-badge__icon status-badge__icon--${status.type}`}
      ></span>
      <span className="status-badge__text">{status.description}</span>
    </div>
  )
}
