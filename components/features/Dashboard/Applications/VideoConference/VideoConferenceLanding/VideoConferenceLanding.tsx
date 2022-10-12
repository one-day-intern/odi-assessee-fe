import React from 'react'

interface Props {
    onEnterConference: () => void;
}

const VideoConferenceLanding: React.FC<Props> = ({ onEnterConference }) => {
  return (
    <button data-testid="EnterConference" onClick={() => onEnterConference()}>Enter Conference</button>
  )
}

export default VideoConferenceLanding