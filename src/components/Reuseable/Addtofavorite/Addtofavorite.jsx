import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Btn from '../../Btn/Btn'
import './Addtofavorite.css'
import firebase from 'firebase'
const Addtofavorite = (props) => {
  const {id, icon, text, className, Tag=Btn, issaved, tv=false} = props
  const {user, saved, watching} = useContext(ContextApp)
  const handleAddToFavorite = () => {
   if(issaved) {
    db.collection('users').doc(user.uid).update({
      saved: firebase.firestore.FieldValue.arrayRemove({id, tv, profile: watching})
    })
   }
   else {
    db.collection('users').doc(user.uid).update({
      saved: firebase.firestore.FieldValue.arrayUnion({id, tv, watching: watching})
    })
   }
  }

  return (
  
    <Tag onClick={()=>{ handleAddToFavorite()}} clickEvent={()=> handleAddToFavorite()} className={`${issaved?'fa fa-heart':'fal fa-heart'}`} text={text}/>
 
  )
}
export default Addtofavorite