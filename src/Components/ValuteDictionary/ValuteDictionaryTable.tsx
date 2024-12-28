import React from 'react'
import Table from 'react-bootstrap/esm/Table'
import { ValuteDictionaryEntity } from '../../Models/ApiEntities';

export interface ValuteDictionaryTableProps{

    Values: ValuteDictionaryEntity[];


}

const ValuteDictionaryTable = (props: ValuteDictionaryTableProps) => {
  return (
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Название</th>
            <th>Английское название </th>
            <th>Номинал</th>
            <th>Цифровой код ISO</th>
            <th>Буквенный код ISO</th>
            </tr>
        </thead>
        <tbody>

            {Object.entries(props.Values ?? {}).map(([key, value])=>{

                return (

                    <tr key={key}>

                        <td>{key}</td>
                        <td>{value.Name}</td>
                        <td>{value.EngName}</td>
                        <td>{value.Nominal}</td>
                        <td>{value.ISO_Num_Code}</td>
                        <td>{value.ISO_Char_Code}</td>

                    </tr>

                );

            })}

        </tbody>
        </Table>
  )
}

export default ValuteDictionaryTable