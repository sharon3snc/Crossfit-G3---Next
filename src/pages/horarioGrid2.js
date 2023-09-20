import React, { useState, useEffect } from 'react';
import styles from "../styles/HorarioGrid2.module.css"

const HorarioGrid = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [claseConfirmada, setClaseConfirmada] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedHour, setSelectedHour] = useState('');

    function formatDateToDayAndMonth(date) {
        const dayOptions = { weekday: 'short' };
        const dayName = new Intl.DateTimeFormat('es-ES', dayOptions).format(date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${dayName} ${day}/${month}`;
    }

    function getNextSevenDays() {
        const dates = [];
        const currentDate = new Date();

        for (let i = 0; i < 7; i++) {
            dates.push(formatDateToDayAndMonth(new Date(currentDate)));

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    const sevenDays = getNextSevenDays();
    console.log(sevenDays);

    const dias = getNextSevenDays();
    const horas = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    const clasesCrossfit = {
        [dias[0]]: {
            '7:00': 'Crossfit',
            '12:00': 'Strenght',
            '19:00': 'Crossfit',
        },
        [dias[1]]: {
            '8:00': 'Strenght',
            '10:00': 'Crossfit',
            '18:00': 'Crossfit',
            '20:00': 'Crossfit',
        },
        [dias[2]]: {
            '7:00': 'Strenght',
            '12:00': 'Crossfit',
            '19:00': 'Strenght',
        },
        [dias[3]]: {
            '8:00': 'Crossfit',
            '10:00': 'Strenght',
            '18:00': 'Crossfit',
            '20:00': 'Strenght',
        },
        [dias[4]]: {
            '7:00': 'Crossfit',
            '12:00': 'Strenght',
            '19:00': 'Crossfit',
        },
        [dias[5]]: {
            '10:00': 'Crossfit',
            '11:00': 'Strenght',
        },
    };

    const handleCellClick = (dia, hora, clase) => {
        setSelectedClass(clase);
        setSelectedDay(dia);
        setSelectedHour(hora);
        setModalVisible(true);
        setClaseConfirmada(false);
    };

    const handleConfirmar = () => {
        setClaseConfirmada(true);
        setModalVisible(false);
    };

    const handleCancelar = () => {
        setModalVisible(false);
        setClaseConfirmada(false);
    };

    return (
        <div className={styles.horario}>
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
                            const celdaId = `${hora}-${dia}`;
                            const isCeldaConfirmada = claseConfirmada && dia === selectedDay && hora === selectedHour;
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


            </div>
        </div>
    );
};

{/* {modalVisible && (
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
                <button className={styles.cancelar} onClick={handleCancelar}>Cancelar</button>
                </>
            )}
        </div>
    </div>
</div>
)} */}
export default HorarioGrid;
