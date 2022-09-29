import React from 'react'
import './Tabs.css'

const Tabs = (props) => {
  const {links, initial} = props
  const [tab, setTab] = React.useState(initial)
  const linksrow = links?.map(link=> {
    return (
      <div onClick={()=> setTab(link.link)} className={`tablink ${tab === link.link?'activetablink':''}`}>
        {link.title}
      </div>
    )
  })
  const tabs = links?.map(tabc=> {
    if(tab === tabc.link) {
      return (
        <div className="tabcont">
          {tabc.content}
        </div>
      )
    }
  })
  return (
    <div className="tabs flex">
      <div className="tablinks flexrow">
        {linksrow}
      </div>
      <div className="tabs">
        {tabs}
      </div>
    </div>
  )
}
export default Tabs