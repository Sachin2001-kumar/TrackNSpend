import React from 'react'
import styled from 'styled-components'

const Button = ({title,onclick,icon,bg, bPad, color, bRad}) => {
  return (
    <ButtonStyled  style= {{
        background:bg,
        color:color,
        padding:bPad,
        borderRadius:bRad
    }}onclick={onclick}>
      {title}
      {icon}
    </ButtonStyled>
  )
}
 
const ButtonStyled=styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;

export default Button