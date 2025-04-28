import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

type Props = {

    UnCheckedCaption: string;

    CheckedCaption: string;

    CheckChanged: any;

    CheckedDefault?: boolean


}

const CheckBoxDynamicCaption = (props: Props) => {

    const [checked, setchecked] = useState<boolean>(props.CheckedDefault ?? false);

    const OnChangedHandler = (source)=>{

        setchecked(source.target.checked);

        props.CheckChanged(source);
    }
  return (
    <Form.Check
    
     checked={checked}

     onChange={OnChangedHandler}

     label={checked?props.CheckedCaption:props.UnCheckedCaption}
    
    />
  )
}

export default CheckBoxDynamicCaption