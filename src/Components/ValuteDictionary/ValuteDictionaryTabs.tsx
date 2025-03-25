import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ValuteDictionaryEntity } from '../../Models/ApiEntities';
import ValuteDictionaryTable from './ValuteDictionaryTable';

export interface ValuteDictionaryData{

    DailyUpdate: ValuteDictionaryEntity[];

    MountlyUpdate: ValuteDictionaryEntity[];


}

export const DefaultValuteDictionaryData: ValuteDictionaryData = {DailyUpdate: [], MountlyUpdate: []}

const ValuteDictionaryTabs = (props: {data: ValuteDictionaryData}) => {

    

  return (
    <Tabs 
    defaultActiveKey="profile"
    id="ValuteDictionaryTabs"
    className="mb-3"
  > 
    <Tab eventKey="home" title="Устанавливается ежедневно">
      <ValuteDictionaryTable Values={props.data.DailyUpdate}/>
    </Tab>
    
    <Tab eventKey="profile" title="Устанавливается ежемесячно">
    <ValuteDictionaryTable Values={props.data.MountlyUpdate}/>
    </Tab>
  </Tabs>
  )





}

export default ValuteDictionaryTabs