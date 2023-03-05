import { useRef, useEffect } from 'react'
import lottie from 'lottie-web'
import Animation from './Animation.json'
import React from 'react'
import './index.scss'

export const Wreath = () => {
  const container = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      animationData: Animation,
      renderer: 'svg',
      loop: false,
      autoplay: true,
    })
  }, [])

  return <div ref={container} className="container" />
}
