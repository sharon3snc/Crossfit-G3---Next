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
    const { edit_employee_id } = router.query;
    const [employeesData, setEmployeesData] = useState([]);

    const initialFormData = {
        user_admin: false,
        name: '',
        surname: '',
        birthdate: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
    }
    const [formData, setFormData] = useState({
        user_admin: false,
        name: '',
        surname: '',
        birthdate: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        const fetchEmployeesData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/employees`);
                setEmployeesData(response.data.employees);
            } catch (error) {
            }
        };
        fetchEmployeesData();
        if (edit) {
            console.log(edit_employee_id)
            const fetchEmployeeData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/employees/${edit_employee_id}`);
                    setFormData({
                        user_admin: response.data.employee.user_admin,
                        name: response.data.employee.name,
                        surname: response.data.employee.surname,
                        birthdate: response.data.employee.birthdate,
                        email: response.data.employee.email,
                        phone: response.data.employee.phone,
                        password: response.data.employee.password,
                        password2: response.data.employee.password
                    });
                } catch (error) {
                }
            };
            fetchEmployeeData();
        }

    }, [employee_id, edit, edit_employee_id]);

    const handleEvent = (e) => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            inscription_date: currentDate
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            try {
                const response = await axios.put(`http://localhost:8000/employees/${edit_employee_id}`, formData);
                console.log(response.data);
                setFormData(initialFormData);
                alert('Monitor editado correctamente')
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:8000/employees', formData);
                console.log(response.data);
                setFormData(initialFormData);
                alert('Monitor creado correctamente')
            } catch (error) {
                console.error(error);
            }
        }
        setFormData(initialFormData)
        router.push(`/paginaMonitor?employee_id=${employee_id}`)
    }

    const passwordMatch = formData.password === formData.password2;

    return (
        <>
            <Head>
                <title>Crear Monitor</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles2.backgroundContainer}>
                <Image src={Manos} alt="manos" className={styles2.imagenFondo} />
                <div className={styles2.backgroundCanvas}>
                    <div className={styles2.propContainer}>
                        <h2 className={styles2.formTitle}>Datos de Monitor</h2>
                        <form className={styles2.formContainer} onSubmit={handleSubmit}>

                            <div className={styles2.formContainerInfo}>

                                <input
                                    className={styles2.formInput}
                                    name='name'
                                    type="text"
                                    placeholder='Nombre'
                                    value={formData.name}
                                    onChange={handleEvent}
                                    required
                                />

                                <input
                                    className={styles2.formInput}
                                    name='surname'
                                    type="text"
                                    placeholder='Apellidos'
                                    value={formData.surname}
                                    onChange={handleEvent}
                                    required
                                />

                                <input
                                    className={styles2.formInput}
                                    name='email'
                                    type="text"
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleEvent}
                                    required
                                />

                                <input
                                    className={styles2.formInput}
                                    name='birthdate'
                                    type="text"
                                    placeholder='Fecha de Nacimiento (AAAA-MM-DD)'
                                    value={formData.birthdate}
                                    onChange={handleEvent}
                                    required
                                    pattern='^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[01])$'
                                />

                                <input
                                    className={styles2.formInput}
                                    name='phone'
                                    type="text"
                                    placeholder='Teléfono'
                                    value={formData.phone}
                                    onChange={handleEvent}
                                    required
                                />
                                <div className={styles2.formInput}>
                                    <input
                                        className={styles2.checkboxInput}
                                        name='user_admin'
                                        type='checkbox'
                                        checked={formData.user_admin}
                                        onChange={(e) => setFormData({ ...formData, user_admin: e.target.checked })}
                                    />
                                    <label className={styles2.checkboxLabel}>Administrador</label>
                                </div>
                            </div>
                            <div className={styles2.passwordContainer}>
                                <input
                                    className={styles2.formInput}
                                    name="password"
                                    type="password"
                                    placeholder='Contraseña'
                                    value={formData.password}
                                    onChange={handleEvent}
                                    required
                                />
                                <input
                                    className={styles2.formInput}
                                    name="password2"
                                    type="password"
                                    placeholder='Repetir contraseña'
                                    value={formData.password2}
                                    onChange={handleEvent}
                                    required
                                />
                            </div>
                            <button
                                className={styles2.redRoundButton}
                                type="submit"
                                disabled={!passwordMatch}
                            >{edit ? 'Editar Monitor' : 'Crear Monitor'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

