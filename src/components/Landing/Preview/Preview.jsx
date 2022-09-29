import React from 'react'
import './Preview.css'

const Preview = (props) => {
  const {title, text, content} = props.preview

  return (
    <div className={""+props.preview.class}>
      <div className="previewtext">
        <h1>{title}</h1>
        <span>{text}</span>
      </div>
        {content}
    </div>
  )
}
export default Preview