import Head from 'next/head'
import Logo from '../images/Logo.png'
import Image from 'next/image'
import Manos from '../images/manos.jpg'
import styles2 from '@/styles/CrearUsuario.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';


export default function CrearMonitorInfo() {
    const router = useRouter();
    const { employee_id } = router.query;
    const { edit } = router.query;
    const { edit_class_id } = router.query;
    const [employeesData, setEmployeesData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [repeat, setRepeat] = useState('');

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
        console.log(`edit = ${edit}`)
        const fetchEmployeesData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/employees`);
                setEmployeesData(response.data.employees);
            } catch (error) {
            }
        };
        const fetchClassesData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/all_classes`);
                setClassesData(response.data.employees);
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
                    setClassData(response.data);
                    setFormData({
                        class_date: response.data.class.class_date,
                        class_hour: response.data.class.class_hour,
                        duration: response.data.class.duration,
                        employee_id: response.data.class.employee_id,
                        class_name: response.data.class.class_name,
                        number_spaces: response.data.class.number_spaces
                    });
                } catch (error) {
                }
            };
            fetchClassData();
            console.log(classData)
            setFormData({
                class_date: classData.class_date,
                class_hour: classData.class_hour,
                duration: classData.duration,
                employee_id: classData.employee_id,
                class_name: classData.class_name,
                number_spaces: classData.number_spaces
            });
        } else {
            console.log('no edit')
        }

    }, [employee_id, edit, edit_class_id, classData]);



    const handleEvent = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const generateDates = (startDateStr, repeatType) => {
        const dates = [];
        const [year, month, day] = startDateStr.split("-").map(str => parseInt(str, 10));
        const currentDate = new Date(year, month - 1, day);
    
        switch (repeatType) {
            case "never":
                dates.push(new Date(currentDate));
                break;
            case "everyday":
                for (let i = 0; i < 30; i++) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                break;
            case "weekdays":
                for (let i = 0; i < 30; i++) {
                    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                        dates.push(new Date(currentDate));
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                break;
            case "weekly":
                for (let i = 0; i < 4; i++) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 7);
                }
                break;
            case "monthly":
                for (let i = 0; i < 12; i++) {
                    dates.push(new Date(currentDate));
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
                break;
        }
    
        return dates;
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const repeatType = repeat;

        const dates = generateDates(formData.class_date, repeatType);

        if (edit) {
            try {
                const response = await axios.put(`http://localhost:8000/classes/${edit_class_id}`, formData);
                console.log(response.data);
                setFormData(initialFormData);
            } catch (error) {
                console.error(error);
            }
            alert('Clase editada con éxito')
        } else{

            for (const date of dates) {
                const adjustedFormData = {
                    ...formData,
                    class_date: date.toISOString().split("T")[0]
                };
    
                try {
                    const response = !edit
                        ? await axios.post('http://localhost:8000/classes', adjustedFormData)
                        : await axios.put(`http://localhost:8000/classes/${edit_class_id}`, formData);
    
                    console.log(response.data);
    
                } catch (error) {
                    console.error(error);
                }
            }
            alert('Clase creada con éxito')
        }
        

        setFormData(initialFormData);
        router.push(`/paginaMonitor?employee_id=${employee_id}`)
    }

    const handleSubmit3 = async (e) => {
        e.preventDefault();
        if (!edit) {
            try {
                const response = await axios.post('http://localhost:8000/classes', formData);
                console.log(response.data);
                setFormData(initialFormData);
            } catch (error) {
                console.error(error);
            }
            alert('Clase creada con éxito')
        } else {
            try {
                const response = await axios.put(`http://localhost:8000/classes/${edit_class_id}`, formData);
                console.log(response.data);
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
                                        console.log(formData)
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
                                {edit ? '' : (
                                    <select
                                        className={styles2.formInput}
                                        name="repeat"
                                        value={repeat}
                                        onChange={(e) => setRepeat(e.target.value)}
                                        required
                                    >
                                        <option value="">Repetir clase</option>
                                        <option value="never">Nunca</option>
                                        <option value="everyday">Todos los días</option>
                                        <option value="weekdays">Todos los días de semana</option>
                                        <option value="weekly">Todas las semanas</option>
                                        <option value="monthly">Todos los meses</option>
                                    </select>
                                )}
                                {repeat === 'everyday' && (
                                    <>
                                        <p></p>
                                        <p className={styles2.messageText}>* Se crearán clases todos los días de la semana por 30 días</p>
                                    </>
                                )}
                                {repeat === 'weekdays' && (
                                    <>
                                        <p></p>
                                        <p className={styles2.messageText}>* Se crearán clases todos los días de lunes a viernes, por 30 días</p>
                                    </>
                                )}
                                {repeat === 'weekly' && (
                                    <>
                                        <p></p>
                                        <p className={styles2.messageText}>* Se crearán clases el día de la semana seleccionado, por 4 semanas</p>
                                    </>
                                )}
                                {repeat === 'monthly' && (
                                    <>
                                        <p></p>
                                        <p className={styles2.messageText}>* Se crearán clases el día del mes elegido, por los proximos 12 meses</p>
                                    </>
                                )}

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

