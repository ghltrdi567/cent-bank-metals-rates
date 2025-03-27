import React from 'react'
import { ValuteRateEntity, ValuteRatesToDateEntity } from '../../Models/ApiEntities';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DailyValuteTable from './DailyValuteTable';

export interface ValuteRatesToDateData{

    DailyUpdate: ValuteRateEntity[];

    MountlyUpdate: ValuteRateEntity[];


}

export const defautValuteRatesToDateData : ValuteRatesToDateData = {DailyUpdate:[], MountlyUpdate: []}

const DailyValitesTabs = (props: {data: ValuteRatesToDateData}) => {
  return (
    <Tabs 
    defaultActiveKey="daily"
    id="DailyValitesTabs"
    className="mb-3"
  > 
    <Tab  eventKey="daily" title="Устанавливается ежедневно">
      <DailyValuteTable Values={ props.data.DailyUpdate}/>
    </Tab>
    
    <Tab eventKey="monthly" title="Устанавливается ежемесячно (до 31.01.2010)">
    <DailyValuteTable Values={ props.data.MountlyUpdate}/>
    </Tab>
  </Tabs>
  )
}

export default DailyValitesTabs


