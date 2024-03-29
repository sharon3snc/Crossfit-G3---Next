import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Aros from '../images/aros.jpg'
import styles2 from '@/styles/Login.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'


const initialFormData = {
    user: '',
    password: '',
}

export default function LoginInfo(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        user: '',
        password: ''
    });

    const handleEvent = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let matchedUser = false
        let clientUser = false
        let exists = false
        console.log("SUBMIT")
        if(formData.user[0]==='R'){
            const user_id = formData.user.slice(1);
            try {
                const response = await axios.post('http://localhost:8000/employees/check', {
                  employee_id: parseInt(user_id),
                  password: formData.password,
                })
                console.log(user_id)
                exists = response.data.exists
                console.log(exists)
                if (exists) {
                  router.push(`/paginaMonitor?employee_id=${user_id}`)
                } else {
                  alert('El usuario o la contraseña son incorrectos')
                }
              } catch (error) {
                console.log('Error:', error)
                alert('Ocurrió un error durante el inicio de sesión')
              }
        }else{
            try {
                const response = await axios.post('http://localhost:8000/clients/check', {
                  client_id: parseInt(formData.user),
                  password: formData.password,
                })
          
                exists = response.data.exists

                if (exists) {
                  router.push(`/paginaUsuario?client_id=${formData.user}`)
                } else {
                  alert('El usuario o la contraseña son incorrectos')
                }
              } catch (error) {
                console.log('Error:', error)
                alert('Ocurrió un error durante el inicio de sesión')
              }
        }


        if(!exists){
            alert('El usuario o la contraseña son incorrectos');
        }

        setFormData(initialFormData)
    }

    const isUserValid = formData.user.trim() !== '';
    const isPasswordValid = formData.password.trim() !== '';
  
    const isSubmitDisabled = !isUserValid || !isPasswordValid;
    

    return (
        <>
            <Head>
                <title>Crear Usuario</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles2.backgroundContainer}>
                <Image src={Aros} alt="manos" className={styles2.imagenFondo} />
                <div className={styles2.backgroundCanvas}>
                    <div className={styles2.propContainer}>
                        <Image src={Logo} alt="logo" className={styles2.logo} />
                        <form className={styles2.formContainer} onSubmit={handleSubmit}>
                            <input 
                                className={styles2.formInput}
                                name="user"
                                type="text"
                                placeholder='Codigo de Usuario'
                                value={formData.user}
                                onChange={handleEvent}
                            />
                            <input
                                className={styles2.formInput}
                                name="password"
                                type="password"
                                placeholder='Contraseña'
                                value={formData.password}
                                onChange={handleEvent}
                            />
                            <br/>
                            <a href=''>¿Has olvidado tu contraseña?</a>
                            <br/>
                            <br/>
                            <button 
                                className={`${
                                    isSubmitDisabled ? styles2.disabledRoundButton : styles2.redRoundButton
                                  }`}
                                type="submit"
                                disabled={isSubmitDisabled}
                            >Iniciar Sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

