import React from 'react'
import { Form } from 'react-bootstrap'

type Props = {

values: string[],

placeholder: string,

Changed

}

const Select = (props: Props) => {
  return (
    <Form.Select defaultValue={props.placeholder} onChange={props.Changed}>

   <option disabled >{props.placeholder}</option>

    {Object.entries(props.values ?? {}).map(([key, value])=>{

    return (

      <option key={key}>{value}</option>

    );

    })}



    
  </Form.Select>
  )
}

export default Select