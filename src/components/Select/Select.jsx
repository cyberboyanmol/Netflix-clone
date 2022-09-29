import React from 'react'

const Select = (props) => {
  const {options, value, setValue, className=''} = props

  const optionsrow = options.map(option=> {
    return (
      <option value={option.value??option}>
        {option.text??option}
      </option>
    )
  })

  return (
    <select className={'select '+className} onChange={(e)=> setValue(e.target.value)} value={value}>
      {optionsrow}
    </select>
  )
}
export default Select