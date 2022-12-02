import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

/**
 * 클릭 시, 맨 위/아래 로 갈 수 있는 스크롤 버튼
 * @param {*} type : 'up' : 'down'
 * @returns function components
 */

export const ScrollButton = ({ type }) => {
  const [scrollY, setScrollY] = useState(0)
  const scrollToPosition =
    type === 'up' ? 0 : document.documentElement.scrollHeight

  const handleFollow = () => {
    setScrollY(window.pageYOffset)
  }

  const handleScroll = () => {
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth',
    })
    setScrollY(scrollToPosition)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleFollow)
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  return (
    <div className="scroll-button" onClick={handleScroll}>
      {type === 'up' ? (
        <FontAwesomeIcon
          icon={faAngleUp}
          fontSize={28}
          className="scroll-button__icon"
        />
      ) : (
        <FontAwesomeIcon
          icon={faAngleDown}
          fontSize={28}
          className="scroll-button__icon"
        />
      )}
    </div>
  )
}
