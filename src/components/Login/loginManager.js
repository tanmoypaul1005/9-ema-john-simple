import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
  }
}


export const handleGoogleSingIn=()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
  .then((result) => {
    const {displayName,photoURL,email}=result.user;
    const signedInUser={
      isSignedIn:true,
      name:displayName,
      email:email,
      photo:photoURL,
      success:true

    };
    return signedInUser;
  }).catch((error) => {
    console.log(error);
    console.log(error.message);
  })
  }



  export const handleFbSingIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
  }

  

  export const handleSingOut=()=>{
   return firebase.auth().signOut()
    .then((result) => {
      const singedOutUser={
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
    error:'',
    success:false
      }
      return singedOutUser;
    }).catch((error) => {
      // An error happened.
    });
  }



  export const createUserWithEmailAndPassword=(name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
    const newUserInfo=res.user;
    newUserInfo.error='';
    newUserInfo.success=true;
    UpdateUserName(name);
    return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
  
    });
  }


  export const signInWithEmailAndPassword=(email,password)=>{
   return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((res) => {
    const newUserInfo=res.user;
    newUserInfo.error='';
    newUserInfo.success=true;
    return newUserInfo
    })
    .catch((error) => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }



  const UpdateUserName =name=>{
    const user = firebase.auth().currentUser;
    
    user.updateProfile({
      displayName: name
      
    }).then(() => {
      console.log('User Name Updated Successfully')
    }).catch((error) => {
      console.log(error)
    });  
    }