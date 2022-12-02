import { useEffect, useState } from 'react'

export const useCSR = () => {
  const [myWindow, setMyWindow] = useState(null)
  const [myDocument, setMyDocument] = useState(null)

  useEffect(() => {
    setMyDocument(document)
    setMyWindow(window)
  }, [])

  const isCSR = myWindow && myDocument

  return [isCSR]
}
