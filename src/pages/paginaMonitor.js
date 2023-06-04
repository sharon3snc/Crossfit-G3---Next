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
import HorarioPage from './horarioGrid'

export default function CrearUsuarioInfo(){
    const userData = {
        employee_id: '1',
        email: 'juanperez@gmail.com',
        contrasena: '',
        name: 'Maria',
        surname: 'Rodriguez',
        birthdate: '1999-01-01',
        phone: '123456789',
        emergency_phone: '987654321',
        emergency_contact: 'Maria'
    }

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


    const [activeTab, setActiveTab] = useState('Inicio'); // State to keep track of the active tab

    // Define a function to handle tab click
    const handleTabClick = (tabName) => {
      setActiveTab(tabName); // Set the clicked tab as the active tab
    };

    // Render different content based on the active tab
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
    // Add more conditions for other tabs if needed
  };

  const UserInfomation = `

  `


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
                        <p className={styles2.userPageHeaderUsername}>
                            <span>{userData.name} {userData.surname}</span>
                            <span><Image src={PersonIcon}/></span>
                        </p>
                    </div>
                    <div className={styles2.userPageBody}>
                        {renderContent()}
                    </div>
                </div>
            </div>


        </>
    )
}
