import React from 'react'
import DailyValitesTabs, { ValuteRatesToDateData } from './DailyValitesTabs'
import { Col, Container, Row } from 'react-bootstrap'
import DatePicker from '../DatePicker'

type Props = {

    dateChanged ,

    valutes: ValuteRatesToDateData



}

const DailyvalutesBar = (props: Props) => {
  return (
    <Container fluid>
    <Row >
      <Col className='mb-4'>
      
      <DatePicker dateChanged={props.dateChanged}></DatePicker>
      
      
      </Col>
    </Row>

    <Row>
      <Col>
      
      <DailyValitesTabs data={props.valutes}/>
      
      
      </Col>
    </Row>
  </Container>
  )
}

export default DailyvalutesBar