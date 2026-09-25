import React from 'react'

interface Props {
  title: strin
  onClickNext: () => void;
  onClickPrevious: () => void;
  step: number;
}

const ActionButtons = ({title, onClickNext, onClickPrevious, step}: Props) => {
  return (
    <div>
      <button disabled={step===1} onClick={onClickPrevious} className="btn btn-primary">Previous</button>
      <button disabled={step===4} onClick={onClickNext} className="btn btn-primary">Next {title ? `: ${title}` : ""}</button>
    </div>
  )
}

export default ActionButtons