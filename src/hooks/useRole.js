import  { useState } from 'react'

function useRole() {

    const [role,setRole] = useState("")
    console.log(role)
  return {role,setRole}
}

export default useRole
