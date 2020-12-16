// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

export const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyDf6CTNHmAJeOJmV9dHUOO2R9ty6YCz6vU',
    authDomain: 'sophieboyerfr-dd1d1.firebaseapp.com',
    projectId: 'sophieboyerfr-dd1d1',
    storageBucket: 'sophieboyerfr-dd1d1.appspot.com',
    messagingSenderId: '152894483763',
    appId: '1:152894483763:web:9d7e3f31e7ad6069ede246',
    measurementId: 'G-Y37NK9PPZQ'
  })
  .database()

export const fire = firebase

// Get a reference to the storage service, which is used to create references in your storage bucket
export var storage = firebase.storage()

// Create a storage reference from our storage service
export var storageRef = storage.ref()
