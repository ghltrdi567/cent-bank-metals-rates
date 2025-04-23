import React from 'react'
import { DynamicMetalRate } from '../../Models/ApiEntities'

type Props = {

Metals: DynamicMetalRate[]

}

const DynamicMetalsTable = (props: Props) => {
  return (
    <Table striped bordered hover>
   
<thead>
    <tr>
    <th>#</th>
    <th>Дата</th>
    <th>Золото </th>
    <th>Серебро</th>
    <th>Платина</th>
    <th>Палладий</th>
    
    </tr>
</thead>
<tbody>

    {Object.entries(props.Values ?? {}).map(([key, value])=>{

        return (

            <tr key={key}>

                <td>{key}</td>
                <td>{value.NumCode}</td>
                <td>{value.CharCode}</td>
                <td>{value.Nominal}</td>
                <td>{value.Name}</td>
                <td>{value.Value}</td>
                <td>{value.VunitRate}</td>

            </tr>

        );

    })}

</tbody>
</Table>
  )
}

export default DynamicMetalsTable