import React from 'react'
import { ValuteRateEntity } from '../../Models/ApiEntities';
import Table from 'react-bootstrap/esm/Table'

export interface DailyValuteTableProps{

    Values: ValuteRateEntity[];


}

const DailyValuteTable = (props: DailyValuteTableProps) => {

const tyu = function(){

console.log(props);
 return <></>
}


  return (
    
    <Table striped bordered hover>
        {tyu()}
    <thead>
        <tr>
        <th>#</th>
        <th>Цифровой код</th>
        <th>Буквенный код </th>
        <th>Номинал</th>
        <th>Название</th>
        <th>Курс, руб</th>
        <th>Курс на единицу валюты, руб</th>
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

export default DailyValuteTable