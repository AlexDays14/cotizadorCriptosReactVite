import styled from '@emotion/styled'

const Mensaje = styled.div`
    background-color: #B7322C;
    color: #FFF;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    border-radius: 5px;
`

const Error = ({children}) => {
    return (
        <Mensaje>
            {children}
        </Mensaje>
    )
}

export default Error