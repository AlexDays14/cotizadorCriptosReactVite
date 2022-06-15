import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Cotizacion from './components/Cotizacion'
import ImagenCripto from './img/imagen-criptos.png'

const Contenedor = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    width: 90%;
    @media(min-width: 992px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1.5rem;
    }
`

const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
`

const Heading = styled.h1`
    font-family: 'Lato', sans-serif;
    color: #FFF;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    &::after{
        content: '';
        width: 100px;
        height: 6px;
        background-color: #66A2FE;
        display: block;
        margin: 10px auto 0 auto;
    }
`

function App() {

    const [monedas, setMonedas] = useState({})
    const [cotizacion, setCotizacion] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect(() =>{
        if(Object.keys(monedas).length > 0){
            async function cotizarCripto(){
                setCargando(true)
                const { moneda, cripto} = monedas
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCotizacion(resultado.DISPLAY[cripto][moneda])
                setCargando(false);
            }
            cotizarCripto()
        }
    }, [monedas])

    return (
        <Contenedor>
            <Imagen src={ImagenCripto} alt="Imagen Criptomonedas"/>

            <div>
                <Heading>Cotiza Criptomonedas al Momento</Heading>

                <Formulario
                    setMonedas = {setMonedas}
                /> 

                {cargando && <Spinner/>}
                {
                !cargando && cotizacion.PRICE && 
                <Cotizacion 
                    cotizacion = {cotizacion}
                />
                }
            </div>
        </Contenedor>
    ) 
}

export default App
