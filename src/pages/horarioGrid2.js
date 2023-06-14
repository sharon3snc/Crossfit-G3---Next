import React, {useState, useEffect} from 'react';
import styles from "../styles/HorarioGrid2.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../images/Logo.png'
import Login from '../images/person-circle-red.svg'

const HorarioGrid = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [claseConfirmada, setClaseConfirmada] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [celdaConfirmada, setCeldaConfirmada] = useState({ dia: '', hora: '' });

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const horas = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    const clasesCrossfit = {
        Lunes: {
            '7:00': 'Crossfit',
            '12:00': 'Strenght',
            '19:00': 'Crossfit',
          },
          Martes: {
            '8:00': 'Strenght',
            '10:00': 'Crossfit',
            '18:00': 'Crossfit',
            '20:00': 'Crossfit',
          },
          Miércoles: {
            '7:00': 'Strenght',
            '12:00': 'Crossfit',
            '19:00': 'Strenght',
          },
          Jueves: {
            '8:00': 'Crossfit',
            '10:00': 'Strenght',
            '18:00': 'Crossfit',
            '20:00': 'Strenght',
          },
          Viernes: {
            '7:00': 'Crossfit',
            '12:00': 'Strenght',
            '19:00': 'Crossfit',
          },
          Sábado: {
            '10:00': 'Crossfit',
            '11:00': 'Strenght',
          },
        };
    
    const handleCellClick = (dia, hora, clase) => {
        setSelectedClass(clase);
        setSelectedDay(dia);
        setSelectedHour(hora);
        setModalVisible(true);
    };

    const handleConfirmar= () => {
        setClaseConfirmada(true);
        setCeldaConfirmada({ dia: selectedDay, hora: selectedHour });
    };


    return (
        <div className= {styles.horario}>
            <div className={styles.grid}>
                <div className={styles.empty}></div>
                {dias.map((dia) => (
                    <div key={dia} className={styles.dia}>
                        {dia}
                    </div>
                    ))}
                    {horas.map((hora) => (
                    <>
                        <div key={hora} className={styles.hora}>
                        {hora}
                        </div>
                        {dias.map((dia) => {
                        const isCeldaConfirmada = celdaConfirmada.dia === dia && celdaConfirmada.hora === hora;
                        const celdaId = `${hora}-${dia}`;
                        return (
                            <div
                            key={celdaId}
                            className={`${styles.celda} ${clasesCrossfit[dia] && clasesCrossfit[dia][hora] ? styles[clasesCrossfit[dia][hora]] : ''} ${isCeldaConfirmada ? styles.celdaConfirmada : ''}`}
                            onClick={() => handleCellClick(dia, hora, clasesCrossfit[dia][hora])}
                            >
                            {clasesCrossfit[dia] && clasesCrossfit[dia][hora] ? clasesCrossfit[dia][hora] : ''}
                            </div>
                        );
                        })}

                </>
                ))}

                {modalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div>
                            <p>Has seleccionado la clase:</p>
                            <p className={styles.modalclase}>{selectedClass}</p>
                            <span>{selectedDay}</span>
                            <span> a las {selectedHour}</span>
                        </div>
                        <div className= {styles.botonesmodal}>
                            {claseConfirmada ? (
                                <>
                                <p>Clase confirmada</p>
                                <span className={styles.close} onClick={() => setModalVisible(false)}>
                                &times; </span> 
                                </>
                                ) : (
                                <>
                                <button className={styles.confirmar} onClick={handleConfirmar}>Confirmar</button>
                                <button className={styles.cancelar} onClick={() => setModalVisible(false)}>Cancelar</button>
                                
                                </>
                            )}
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default HorarioGrid;
