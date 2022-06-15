import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import useSelectMonedas from "../hooks/useSelectMonedas"

import Error from "./Error"

import { monedas } from "../data/monedas"

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    border-radius: 0.5rem;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease-out;
    margin-top: 20px;
    &:hover{
        background-color: #6d71f9;
        transform: translateX(0.2rem);
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [cripto, SelectCriptos] = useSelectMonedas('Elige tu cripto', criptos);

    useEffect(() =>{
        async function consultarAPI(){
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            console.log(resultado.Data);

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                console.log(objeto)
                return objeto;
            })

            setCriptos(arrayCriptos);
        }
        consultarAPI()
    }, [])

    function handleSubmit(e){
        e.preventDefault();

        if([moneda, cripto].includes('')){
            setError(true)
            return;
        }
        setError(false)
        setMonedas({
            moneda,
            cripto
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas/>

                <SelectCriptos/>

                <InputSubmit type="submit" value="Cotizar"/>
            </form>
        </>
    )
}

export default Formulario