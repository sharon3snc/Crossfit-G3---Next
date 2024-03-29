import Head from 'next/head'
import React, { useState } from 'react'
import Logo from '../images/Logo.png'
import Login from '../images/person-circle-red.svg'
import Image from 'next/image'
import Instalaciones2 from '../images/Instalaciones2.jpg'
import Instalaciones3 from '../images/Instalaciones3.jpg'
import Instalaciones4 from '../images/Instalaciones4.jpg'
import Instalaciones6 from '../images/Instalaciones6.jpg'
import Instalaciones7 from '../images/Instalaciones7.jpg'
import Img1 from '../images/55kg.jpg'
import Icon1 from '../images/atpersonalizadared.png'
import Icon2 from '../images/calendarinred.svg'
import Icon3 from '../images/applered.png'
import Icon4 from '../images/geo-alt-fill-red.svg'
import Icon5 from '../images/telephone-fill-red.svg'
import Icon6 from '../images/envelope-red.svg'
import Icon7 from '../images/instagram-red.svg'
import Icon8 from '../images/facebook-red.svg'
import Icon9 from '../images/twitter-red.svg'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const openContact = () => {
    setModalVisible(true);
  }


  return (
    <>
      <div className={styles.body}>
        <header className={styles.header}>
          <div style={{ backgroundColor: '#FF5656' }}>
            <Image src={Logo} alt="logo" width={80} />
          </div>
          <nav className={styles.nav} >
            <ul>
              <li> <Link href="#inicio" className={styles.a}> Inicio </Link> </li>
              <li> <Link href="#nosotros" className={styles.a}> Nosotros </Link> </li>
              <li> <Link href="#galeria" className={styles.a}> Instalaciones </Link> </li>
              <li> <Link href="/horarioGrid" className={styles.a}> Horarios </Link> </li>
              <li> <Link href="#tarifas" className={styles.a}> Tarifas </Link> </li>
              <li> <Link href="#contacto" className={styles.a}> Contacto </Link> </li>
            </ul>
          </nav>
          <Link href="/login">
            <div className={styles.datos}>
              <Image src={Login} alt="login" width={40} />
              <div style={{ color: '#FF5656' }}>Login</div>
            </div>
          </Link>
          <br />
        </header>

        <main className={styles.main}>
          <div className={styles.part1} id="inicio">
            <div>
              <b>SE TU MEJOR VERSIÓN</b>
            </div>
            <div>
              G3    CROSSFIT
            </div>
            <br />
            <button className={styles.button} onClick={() => openContact()}>
              INICIA HOY
            </button>
            <div>
              {modalVisible && (
                <div className={styles.modal2}>
                  <div className={styles.modalContent2}>
                    <form className={styles.form}>
                      <input className={styles.input} type="text" name="nombre" placeholder="Nombre" />
                      <input className={styles.input} type="email" name="email" placeholder="Correo electrónico" />
                      <input className={styles.input} type="phone" name="phone" placeholder="Teléfono" />
                      <div className={styles.twobuttons}>
                        <button className={styles.modalbutton} type="submit">Enviar</button>
                        <button className={styles.modalbutton2} onClick={() => setModalVisible(false)}>
                          &times;
                          Cancelar </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.part2} id="nosotros">
            <div className={styles.container2}>
              <div className={styles.bienvenido}>
                <b>Bienvenido a G3 Crossfit</b>
              </div>
              <br />
              <div style={{ borderBottom: '2px solid rgba(255, 0, 0, 0.5)', boxShadow: '0px 2px 4px rgba(255, 0, 0, 0.5)' }}></div>
              <br />
              <div>
                En nuestro box, nos enfocamos en un entrenamiento intenso y desafiante,
                pero también en crear una comunidad que apoye y motive a sus miembros a
                alcanzar sus objetivos de fitness. Nuestros entrenadores están altamente
                capacitados para guiarlo y ayudarlo a mejorar su técnica, prevenir lesiones
                y aumentar su fuerza y resistencia. Valoramos la seguridad y el progreso sostenible,
                por lo que nos aseguramos de adaptar los entrenamientos a las necesidades y capacidades individuales de cada miembro.
              </div>
            </div>

            <div className={styles.container3}>
              <Image src={Img1} alt="inst2" style={{ width: '40vw', height: '100vh', objectFit: 'contain', objectPosition: 'center' }} />
            </div>

          </div>

          <div className={styles.part3} id="galeria">
            <div className={styles.containerinst}>
              <div className={styles.icon}>
                <Image src={Icon1} alt="logo" width={70} />
                <Image src={Icon2} alt="logo" width={50} />
                <Image src={Icon3} alt="logo" width={70} />
              </div>
              <div className={styles.rtb}>
                <div className={styles.rtb2}> <div>Atención</div>
                  <div>Personalizada</div>
                </div>
                <div className={styles.rtb2}>
                  <div>Entrenamientos nuevos </div>
                  <div>cada día </div>
                </div>
                <div className={styles.rtb2}>
                  <div>Soporte de </div>
                  <div>nutrición </div>
                </div>
              </div>
            </div>
            <div className={styles.inst2}>
              <div> <b>CONOCE NUESTRAS </b> </div>
              <div> Instalaciones </div>
            </div>

            <div className={styles.carrousel}>
              <div className={styles.inst}>
                <Image src={Instalaciones2} alt="inst2" width={300} />
                <Image src={Instalaciones3} alt="inst3" width={300} />
                <Image src={Instalaciones4} alt="inst4" width={300} />
                <Image src={Instalaciones6} alt="inst6" width={300} />
                <Image src={Instalaciones7} alt="inst7" width={300} />
              </div>
            </div>
          </div>


          <div className={styles.part4} id="tarifas">
            <button className={styles.button2}>
              <Link href="/horarioGrid" >
                Conoce nuestros horarios
              </Link>
            </button>
            <div className={styles.bigfont}>TARIFAS</div>
            <div className={styles.tarifas}>
              <div className={styles.card}>
                <div className={styles.ilimitado}>
                  <div> <b>Crossfit ilimitado</b></div>
                  <div> <b>1 mes</b></div>
                </div>
                <div className={styles.price}>95€</div>
                <div>Paga tu cuota cada mes</div>
              </div>

              <div className={styles.card}>
                <div className={styles.ilimitado}>
                  <div> <b>Crossfit ilimitado</b></div>
                  <div> <b>6 meses</b></div>
                </div>
                <div className={styles.price}>535€</div>
                <div>6% de descuento</div>
              </div>

              <div className={styles.card}>
                <div className={styles.ilimitado}>
                  <div> <b>Crossfit ilimitado</b></div>
                  <div> <b>12 meses</b></div>
                </div>
                <div className={styles.price}>995€</div>
                <div>12% de descuento</div>
              </div>
            </div>
          </div>

          <div className={styles.part5} id="contacto">
            <div className={styles.bienvenido}> <b>MADRID</b></div>
            <div className={styles.info}>
              <div className={styles.datos}>
                <Image src={Icon4} alt="logo" width={20} />
                <p> Calle Dos Amigos 3, 28015 Madrid</p>
              </div>
              <div className={styles.datos}>
                <Image src={Icon5} alt="logo" width={20} />
                <p>644885452</p>
              </div>
              <div className={styles.datos}>
                <Image src={Icon6} alt="logo" width={20} />
                <a href="mailto:crossfitg3@gmail.com">
                  <p>crossfitg3@gmail.com</p>
                </a>
              </div>
            </div>

          </div>

          <div className={styles.footer}>
            <div className={styles.rrss}>
              <Image src={Icon7} alt="instagram" width={30} />
              <Image src={Icon8} alt="twitter" width={30} />
              <Image src={Icon9} alt="facebook" width={30} />
            </div>

            <div>
              CROSSFIT G3 - TODOS LOS DERECHOS RESERVADOS
            </div>

            <nav className={styles.nav2}>
              <ul>
                <li> <a href="#top"> Aviso Legal </a> </li>
                <li> <a href="#top"> Política de Privacidad </a> </li>
                <li> <a href="#top"> Política de Cookies </a> </li>
              </ul>
            </nav>
          </div>
        </main>

      </div>
    </>
  )
}


