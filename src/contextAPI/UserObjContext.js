import { useState, createContext } from 'react'

const UserObjContext = createContext()

export const UserObjProvider = ({ children }) => {
  const [userObj, setUserObj] = useState({})
  
  return (
    <UserObjContext.Provider value={[userObj, setUserObj]}>
      {children}
    </UserObjContext.Provider>
  )
}

export default UserObjContext