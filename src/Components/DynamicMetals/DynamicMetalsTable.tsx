import React, { useState } from 'react'
import { DynamicMetalRate, DynamicMetalsratesToDate } from '../../Models/ApiEntities'
import { Table } from 'react-bootstrap'
import CheckBoxDynamicCaption from '../CheckBoxDynamicCaption'


type Props = {

Metals: DynamicMetalsratesToDate[];

}

interface MetalsCheck{

  GoldChecked: boolean;
  SilverChecked: boolean;
  PlatinumChecked: boolean;
  PalladiumChecked: boolean;

}


const DynamicMetalsTable = (props: Props) => {



const [checked, setchecked] = useState<MetalsCheck>({GoldChecked: false, SilverChecked: false, PlatinumChecked: false, PalladiumChecked: false});

const GoldChecked = (source)=>{

  //console.log(source.target.checked);

  UpdateMetalsCheck(source.target.checked, checked.SilverChecked, checked.PlatinumChecked, checked.PalladiumChecked);

}

const SilverChecked = (source)=>{

  //console.log(source.target.checked);
  UpdateMetalsCheck(checked.GoldChecked, source.target.checked, checked.PlatinumChecked, checked.PalladiumChecked);

}

const PlatinumChecked = (source)=>{

  UpdateMetalsCheck(checked.GoldChecked, checked.SilverChecked, source.target.checked, checked.PalladiumChecked);

}

const PalladiumChecked = (source)=>{

  UpdateMetalsCheck(checked.GoldChecked, checked.SilverChecked, checked.PlatinumChecked, source.target.checked);

}

const UpdateMetalsCheck = (goldChecked, silverChecked, platinumChecked, palladiumChecked)=>{

const newChecks: MetalsCheck = {GoldChecked: goldChecked, SilverChecked: silverChecked, PlatinumChecked: platinumChecked, PalladiumChecked:palladiumChecked};

setchecked(newChecks);

}

  return (
<Table striped bordered hover>
        {/*  {tyu()} */}
        <thead>
            <tr>
            <th>#</th>
            <th colSpan={2}><CheckBoxDynamicCaption UnCheckedCaption='Au' CheckedCaption='Золото' CheckChanged={GoldChecked} /></th>
            <th colSpan={2}><CheckBoxDynamicCaption UnCheckedCaption='Ag' CheckedCaption='Серебро' CheckChanged={SilverChecked} /></th>
            <th colSpan={2}><CheckBoxDynamicCaption UnCheckedCaption='Pt' CheckedCaption='Платина' CheckChanged={PlatinumChecked} /></th>
            <th colSpan={2}><CheckBoxDynamicCaption UnCheckedCaption='Pd' CheckedCaption='Палладий' CheckChanged={PalladiumChecked} /></th>
            </tr>
            <tr>
            <th>Дата</th>
            <th>{checked.GoldChecked?"Продажа":""}</th>
            <th>{checked.GoldChecked?"Покупка":""}</th>
            <th>{checked.SilverChecked?"Продажа":""}</th>
            <th>{checked.SilverChecked?"Покупка":""}</th>
            <th>{checked.PlatinumChecked?"Продажа":""}</th>
            <th>{checked.PlatinumChecked?"Покупка":""}</th>
            <th>{checked.PalladiumChecked?"Продажа":""}</th>
            <th>{checked.PalladiumChecked?"Покупка":""}</th>
            </tr>
        </thead>
        <tbody>

             {Object.entries(props.Metals ?? {}).map(([key, value])=>{

                return (

                    <tr key={key}>

                        <td>{value.Date}</td>
                        <td>{checked.GoldChecked?(value.Gold?.Sell ?? ""):""}</td>
                        <td>{checked.GoldChecked?(value.Gold?.Buy ?? ""):""}</td>
                        <td>{checked.SilverChecked?(value.Silver?.Sell ?? ""):""}</td>
                        <td>{checked.SilverChecked?(value.Silver?.Buy ?? ""):""}</td>
                        <td>{checked.PlatinumChecked?(value.Platinum?.Sell ?? ""):""}</td>
                        <td>{checked.PlatinumChecked?(value.Platinum?.Buy ?? ""):""}</td>
                        <td>{checked.PalladiumChecked?(value.Palladium?.Sell ?? ""):""}</td>
                        <td>{checked.PalladiumChecked?(value.Palladium?.Buy ?? ""):""}</td>



                    </tr>

                );

            })} 

        </tbody>
        </Table>
  )
}

export default DynamicMetalsTable