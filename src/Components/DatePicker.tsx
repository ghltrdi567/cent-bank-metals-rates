import React, { SyntheticEvent } from 'react'
import { Form } from 'react-bootstrap'

type Props = {

dateChanged 

}

const DatePicker = (props: Props) => {
  return (
    <Form>
     <Form.Label>Дата:</Form.Label>
    <Form.Control type='date' onChange={props.dateChanged}></Form.Control>

    </Form>
  )
}

export default DatePicker