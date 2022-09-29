import React from 'react'
import { Link } from 'react-router-dom'
import { footerlinks } from '../../../Arrays'
import Lngselect from '../../Select/Lngselect'
import './Footer.css'

const Footer = (props) => {

  const footerlinksrow = footerlinks.map(link=> {
    return (
      <div className="column flex">
        {
          link.links.map(link=> {
            return (
              <Link to={link.link}>
                {link.text}
              </Link>
            )
          })
        }
      </div>
    )
  })  

  return (
    <div className="footer">
      <div className="innerfooter">
      <h4>Questions? Call <a target='__blank' href="tel:18445424813">1-844-542-4813</a></h4>
      
      <div className="columns flex">
        {footerlinksrow}
      </div>
      <div className="flex lngfooter">
      <Lngselect />
      <span>Netflix Canada</span>
      </div>
      </div>
    </div>
  )
} 
export default Footer