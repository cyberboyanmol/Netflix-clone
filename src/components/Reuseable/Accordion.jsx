import React, {useEffect, useState} from 'react'
import { Accordion } from '@material-ui/core';
import {AccordionSummary} from '@material-ui/core';
import {AccordionDetails} from '@material-ui/core';

const AccordionTab = (props) => {

  const {title, icon='fal fa-chevron-right'} = props 
  const [expanded, setExpanded] = useState(false)
 
  useEffect(()=> {

    if(expanded) {
  
      window.onclick = () => {
        setExpanded(false)
      }

    }
  }, [expanded])
 
  return (
    <div className="accordiontab">
      <Accordion expanded={expanded}>
      <AccordionSummary
          onClick={(e)=> {setExpanded(!expanded); e.stopPropagation()}}
          className='accordionsummary'
          expandIcon={<i className={icon}></i>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {title}
        </AccordionSummary>
        <AccordionDetails onClick={(e)=> e.stopPropagation()} className='accordioncont'>
            {props.children}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
export default AccordionTab