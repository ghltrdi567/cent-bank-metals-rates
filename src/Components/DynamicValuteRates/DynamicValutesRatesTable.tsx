import React from 'react'
import { DynamicValuteRate } from '../../Models/ApiEntities'
import { Table } from 'react-bootstrap'

type Props = {

   Rates: DynamicValuteRate[]

}

const DynamicValutesRatesTable = (props: Props) => {
  return (
<Table striped bordered hover>
        {/*  {tyu()} */}
        <thead>
            <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Номинал</th>
            <th>Значение, руб</th>
            </tr>
        </thead>
        <tbody>

            {Object.entries(props.Rates ?? {}).map(([key, value])=>{

                return (

                    <tr key={key}>

                        <td>{key}</td>
                        <td>{value.Date}</td>
                        <td>{value.Nominal}</td>
                        <td>{value.Value}</td>

                    </tr>

                );

            })}

        </tbody>
        </Table>
  )
}

export default DynamicValutesRatesTable