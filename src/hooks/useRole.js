import  { useState } from 'react'

function useRole() {

    const [role,setRole] = useState("")

  return {role,setRole}
}

export default useRole;
