import React, { useState } from 'react'
import Btn from '../Btn/Btn'


const Plantable = (props) => {
  const {active, setActive, handleSignup} = props

  const data = [
    {
      text: 'Monthly Price',
      options: [
        {
          value: 'basic',
          text: '$9.99'
        },
        {
          value: 'standard', 
          text: '$14.99'
        },
        {
          value: 'premium',
          text: '$18.99'
        }
      ]
    },
    {
      text: 'Video Quality',
      options: [
        {
          value: 'basic',
          text: 'Good'
        },
        {
          value: 'standard', 
          text: 'Better'
        },
        {
          value: 'premium',
          text: 'Best'
        }
      ]
    },
    {
      text: 'Resolution',
      options: [
        {
          value: 'basic',
          text: '480p'
        },
        {
          value: 'standard', 
          text: '1080p'
        },
        {
          value: 'premium',
          text: '4K + HDR'
        }
      ]
    },
    {
      text: 'Watch on your TV, computer, mobile phone and tablet',
      options: [
        {
          value: 'basic',
          text: 'fal fa-check',
          icon: true
        },
        {
          value: 'standard', 
          text: 'fal fa-check',
          icon: true
        },
        {
          value: 'premium',
          text: 'fal fa-check',
          icon: true
        }
      ]
    },

  ]
  const datarow = data.map(el=> {
    return (
      <div className={"tableitem "}>
        <span>{el.text}</span>
        <div className={"tableoptions flex"}>
          {el.options.map(option=> {
            if(option.icon) {
              return (
                <span className={option.value === active?'activeitem':''}><i className={option.text}></i></span>
              )
            }
            else {
              return <span className={option.value === active?'activeitem':''}>{option.text}</span>
            }
          })}
        </div>
      </div>
    )
  })
  const boxes = data[0].options.map(box=> {
    return (
      <div className={`box ${box.value === active?'activebox':''}`} onClick={()=> setActive(box.value)}>
        {box.value}
      </div>
    )
  })

  return (
    <div className="plantable">
      <div className="plantablebox flex">
          {boxes}
      </div>
        <div className="plantableitems flex">
         {datarow}
        </div>
      <Btn text='Register' clickEvent={()=> {handleSignup(); console.log('asd')}}/>
    </div>
  )
}
export default Plantable