import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Barra from '../images/barra.jpg'
import Envelope from '../images/envelope.svg'
import PersonIcon from '../images/person-circle-red.svg'
import styles2 from '@/styles/PaginaUsuario.module.css'
import { useState } from 'react'
import HorarioPage from './horarioGrid2'
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';

let usersData = [];



export default function CrearUsuarioInfo() {
  const router = useRouter();
  const { client_id } = router.query;
  const [userData, setUserData] = useState({});
  const [employeesData, setEmployeesData] = useState([]);

  const [activeTab, setActiveTab] = useState('Inicio');

  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classesDataForSelectedDate, setClassesDataForSelectedDate] = useState([]);

  const [assistanceData, setAssistanceData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/clients/${client_id}`);
        setUserData(response.data.client); // Assign the 'clients' array to usersData
      } catch (error) {
      }
    };

    const fetchEmployeesData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/employees`);
        setEmployeesData(response.data.employees); // Assign the 'clients' array to usersData
      } catch (error) {
      }
    };

    const fetchAssistanceData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/assistance_by_client/${client_id}`);
        setAssistanceData(response.data);
      } catch (error) {
      }
    };

    fetchUserData();
    fetchEmployeesData();
    fetchAssistanceData();
  }, [client_id]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0, so we add 1 and pad with '0'
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/classes?day=${formatDate(selectedDate)}`);
        setClassesDataForSelectedDate(response.data.classes); // Assign the 'clients' array to usersData]
      } catch (error) {
      }
    };
    fetchClassData();
  }, [selectedDate]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    // para implementar cuando se haga logout
  };

  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(selectedDate.getDate() - 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (prevDate < yesterday) return; // Don't allow the user to select a date in the past
    else {
      setSelectedDate(prevDate);
    }
  };

  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1);
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    if (nextDate > weekFromNow) return; // Don't allow the user to select a date in the future
    else {
      setSelectedDate(nextDate);
    }
  };

  const convertSecondsToTime = (seconds) => {
    const date = new Date(Date.UTC(0, 0, 0, Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60))); // Create a date object at UTC midnight
    const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };
    return date.toLocaleTimeString([], options);
  };

  const findEmployeeByID = (id) => {
    const selected_employee = employeesData.find((employee) => employee.employee_id === id);
    if (selected_employee) {
      return selected_employee.name + " " + selected_employee.surname;
    } else {
      return "Employee not found";
    }
  }

  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [cancelAssistanceModalOpen, setCancelAssistanceModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});

  const assistanceModal = (class_id) => {
    setAssistanceModalOpen(true);
    setSelectedClass(class_id);
  }

  const cancelAssistanceModal = (class_id) => {
    setCancelAssistanceModalOpen(true);
    setSelectedClass(class_id);
  }


  const confirmAssistance = async () => {

    const number_spaces = classesDataForSelectedDate.find(classItem => classItem.class_id === selectedClass).number_spaces;
    if (number_spaces === 0) {
      alert("No quedan plazas disponibles para esta clase.");
      setAssistanceModalOpen(false);
      return;
    }


    if (Array.isArray(assistanceData) && assistanceData.length > 0) {
      const assistance = assistanceData.find(assistance => assistance.class_id === selectedClass);

      if (assistance) {
        alert("Ya tienes reservada esta clase.");
        setAssistanceModalOpen(false);
        return;
      }


    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/assistance?client_id=${client_id}&class_id=${selectedClass}`);
      const response2 = await axios.post(`http://127.0.0.1:8000/classes/${selectedClass}/decrement_spaces`)

      if (response.data.error) {
        alert("Error: " + response.data.error);
        return;
      }

      setAssistanceModalOpen(false);
      window.location.reload();

    } catch (error) {
      console.error("There was an error making the request:", error);
      alert("Failed to confirm assistance. Please try again.");
    }
  }

  const cancelAssistance = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete_assistance/${client_id}/${selectedClass}`);
      const response2 = await axios.post(`http://127.0.0.1:8000/classes/${selectedClass}/increment_spaces`)
    } catch (error) {
      console.error("There was an error making the request:", error);
      alert("Failed to cancel assistance. Please try again.");
    }

    setCancelAssistanceModalOpen(false);
    window.location.reload();
  }




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
            <HorarioPage className={styles2.horario} />
          </div>
        </div>
      );
    } else if (activeTab === 'Clases') {
      return (
        <div className={styles2.userInfoContainer}>
          <p className={styles2.userInfoPageTitle}>Información de Clases</p>

          {/* Step 4: Add the header with arrow buttons to select the date */}
          <div className={styles2.dateHeader}>
            <button onClick={handlePrevDate}>&lt;</button>
            <p>{selectedDate.toDateString()}</p>
            <button onClick={handleNextDate}>&gt;</button>
          </div>

          <div className={styles2.classesContainer}>
            {classesDataForSelectedDate.map((classItem) => (
              <div key={classItem.class_id} className={styles2.clientInfo}>
                <p>
                  <p>
                    <span> {classItem.class_date}</span>
                  </p>
                  <p>
                    <span> {convertSecondsToTime(classItem.class_hour)}</span>
                  </p>
                </p>
                <p>
                  <p>
                    <span> {classItem.class_name}</span>
                  </p>
                  <p>
                    <span> {classItem.duration} min</span>
                  </p>
                </p>
                <p>

                  <p>
                    <span> Coach: {findEmployeeByID(classItem.employee_id)}</span>
                  </p>
                  <p>
                    <span> Plazas: {classItem.number_spaces}</span>
                  </p>
                </p>
                <p>
                  {
                    Array.isArray(assistanceData) && assistanceData.some(assistance => assistance.class_id === classItem.class_id)
                      ? <button className={styles2.listButton} onClick={() => cancelAssistanceModal(classItem.class_id)}>Cancelar Reserva</button>
                      : <button className={styles2.listButton} onClick={() => assistanceModal(classItem.class_id)}> Reservar</button>
                  }
                </p>

              </div>
            ))}
          </div>
          {assistanceModalOpen && (
            <div className={styles2.modal}>
              <p>¿Deseas confirmar asistencia a esta clase?</p>
              <div>
                <button onClick={() => confirmAssistance()}>Confirmar</button>
                <button onClick={() => setAssistanceModalOpen(false)}>Cancelar</button>
              </div>
            </div>
          )}
          {cancelAssistanceModalOpen && (
            <div className={styles2.modal}>
              <p>¿Deseas cancelar asistencia a esta clase?</p>
              <div>
                <button onClick={() => cancelAssistance()}>Confirmar</button>
                <button onClick={() => setCancelAssistanceModalOpen(false)}>Cancelar</button>
              </div>
            </div>
          )}
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
            {/* <p
              className={styles2.userPageHeaderItem}
              onClick={() => handleTabClick('Reservas')}
            >
              Reservas
            </p> */}
            <p
              className={styles2.userPageHeaderItem}
              onClick={() => handleTabClick('Horarios')}
            >
              Horarios
            </p>
            <p
              className={styles2.userPageHeaderItem}
              onClick={() => handleTabClick('Clases')}
            >
              Clases
            </p>
            <p
              className={styles2.userPageHeaderUsername}
              onClick={toggleDropdown}
            >
              <span>{userData.name} {userData.surname}</span>
              <span><Image src={PersonIcon} /></span>
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

