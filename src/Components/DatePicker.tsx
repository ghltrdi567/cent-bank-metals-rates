import React, { SyntheticEvent } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

type Props = {

dateChanged 

caption: string

}

const DatePicker = (props: Props) => {

 

  return (

    <>


    <InputGroup>
    <InputGroup.Text>{props.caption}</InputGroup.Text>
    <Form.Control className='picker' placeholder='Выберите дату'  type='date' onChange={props.dateChanged}></Form.Control>
    
    
    </InputGroup>

   
    
    
    
    </>


  )
}

export default DatePicker