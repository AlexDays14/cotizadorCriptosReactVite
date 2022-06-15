import styled from "@emotion/styled";

const Contenedor = styled.div`
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1rem;
    margin-top: 30px;
`
const Imagen = styled.img`
    display: block;
    width: 140px;
    margin-top: 20px;
`
const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 900;
    }
`
const Precio = styled.p`
    font-size: 30px;
    span{
        font-weight: 900;
    }
`

const Cotizacion = ({cotizacion}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE, FROMSYMBOL} = cotizacion
    return (
        <Contenedor>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt={`Imagen ${FROMSYMBOL}`} />
            <div>
                <Precio>El Precio es de: <span>{PRICE}</span></Precio>
                <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Ultima actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Contenedor>
    )
}

export default Cotizacion