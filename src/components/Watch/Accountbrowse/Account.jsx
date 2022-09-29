import React, { useContext, useState } from 'react'
import { avatars } from '../../../Arrays'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Logo from '../../Reuseable/Logo/Logo'
import firebase from 'firebase'
import Lngselect from '../../Select/Lngselect'
const Account = () => {
  const {profiles, user, setWatching, watching, editing, setEditing} = useContext(ContextApp)
  const [profile, setProfile] = useState({
    name: '', 
    img: ''
  })
  const [modal, setModal] = useState({
    active: false, 
    profile: {}
  })
  const [avatar, setAvatar] = useState(false)
  const profilesrow = profiles?.map(profile=> {
    return (
      <div className={`${editing?'editing':''} profile`} onClick={()=> editing ?setModal({active: true, profile: profile}): setWatching(profile.nameid)}>
        <div>
          <img src={profile.img} alt=""/>
          {editing &&  <i className='fa fa-pen'></i>}
        </div>
        <span>{profile.name}</span>
      </div>
    )
  })
  const avatarsrow = avatars.map(avatar=> {
    return (
      <img src={avatar} onClick={()=> setModal({...modal, profile: {...modal.profile, img: avatar}})} alt=""/>
    )
  })
  const handleEdit = () => {
    setEditing(true)
  }
  const handleUpdate = () => {
    setEditing(false)
  }
  const handleAdd = () => {
    db.collection('users').doc(user.uid).update({
      people: firebase.firestore.FieldValue.arrayUnion({
        name: `User ${profiles.length + 1}`,
        nameid: db.collection('users').doc().id,
        active: false,
        img: 'https://i.imgur.com/11pssYq.png',
        autoplaypreview: true, 
        autoplaynext: true,
        lang: 'en',
      })
    })
  }
  const handleDelete = () => {
    profiles.forEach(profile=> {
      if(profile.nameid === modal.profile.nameid) {
        let index = profiles.indexOf(profile)
        profiles.splice(index, 1)
        db.collection('users').doc(user.uid).update({
          people: profiles
        })
        .then(()=> {
          setModal({active: false, profile: {}})
        })
      }
    })
  }
  const handleSave = () => {
    profiles.forEach(profile=> {
      if(profile.nameid === modal.profile.nameid) {
        let index = profiles.indexOf(profile)
        profiles[index].name = modal.profile.name
        profiles[index].img = modal.profile.img
        db.collection('users').doc(user.uid).update({
          people:profiles
        })
        .then(()=> setModal({active: false, profile: {}}))
      } 
    })

  }
  return (
    <>
    <div className="whowatchtop" style={{zIndex: 1000}}>
    <Logo />
  </div>
  <div className={`${editing?'editing':''} watching`}>
    <h1 className='maintitle'>{editing?'Manage Profiles':'Who\'s Watching?'}</h1>
    <div className="profilesrow">
      {profilesrow}
      {editing?
      <div className='addbox' onClick={()=> handleAdd()}>
        <i className='fa fa-plus'></i>
      </div>  
      :''
    }
    </div>
   {
     editing?
     <button className='editingbtn' onClick={()=> handleUpdate()}>DONE</button>
     :
     <button onClick={()=> handleEdit()}>Manage Profiles</button>
   }
  </div>
  <div className={`${modal.active?'activemodal':''} editprofilemodal`}>
    <div className="modalcont">
    <h1>Edit Profile</h1>
    <div className="profilecont">
        <div className="innerprofilecont">
            <div className="leftitem">
                <div>
                  <img src={modal.profile.img} alt=""/>
                  <i className='fa fa-pen' onClick={()=> setAvatar(true)}></i>
                </div>
            </div>
            <div className="rightitem">
                <div className="up">
                <input value={modal.profile.name} onChange={(e)=> setModal({...modal, profile: {...modal.profile, name: e.target.value}})}/>
                <div>
                  <span>Language</span>
                  <Lngselect />
                </div>
                </div>
                <div className="mid">
                  <h3>Maturity Settings</h3>
                  <button className='outline'>ALL MATURITY RATINGS</button>
                  <span>Show titles of all maturity ratings for this profile.</span>
                  <button className='outline'>EDIT</button>
                </div>
                <div className="btm">
                  <h3>Autoplay controls</h3>
                  <div className="nextep check flex">
                    <input type="checkbox" name="" id=""/>
                    <span>Autoplay next episode in a series on all devices</span>
                  </div>
                  <div className="nextep check flex">
                    <input type="checkbox" name="" id=""/>
                    <span>Autoplay previews while browsing on all devices.</span>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div className="profilcontr flex">
      <button className="save outline" onClick={()=> handleSave()}>SAVE</button>
      <button className="outline" onClick={()=> setModal({active: false, profile: {}})}>CANCEL</button>
      <button className="outline" onClick={()=> handleDelete()}>DELETE PROFILE</button>
    </div>
    </div>
  </div>
  <div className={`${avatar?'activemodal':''} editprofilemodal avatarmodal`}>
   <div className="avatarmodalcont">
   <div className="top">
      <div className="leftedit">
        <i className='fal fa-arrow-left' onClick={()=> setAvatar(false)}></i>
        <div>
          <h2>Edit Profile</h2>
          <h2>Choose a profile icon.</h2>
        </div>
      </div>
      <div className="rightedit">
        <span>{modal.profile.name}</span>
        <img src={modal.profile.img} alt=""/>
      </div>
    </div>
    <div className="avatarsrow favr">
      <h2>The Classics</h2>
      <div className="inneravatarsrow">
        {avatarsrow}
      </div>
    </div>
   </div>
  </div>
  </>
  )
}
export default Account