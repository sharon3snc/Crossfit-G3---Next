import React, {useState} from 'react';
import styles from "../styles/HorarioGrid.module.css"

const HorarioGrid = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');

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
        setModalVisible(true);
    };

    return (
        <div className={styles.grid}>
            <div className={styles.empty}></div>
            {dias.map((dia) => (
                <div key={dia} className={styles.dia}>{dia}</div>
            ))}
            {horas.map((hora) => (
            <>
                <div key={hora} className={styles.hora}>{hora}</div>
                {dias.map((dia) => (
                    <div
                        key={`${hora}-${dia}`}
                        className={`${styles.celda} ${clasesCrossfit[dia] && clasesCrossfit[dia][hora] ? styles[clasesCrossfit[dia][hora]] : ''}`}
                        onClick={() => handleCellClick (dia, hora, clasesCrossfit[dia][hora])}
                    > {clasesCrossfit[dia] && clasesCrossfit[dia][hora] ? clasesCrossfit[dia][hora] : ''} </div>
                ))}
            </>
            ))}

            {modalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={() => setModalVisible(false)}>&times;
                        </span>
                        <p >Has seleccionado la clase: {selectedClass}</p>
                    </div>
                </div> 
            )}
        </div>
    );
};

export default HorarioGrid;
