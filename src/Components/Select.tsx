import React from 'react'
import { Form } from 'react-bootstrap'

type Props = {

values: string[],

Changed

}

const Select = (props: Props) => {
  return (
    <Form.Select onChange={props.Changed}>

    {Object.entries(props.values ?? {}).map(([key, value])=>{

    return (

        <option key={key}>{value}</option>

    );

    })}



    
  </Form.Select>
  )
}

export default Select