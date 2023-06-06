import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Aros from '../images/aros.jpg'
import Pesas from '../images/55kg.jpg'
import Barra from '../images/barra.jpg'
import Envelope from '../images/envelope.svg'
import PersonIcon from '../images/person-circle-red.svg'
import styles2 from '@/styles/PaginaUsuario.module.css'
import { useState } from 'react'
import HorarioPage from './horarioGrid2'
import { useRouter } from 'next/router';
import Link from 'next/link';


const usersData = [
    {
        client_id: '1',
        email: 'juanperez@gmail.com',
        password: '12345',
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
        password: '54321',
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
        password: 'qwerty',
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
        password: 'ytrewq',
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
    const { client_id } = router.query;
    
    const userData = usersData.find(user => user.client_id === client_id) || {};
    const [activeTab, setActiveTab] = useState('Inicio'); 

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };

    const handleLogout = () => {
        // para implementar cuando se haga logout
    };


  const renderContent = () => {
    if (activeTab === 'Inicio') {
      return (
        <div className={styles2.userInfoContainer}>
             <p className={styles2.userInfoPageTitle}>Información Personal</p>
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
                 <span className={styles2.userInfoTitle}>Fecha de Inscripción:</span>
                 <span className={styles2.userInfoData}> {userData.inscription_date}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Teléfono:</span>
                 <span className={styles2.userInfoData}> {userData.phone}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Contacto de Emergencia:</span>
                 <span className={styles2.userInfoData}> {userData.emergency_contact}</span>
             </p>
             <p>
                 <span className={styles2.userInfoTitle}>Teléfono de Emergencia:</span>
                 <span className={styles2.userInfoData}> {userData.emergency_phone}</span>
             </p>
      </div>
      );
    } else if (activeTab === 'Reservas') {
      return (
        <div className={styles2.userInfoContainer}>
            <p className={styles2.userInfoPageTitle}>Información de Reservas</p>
            <p>
                <span className={styles2.userInfoTitle}>Tipo de tarifa:</span>
                <span className={styles2.userInfoData}> {userData.rate_id}</span>
            </p>
            <p>
                <span className={styles2.userInfoTitle}>Clases disponibles:</span>
                <span className={styles2.userInfoData}> {userData.available_classes}</span>
            </p>
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
      );
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
                <Image src={Barra} alt="manos" className={styles2.imagenFondo} />
                <div className={styles2.backgroundCanvas}>
                    <div className={styles2.userPageHeader}>
                        <p 
                        className={styles2.userPageHeaderItem}
                        onClick={() => handleTabClick('Inicio')}
                        >
                            Perfil
                        </p>
                        <p 
                        className={styles2.userPageHeaderItem}
                        onClick={() => handleTabClick('Reservas')}
                        >
                            Reservas
                        </p>
                        <p 
                        className={styles2.userPageHeaderItem}
                        onClick={() => handleTabClick('Horarios')}
                        >
                            Horarios
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

