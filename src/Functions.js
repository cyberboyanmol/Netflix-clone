import { db } from "./Fire"
import firebase from 'firebase'

export function writeUserDoccuments(user, email, plan) {

  db.collection('users').doc(user.uid).set({
    people: [
      {
        name: 'User 1',
        nameid: db.collection('users').doc().id,
        active: false,
        img: 'https://i.imgur.com/11pssYq.png',
        autoplaypreview: true, 
        autoplaynext: true,
        lang: 'en',
      }
    ],
    userinfo: {
        email,
        userid: user.uid,
        plan: plan,
        phone: null,

    },
    saved: [],
    watched: [],
    lastmoviewatched: {
      time: null,
      id: null
    },
    created: new Date()
  })
  
}
export function findProfile (profiles, id) {
    return profiles.find(x=> x.nameid === id)
}
export function timeConvert(num)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours+'h '+minutes+'m';         
}

export function convertDate(date, noyear) {
  if(noyear) {
    return (
      date.toLocaleString('en-US', { month: 'long', day: 'numeric', weekday: 'long' })
    )
  }
  else {
    return (
      date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    )
  }
}