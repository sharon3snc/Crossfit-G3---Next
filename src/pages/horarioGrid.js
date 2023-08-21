import React, {useState} from 'react';
import styles from "../styles/HorarioGrid.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../images/Logo.png'
import Login from '../images/person-circle-red.svg'

const HorarioGrid = () => {

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
    

    return (
        <div className= {styles.horario}>

        <header className={styles.header}>
          <div style={{ backgroundColor: '#FF5656' }}>
            <Image src={Logo} alt="logo" width={80}/>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li> <Link href="/" className={styles.a}> Inicio </Link> </li>
              <li> <Link href="/#nosotros" className={styles.a}> Nosotros </Link> </li>
              <li> <Link href="/#galeria" className={styles.a}> Instalaciones </Link> </li>
              <li> <Link href="/horarioGrid" className={styles.a}> Horarios </Link> </li>
              <li> <Link href="/#tarifas" className={styles.a}> Tarifas </Link> </li>
              <li> <Link href="/#contacto" className={styles.a}> Contacto </Link> </li>
            </ul>
          </nav>
          <Link href="/login">
          <div className={styles.datos}>
            <Image src={Login} alt="login" width={40}/>
            <div style= {{color: '#FF5656'}}>Login</div>
          </div>
          </Link>
          <br/>
        </header>

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
                    > {clasesCrossfit[dia] && clasesCrossfit[dia][hora] ? clasesCrossfit[dia][hora] : ''} </div>
                ))}
            </>
            ))}

        </div>
        </div>
    );
};

export default HorarioGrid;
