import React from 'react'

interface Props {
    children?: React.ReactNode
}

const Notification: React.FC<Props> = ({ children }) => {
  return (
    <div>Notification</div>
  )
}

export default Notification