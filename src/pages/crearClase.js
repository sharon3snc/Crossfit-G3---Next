import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Manos from '../images/manos.jpg'
import styles2 from '@/styles/CrearUsuario.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';

// class_date = class_data.class_date
//         class_hour = class_data.class_hour
//         duration = class_data.duration
//         employee_id = class_data.employee_id
//         class_name = class_data.class_name
//         number_spaces = class_data.number_spaces


export default function CrearMonitorInfo() {
    const router = useRouter();
    const { employee_id } = router.query;
    const { edit } = router.query;
    const { edit_class_id } = router.query;
    const [employeesData, setEmployeesData] = useState([]);
    const [classData, setClassData] = useState([]);

    const initialFormData = {
        class_date: '',
        class_hour: '',
        duration: '',
        employee_id: '',
        class_name: '',
        number_spaces: ''
    }
    const [formData, setFormData] = useState({
        class_date: '',
        class_hour: '',
        duration: '',
        employee_id: '',
        class_name: '',
        number_spaces: ''
    });

    useEffect(() => {
        const fetchEmployeesData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/employees`);
                setEmployeesData(response.data.employees); // Assign the 'clients' array to usersData
            } catch (error) {
            }
        };
        const fetchClassesData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/all_classes`);
                setClassesData(response.data.employees); // Assign the 'clients' array to usersData
            } catch (error) {
            }
        };

        fetchEmployeesData();
        fetchClassesData();

        if (edit) {
            console.log(edit_class_id)
            const fetchClassData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/classes/${edit_class_id}`);
                    setClassData(response.data); // Assign the 'clients' array to usersData
                    setFormData({
                        class_date: response.data.class.class_date,
                        class_hour: response.data.class.class_hour,
                        duration: response.data.class.duration, // converting number to string, if you need it as a string
                        employee_id: response.data.class.employee_id, // converting number to string, if you need it as a string
                        class_name: response.data.class.class_name,
                        number_spaces: response.data.class.number_spaces // converting number to string, if you need it as a string
                    });
                } catch (error) {
                }
            };
            fetchClassData();
            console.log(classData)
            setFormData({
                class_date: classData.class_date,
                class_hour: classData.class_hour,
                duration: classData.duration, // converting number to string, if you need it as a string
                employee_id: classData.employee_id, // converting number to string, if you need it as a string
                class_name: classData.class_name,
                number_spaces: classData.number_spaces // converting number to string, if you need it as a string
            });
        } else {
            console.log('no edit')
        }

    }, [employee_id]);



    const handleEvent = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!edit) {
            try {
                const response = await axios.post('http://localhost:8000/classes', formData);
                console.log(response.data); // Assuming the API returns the created client data
                setFormData(initialFormData);
            } catch (error) {
                console.error(error);
            }
            alert('Clase creada con éxito')
        } else {
            try {
                const response = await axios.put(`http://localhost:8000/classes/${edit_class_id}`, formData);
                console.log(response.data); // Assuming the API returns the created client data
                setFormData(initialFormData);
            } catch (error) {
                console.error(error);
            }
            alert('Clase editada con éxito')
        }
        setFormData(initialFormData)
        router.push(`/paginaMonitor?employee_id=${employee_id}`)
    }

    const handleSubmit2 = async (e) => {
        console.log(formData)
        e.preventDefault();
    }

    return (
        <>
            <Head>
                <title>Crear Clase</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles2.backgroundContainer}>
                <Image src={Manos} alt="manos" className={styles2.imagenFondo} />
                <div className={styles2.backgroundCanvas}>
                    <div className={styles2.propContainer}>
                        <h2 className={styles2.formTitle}>Datos de la clase</h2>
                        <form className={styles2.formContainer} onSubmit={handleSubmit}>

                            <div className={styles2.formContainerInfo}>

                                <input
                                    className={styles2.formInput}
                                    name='class_date'
                                    type="date"
                                    placeholder='YYYY-MM-DD'
                                    value={formData.class_date}
                                    onChange={handleEvent}
                                    required
                                />
                                <input
                                    className={styles2.formInput}
                                    name="class_hour"
                                    type="time"
                                    pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"
                                    placeholder="HH:mm:ss"
                                    value={formData.class_hour}
                                    onChange={handleEvent}
                                    required
                                />
                                <select
                                    className={styles2.formInput}
                                    name="duration"
                                    value={formData.duration}
                                    onChange={(e) => {
                                        const valueAsInt = parseInt(e.target.value, 10);
                                        handleEvent({ ...e, target: { ...e.target, name: 'duration', value: valueAsInt } });
                                    }}
                                    required
                                >
                                    <option value="15">15 minutos</option>
                                    <option value="30">30 minutos</option>
                                    <option value="45">45 minutos</option>
                                    <option value="60">60 minutos</option>
                                    <option value="90">90 minutos</option>
                                </select>
                                <select
                                    className={styles2.formInput}
                                    name="employee_id"
                                    value={formData.employee_id}
                                    onChange={(e) => {
                                        const valueAsInt = parseInt(e.target.value, 10);
                                        handleEvent({ ...e, target: { ...e.target, name: 'employee_id', value: valueAsInt } });
                                    }}
                                    required
                                >
                                    {employeesData.map(employee => (
                                        <option key={employee.employee_id} value={employee.employee_id}>
                                            {employee.name} {employee.surname}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    className={styles2.formInput}
                                    name='class_name'
                                    type="text"
                                    placeholder='Nombre'
                                    value={formData.class_name}
                                    onChange={handleEvent}
                                    required
                                />
                                <input
                                    className={styles2.formInput}
                                    name='number_spaces'
                                    type="number"
                                    min="0"
                                    max="25"
                                    step="1"
                                    placeholder='Enter a number'
                                    value={formData.number_spaces}
                                    onChange={(e) => {
                                        const valueAsInt = parseInt(e.target.value, 10);
                                        handleEvent({ ...e, target: { ...e.target, name: 'number_spaces', value: valueAsInt } });
                                    }}
                                    required
                                />

                            </div>
                            <button
                                className={styles2.redRoundButton}
                                type="submit"
                            >{edit ? 'Editar Clase' : 'Crear Clase'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

