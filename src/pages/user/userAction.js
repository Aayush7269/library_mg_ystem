import { getDoc,doc } from "firebase/firestore"

import { setAdmin } from "./userSlice"
import { db } from "../../config/firebase-config"
import { toast } from "react-toastify"

export const getUserAction = uid => async dispatch=>{
    try {
        //grt user information from user table
const userSnap =await getDoc(doc(db,"Users",uid))
console.log(userSnap)

if(userSnap.exists()){
    const user = userSnap.data()
    console.log(user)
    dispatch(setAdmin({...user, uid}))
}

    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
}