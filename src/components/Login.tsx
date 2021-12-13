import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth' 
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react' 
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../Auth/auth'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            if(user){
                if(!auth.user){
                    auth.signIn(user.uid)
                    navigate(from, { replace: true })
                }
            } else {
                const uiConfig: firebaseui.auth.Config =  {
                    signInOptions: [
                        GoogleAuthProvider.PROVIDER_ID
                    ],
                    callbacks: {
                        signInSuccessWithAuthResult: () => {
                            navigate('/')
                            return true
                        }
                    }
                }
                const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(getAuth())
                ui.start('#firebaseui-auth-container', uiConfig)
            }
        })

    }, [navigate, location, auth, from])

    return (
        <>
            <div id="firebaseui-auth-container"></div>
        </>
    )   
}

export default Login
