import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Manos from '../images/manos.jpg'
import Envelope from '../images/envelope.svg'
import PersonIcon from '../images/person-circle-red.svg'
import styles2 from '@/styles/PaginaUsuario.module.css'
import { use, useState } from 'react'
import HorarioPage from './horarioGrid2'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { render } from 'react-dom'
import axios from 'axios';
import { useEffect } from 'react';


export default function CrearUsuarioInfo() {
    const router = useRouter();
    const { employee_id } = router.query;
    const [userData, setUserData] = useState({});
    const [employeesData, setEmployeesData] = useState([]);
    const [clientsData, setClientsData] = useState([]);
    const [classesData, setClassesData] = useState([]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItemType, setDeleteItemType] = useState(null);

    const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
    const [assistanceClassId, setAssistanceClassId] = useState(null);
    const [assistanceClassDate, setAssistanceClassDate] = useState(null);
    const [assistanceClassHour, setAssistanceClassHour] = useState(null);
    const [assistanceData, setAssistanceData] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [classesDataForSelectedDate, setClassesDataForSelectedDate] = useState([]);
    const [sortedClassesDataForSelectedDate, setSortedClassesDataForSelectedDate] = useState([]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [clientDataToEdit, setClientDataToEdit] = useState(null);

    const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
    const [employeeDataToEdit, setEmployeeDataToEdit] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/employees/${employee_id}`);
                setUserData(response.data.employee);
            } catch (error) {
            }
        };

        const fetchClientsData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/clients`);
                setClientsData(response.data.clients);
            } catch (error) {
            }
        };

        const fetchEmployeesData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/employees`);
                setEmployeesData(response.data.employees);
            } catch (error) {
            }
        };

        fetchUserData();
        fetchClientsData();
        fetchEmployeesData();
    }, [employee_id]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/classes?day=${formatDate(selectedDate)}`);
                setClassesDataForSelectedDate(response.data.classes);
                setSortedClassesDataForSelectedDate(response.data.classes.sort((a, b) => a.class_hour.substring(0,2) - b.class_hour.substring(0,2)));

            } catch (error) {
            }
        };
        fetchClassData();
    }, [selectedDate]);


    const [activeTab, setActiveTab] = useState('Inicio');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

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

    const deleteClass = (classId) => {
        setDeleteItemId(classId);
        setDeleteItemType('clase');
        setDeleteModalOpen(true);
    };

    const confirmDeletion = async () => {
        if (deleteItemType === 'cliente') {
            const response = await axios.delete(`http://localhost:8000/clients/${deleteItemId}`);
            alert(`Cliente con ID ${deleteItemId} eliminado.`);
            window.location.reload();
        } else if (deleteItemType === 'monitor') {
            const response = await axios.delete(`http://localhost:8000/employees/${deleteItemId}`);
            alert(`Monitor con usuario R${deleteItemId} eliminado.`);
            window.location.reload();
        } else if (deleteItemType === 'clase') {
            const response = await axios.delete(`http://localhost:8000/classes/${deleteItemId}`);
            alert('Clase eliminada.');
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
        console.log(employee);
        console.log(employee_id)
        setEditEmployeeModalOpen(true);
    };

    const onCloseModal = () => {
        setEditModalOpen(false);
        setEditEmployeeModalOpen(false)
    };

    const onEditModalSubmit = () => {
        setEditModalOpen(false);
        setEditEmployeeModalOpen(false)
        window.location.reload();
    }

    const findEmployeeByID = (id) => {
        const selected_employee = employeesData.find((employee) => employee.employee_id === id);
        if (selected_employee) {
            return selected_employee.name + " " + selected_employee.surname;
        } else {
            return "Employee not found";
        }
    }

    useEffect(() => {
        const fetchAssistanceData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/assistance_by_class/${assistanceClassId}`);
                if(response.data.length > 0){
                    setAssistanceData(response.data);
                }else{
                    setAssistanceData([]);
                }
                console.log(response.data);
                console.log("fetched")
            } catch (error) {
                setAssistanceData([]);
            }
        };
        fetchAssistanceData();
    }, [assistanceModalOpen]);

    const showAssistanceModal = (classId, classDate, classHour) => {
        setAssistanceModalOpen(true);
        setAssistanceClassId(classId);
        setAssistanceClassDate(classDate);
        setAssistanceClassHour(classHour);

    }

    const closeAssistance = () => {
        setAssistanceModalOpen(false);
    }

    const deleteAssistance = async (clientId) => {
        const response = await axios.delete(`http://localhost:8000/delete_assistance/${clientId}/${assistanceClassId}`);
        const response2 = await axios.post(`http://127.0.0.1:8000/classes/${assistanceClassId}/increment_spaces`)
        const client = clientsData.find(client => client.client_id === clientId);
        alert(`Asistencia de ${client.name} ${client.surname} eliminada.`);
        setAssistanceModalOpen(false);
        window.location.reload();
    }


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
                                {userData.user_admin && (
                                    <div>
                                        <p>
                                            <button className={styles2.listButton} onClick={() => deleteUser(client.client_id)}>Borrar</button>
                                        </p>
                                        <p>
                                            <button
                                                className={styles2.listButton}
                                                onClick={() => router.push(`/crearUsuarioInfo?employee_id=${employee_id}&edit=true&edit_client_id=${client.client_id}`)}
                                            >
                                                Editar
                                            </button>
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
            )
        } else if (activeTab === 'Monitores') {
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
                                        <span> Rol:</span>
                                    </p>
                                    <p>
                                        <span> {employee.user_admin ? "Admin" : "Monitor"}</span>
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
                                        {parseInt(employee_id) !== employee.employee_id && (<button className={styles2.listButton} onClick={() => deleteEmployee(employee.employee_id)} >Borrar</button>)}
                                    </p>
                                    <p>
                                        <button
                                            className={styles2.listButton}
                                            onClick={() => router.push(`/crearMonitorInfo?employee_id=${employee_id}&edit=true&edit_employee_id=${employee.employee_id}`)}
                                        >
                                            Editar
                                        </button>
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
                </div>
            );
        } else if (activeTab === 'Clases') {
            return (
                <div className={styles2.userInfoContainer}>
                    <p className={styles2.userInfoPageTitle}>Información de Clases</p>
                    <div className={styles2.dateHeader}>
                        <button onClick={handlePrevDate}>&lt;</button>
                        <p>{selectedDate.toDateString()}</p>
                        <button onClick={handleNextDate}>&gt;</button>
                    </div>

                    <div className={styles2.classesContainer}>
                        {sortedClassesDataForSelectedDate.map((classItem) => (
                            <div key={classItem.class_id} className={styles2.clientInfo}>
                                <p>
                                    <p>
                                        <span> {classItem.class_date}</span>
                                    </p>
                                    <p>
                                        <span> {classItem.class_hour.substring(0,5)}</span>
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
                                    <button className={styles2.listButton} onClick={() => { showAssistanceModal(classItem.class_id, classItem.class_date, classItem.class_hour) }}>Ver Asistencias</button>
                                </p>
                                {userData.user_admin && ( 
                                    <div>
                                        <p>
                                            <button className={styles2.listButton} onClick={() => deleteClass(classItem.class_id)}>Borrar</button>
                                        </p>
                                        <p>
                                            <button
                                                className={styles2.listButton}
                                                onClick={() => router.push(`/crearClase?employee_id=${employee_id}&edit=true&edit_class_id=${classItem.class_id}`)}
                                            >
                                                Editar
                                            </button>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {deleteModalOpen && (
                            <div className={styles2.modal}>
                                <p>Estas seguro que deseas eliminar esta {deleteItemType}?</p>
                                <div>
                                    <button onClick={confirmDeletion}>Confirmar</button>
                                    <button onClick={cancelDeletion}>Cancelar</button>
                                </div>
                            </div>
                        )}
                        {assistanceModalOpen && (
                            <div className={styles2.modal}>
                                <h3>Asistencia para clase de {assistanceClassDate}, {assistanceClassHour.substring(0,5)}:</h3>
                                <br></br>
                                {assistanceData && assistanceData.length > 0 ? (
                                    assistanceData.map((assistanceItem) => {
                                        const client = clientsData.find(client => client.client_id === assistanceItem.client_id);
                                        return (
                                            <div key={assistanceItem.client_id} className={styles2.assistaceList}>
                                                <p><span>{`${client?.name} ${client?.surname}` || 'Cliente Desconocido'}</span></p>
                                                <button onClick={() => deleteAssistance(assistanceItem.client_id)}>Borrar</button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>No hay asistencia reservada para esta clase. </p>
                                )}

                                <div>
                                    <button onClick={closeAssistance}>Cerrar</button>
                                </div>
                            </div>
                        )}
                    </div>
                    {userData.user_admin && (
                        <div>
                            <button
                                className={styles2.redRoundButton}
                                onClick={() => router.push(`/crearClase?employee_id=${employee_id}`)}
                            >
                                Crear Clase
                            </button>
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
                <Image src={Manos} alt="manos" className={styles2.imagenFondo} />
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
                            onClick={() => handleTabClick('Horarios')}
                        >
                            Horarios
                        </p> */}
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
                        {userData.user_admin && (
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
                            <span><Image src={PersonIcon} alt='' /></span>
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

