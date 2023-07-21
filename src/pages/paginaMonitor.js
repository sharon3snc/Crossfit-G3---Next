import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Manos from '../images/manos.jpg'
import Envelope from '../images/envelope.svg'
import PersonIcon from '../images/person-circle-red.svg'
import styles2 from '@/styles/PaginaUsuario.module.css'
import { useState } from 'react'
import HorarioPage from './horarioGrid2'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { render } from 'react-dom'
import axios from 'axios';
import { useEffect } from 'react';
import EditClientModal from './EditClientModal'
import EditEmployeeModal from './EditEmployeeModal'


export default function CrearUsuarioInfo(){
    const router = useRouter();
    const { employee_id } = router.query;
    const [userData, setUserData] = useState({});
    const [employeesData, setEmployeesData] = useState([]);
    const [clientsData, setClientsData] = useState([]);

    //asadfasdasdasd
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItemType, setDeleteItemType] = useState(null);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [classesDataForSelectedDate, setClassesDataForSelectedDate] = useState([]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [clientDataToEdit, setClientDataToEdit] = useState(null);

    const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
    const [employeeDataToEdit, setEmployeeDataToEdit] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/employees/${employee_id}`);
            setUserData(response.data.employee); // Assign the 'clients' array to usersData
          } catch (error) {
          }
        };

        const fetchClientsData = async () => {
            try {
              const response = await axios.get(`http://127.0.0.1:8000/clients`);
              setClientsData(response.data.clients); // Assign the 'clients' array to usersData]
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
    
        fetchUserData();
        fetchClientsData();
        fetchEmployeesData();
    }, [employee_id]);


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

  
    const deleteUser = (userId) => {
      setDeleteItemId(userId);
      setDeleteItemType('cliente');
      setDeleteModalOpen(true);
    };
  
    const deleteEmployee = (employeeId) => {
      setDeleteItemId(employeeId);
      setDeleteItemType('monitor');
      setDeleteModalOpen(true);
    };
  
    const confirmDeletion = async() => {
      if (deleteItemType === 'cliente') {
        // Implement your logic to delete the user with the deleteItemId
        // This could involve making an API call or updating the state
        // Once the user is deleted, you can perform any necessary actions
        const response = await axios.delete(`http://localhost:8000/clients/${deleteItemId}`);
        alert(`Cliente con ID ${deleteItemId} eliminado.`);
        window.location.reload();
      } else if (deleteItemType === 'monitor') {
        // Implement your logic to delete the employee with the deleteItemId
        // This could involve making an API call or updating the state
        // Once the employee is deleted, you can perform any necessary actions
        const response = await axios.delete(`http://localhost:8000/employees/${deleteItemId}`);
        alert(`Monitor con usuario R${deleteItemId} eliminado.`);
        window.location.reload();
      }
  
      setDeleteItemId(null);
      setDeleteItemType(null);
      setDeleteModalOpen(false);
    };
  
    const cancelDeletion = () => {
      setDeleteItemId(null);
      setDeleteItemType(null);
      setDeleteModalOpen(false);
    };

    const handlePrevDate = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prevDate);
      };
    
      const handleNextDate = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDate);
      };

      const openEditModal = (client) => {
        setClientDataToEdit(client);
        setEditModalOpen(true);
      };

      const openEditEmployeeModal = (employee) => {
        setEmployeeDataToEdit(employee);
        setEditEmployeeModalOpen(true);
      };


  // Función para renderizar el contenido de la página en función del tab activo
  const renderContent = () => {
    if (activeTab === 'Inicio') {
      return (
        <div className={styles2.userInfoContainer}>
             <p className={styles2.userInfoPageTitle}>Información Personal</p>
             <p>
                    <span className={styles2.userInfoTitle}>Usuario Empleado:</span>
                    <span className={styles2.userInfoData}> R{userData.employee_id}</span>
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
                    <div key={client.client_id} className={styles2.clientInfo}>
                        <p>
                            <p>
                                <span> {client.client_id}</span>
                            </p>
                            <p>
                                <span>{client.name} {client.surname}</span>
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
                        {userData.user_admin && ( // Conditionally render the "Monitores" tab
                            <div>
                              <p>
                                    <button onClick={() => deleteUser(client.client_id)}>Borrar</button>
                              </p>
                              <p>
                                    <button onClick={() => openEditModal(client)}>Editar</button>
                              </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button 
                className={styles2.redRoundButton}
                onClick={() => router.push(`/crearUsuarioInfo?employee_id=${employee_id}`)}
            >
                Añadir Cliente
            </button>
            {deleteModalOpen && (
                <div className={styles2.modal}>
                    <p>Estas seguro que deseas eliminar este {deleteItemType}?</p>
                    <div>
                    <button onClick={confirmDeletion}>Confirmar</button>
                    <button onClick={cancelDeletion}>Cancelar</button>
                    </div>
                </div>
            )}
            {editModalOpen && (
                <div className={styles2.modal}>
                {/* You can create a new component for the modal */}
                    <EditClientModal
                        clientData={clientDataToEdit}
                        onClose={() => setEditModalOpen(false)}
                    />
                </div>
            )}
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
    } else if (activeTab === 'Monitores'){
        return (
            <div className={styles2.userInfoContainer}>
                <p className={styles2.userInfoPageTitle}>Información de Monitores</p>
                <div className={styles2.employeeInfoContainer}>
                    {employeesData.map((employee) => (
                        <div key={employee.employee_id} className={styles2.clientInfo}>
                            <p>
                                <p>
                                    <span> R{employee.employee_id}</span>
                                </p>
                                <p>
                                    <span> {employee.name} {employee.surname}</span>
                                </p>
                            </p>
                            <p>
                                <p>
                                    <span> {employee.email}</span>
                                </p>
                                <p>
                                    <span> {employee.phone}</span>
                                </p>
                            </p>
                            <p>
                              <p>
                                    {parseInt(employee_id)!==employee.employee_id &&( <button onClick={() => deleteEmployee(employee.employee_id)} >Borrar</button>)}
                              </p>
                              <p>
                                    <button onClick={() => openEditEmployeeModal(employee)}>Editar</button>
                              </p>
                            </p>
                        </div>
                    ))}
                </div>
                <button 
                    className={styles2.redRoundButton}
                    onClick={() => router.push(`/crearMonitorInfo?employee_id=${employee_id}`)}
                >
                    Añadir Monitor
                </button>
                {deleteModalOpen && (
                    <div className={styles2.modal}>
                        <p>Estas seguro que deseas eliminar este {deleteItemType}?</p>
                        <div>
                        <button onClick={confirmDeletion}>Confirmar</button>
                        <button onClick={cancelDeletion}>Cancelar</button>
                        </div>
                    </div>
                )}
                {editEmployeeModalOpen && (
                    <div className={styles2.modal}>
                        {/* You can create a new component for the modal */}
                        <EditEmployeeModal
                            employeeData={employeeDataToEdit}
                            onClose={() => setEditEmployeeModalOpen(false)}
                        />
                    </div>
          )}
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
                <div key={classItem.class_id} className={styles2.classInfo}>
                  {/* Display the class information */}
                </div>
              ))}
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
                <Image src={Manos} alt="manos" className={styles2.imagenFondo} />
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
                        className={styles2.userPageHeaderItem}
                        onClick={() => handleTabClick('Clientes')}
                        >
                            Clientes
                        </p>
                        {userData.user_admin && ( // Conditionally render the "Monitores" tab
                              <p
                                className={styles2.userPageHeaderItem}
                                onClick={() => handleTabClick('Monitores')}
                              >
                                Monitores
                              </p>
                        )}
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

