import React, { useEffect, useState } from 'react'
import { ScrollButton } from '../scroll-button'

import './index.scss'

export const ScrollButtonGroup = () => {
  return (
    <div className="scroll-button-container">
      <ScrollButton type="up" />
      <ScrollButton type="down" />
    </div>
  )
}
