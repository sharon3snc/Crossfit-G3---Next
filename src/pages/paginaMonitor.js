import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Aros from '../images/aros.jpg'
import Pesas from '../images/55kg.jpg'
import Barra from '../images/barra.jpg'
import Manos from '../images/manos.jpg'
import Envelope from '../images/envelope.svg'
import PersonIcon from '../images/person-circle-red.svg'
import styles2 from '@/styles/PaginaUsuario.module.css'
import { useState } from 'react'
import HorarioPage from './horarioGrid2'
import { useRouter } from 'next/router';
import Link from 'next/link';


// Datos de todos los empleados.
// Este array será sustituido por una llamada a la API
const employeesData = [
    {
        employee_id: '1',
        password: '12345',
        name: 'Jose',
        surname: 'Rodriguez',
        birthdate: '1999-01-01',
        email: 'joserodriguez@gmail.com',
        phone: '123456789'
    },
    {
        employee_id: '2',
        password: '54321',
        name: 'Maria',
        surname: 'Garcia',
        birthdate: '1999-01-01',
        email: 'mariagarcia@hotmail.com',
        phone: '123456789'
    },
    {
        employee_id: '3',
        password: 'qwerty',
        name: 'Rocio',
        surname: 'Jimenez',
        birthdate: '1999-01-01',
        email: 'rociojimenez@yahoo.com',
        phone: '123456789'
    },
    {
        employee_id: '4',
        password: 'ytrewq',
        name: 'Antonio',
        surname: 'Gomez',
        birthdate: '1999-01-01',
        email: 'antoniogomez@gmail.com',
        phone: '123456789'
    }
]

// Datos de todos los clientes.
// Este array será sustituido por una llamada a la API
const clientsData = [
    {
        client_id: '1',
        email: 'juanperez@gmail.com',
        contrasena: '',
        name: 'Juan',
        surname: 'Perez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '2',
        email: 'josehurtado@gmail.com',
        contrasena: '',
        name: 'Jose',
        surname: 'Hurtado',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '3',
        email: 'albalopez@gmail.com',
        contrasena: '',
        name: 'Alba',
        surname: 'Lopez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '4',
        email: 'raquelalvarez@gmail.com',
        contrasena: '',
        name: 'Raquel',
        surname: 'Alvarez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '1',
        email: 'juanperez@gmail.com',
        contrasena: '',
        name: 'Juan',
        surname: 'Perez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '2',
        email: 'josehurtado@gmail.com',
        contrasena: '',
        name: 'Jose',
        surname: 'Hurtado',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '3',
        email: 'albalopez@gmail.com',
        contrasena: '',
        name: 'Alba',
        surname: 'Lopez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '4',
        email: 'raquelalvarez@gmail.com',
        contrasena: '',
        name: 'Raquel',
        surname: 'Alvarez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },{
        client_id: '1',
        email: 'juanperez@gmail.com',
        contrasena: '',
        name: 'Juan',
        surname: 'Perez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '2',
        email: 'josehurtado@gmail.com',
        contrasena: '',
        name: 'Jose',
        surname: 'Hurtado',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '3',
        email: 'albalopez@gmail.com',
        contrasena: '',
        name: 'Alba',
        surname: 'Lopez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    },
    {
        client_id: '4',
        email: 'raquelalvarez@gmail.com',
        contrasena: '',
        name: 'Raquel',
        surname: 'Alvarez',
        birthdate: '1999-01-01',
        phone: '123456789',
        inscription_date: '2021-01-01',
        emergency_phone: '987654321',
        emergency_contact: 'Maria',
        rate_id: '1',
        available_classes: '12'
    }
]


export default function CrearUsuarioInfo(){
    const router = useRouter();
    const { employee_id } = router.query;
    const userData = employeesData.find(user => user.employee_id === employee_id) || {};

    // useState para el tab activo
    const [activeTab, setActiveTab] = useState('Inicio');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName); 
      };

    // Sección de código para el dropdown de usuario que hace logout
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLogout = () => {
        // Aqui se pondrá la lógica de fin de sesion
    };

  // Función para renderizar el contenido de la página en función del tab activo
  const renderContent = () => {
    if (activeTab === 'Inicio') {
      return (
        <div className={styles2.userInfoContainer}>
             <p className={styles2.userInfoPageTitle}>Información Personal</p>
             <p>
                    <span className={styles2.userInfoTitle}>Usuario Empleado:</span>
                    <span className={styles2.userInfoData}> {userData.employee_id}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Nombre:</span>
                 <span className={styles2.userInfoData}> {userData.name}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Apellidos:</span>
                 <span className={styles2.userInfoData}> {userData.surname}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Email:</span>
                 <span className={styles2.userInfoData}> {userData.email}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Fecha de Nacimiento:</span>
                 <span className={styles2.userInfoData}> {userData.birthdate}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Teléfono:</span>
                 <span className={styles2.userInfoData}> {userData.phone}</span>
             </p>

      </div>
      );
    } else if (activeTab === 'Clientes') {
      return (
        <div className={styles2.userInfoContainer}>
            <p className={styles2.userInfoPageTitle}>Información de Clientes</p>
            <div className={styles2.clientInfoContainer}>
                {clientsData.map((client) => (
                    <div key='client.client_id' className={styles2.clientInfo}>
                        <p>
                            <p>
                                <span>Nombre:</span>
                                <span> {client.name}</span>
                            </p>
                            <p>
                                <span>Apellidos:</span>
                                <span> {client.surname}</span>
                            </p>
                        </p>
                        <p>
                            <p>
                                <span> {client.email}</span>
                            </p>
                            <p>
                                <span> {client.phone}</span>
                            </p>
                        </p>
                        <p>
                            <p>
                                <span> Tarifa:</span>
                                <span> {client.rate_id}</span>
                            </p>
                            <p>
                                <span> Clases disponibles:</span>
                                <span> {client.available_classes}</span>
                            </p>
                        </p>
                    </div>
                ))}
            </div>
            <button 
                className={styles2.redRoundButton}
                onClick={() => router.push(`/crearUsuarioInfo`)}
            >
                Añadir Cliente
            </button>
      </div>
      );
    } else if (activeTab === 'Horarios') {
      return (
        <div className={styles2.userInfoContainer}>
            <p className={styles2.userInfoPageTitle}>Información de Horarios</p>
            <div className={styles2.horarioContainer}>
                <HorarioPage className={styles2.horario}/>
            </div>
        </div>
      )
    }
  };

    return (
        <>
            <Head>
                <title>Crear Usuario</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles2.backgroundContainer}>
                <Image src={Manos} alt="manos" className={styles2.imagenFondo} />
                <div className={styles2.backgroundCanvas}>
                    <div className={styles2.userPageHeader}>
                        <p 
                        className={styles2.userPageHeaderItem}
                        onClick={() => handleTabClick('Inicio')}
                        >
                            Inicio
                        </p>
                        <p 
                        className={styles2.userPageHeaderItem}
                        onClick={() => handleTabClick('Horarios')}
                        >
                            Horarios
                        </p>
                        <p 
                        className={styles2.userPageHeaderItem}
                        onClick={() => handleTabClick('Clientes')}
                        >
                            Clientes
                        </p>
                        <p 
                        className={styles2.userPageHeaderUsername}
                        onClick={toggleDropdown}
                        >
                            <span>{userData.name} {userData.surname}</span>
                            <span><Image src={PersonIcon}/></span>
                        </p>
                        {showDropdown && (
                            <div className={styles2.userPageHeaderItem}>
                                <Link href="/">
                                <span onClick={handleLogout} className={styles2.logoutLink}>
                                    Logout
                                </span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={styles2.userPageBody}>
                        {renderContent()}
                    </div>
                </div>
            </div>


        </>
    )
}

