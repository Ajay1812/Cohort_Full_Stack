import { Signup } from '../../../../packages/ui/src/components/Signup'
import axios from 'axios'

export default function SignupPage() {
  return <div>
    <Signup onClick={async (username, password) => {
      const response = await axios.post('api/signup/', {
        username,
        password
      })
      localStorage.setItem('token', response.data.token)
    }} />
  </div>
}
