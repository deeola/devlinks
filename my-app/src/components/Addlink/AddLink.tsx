import React from "react";
import "./AddLink.css"
import { MBody} from "../Text/Text";
import Dropdown from "../Dropdown/Dropdown";
import InputField from "../Input/InputField";
import iconLink from "../../assets/images/icon-link.svg";

type AddLinks = {
    number: number,
dropArray?: {
        image: string;
        label: string;
        selected?: boolean;
      }[],
      errorMessage?: string,
      placeholder: string
}

export default function AddLink(Props: AddLinks){

const {number, dropArray, errorMessage, placeholder} = Props
return (
    <div>
        <div>
            <MBody text={`= Link #${number}`}/>
            <MBody text="Remove"/>
        </div>
        <div>
            <div>
                <label>Platform</label>
                <Dropdown dropArray={dropArray} />
            </div>
            <div>
            <label>Link</label>
            <InputField type='text' name='link' id='link' errorMessage={errorMessage} img={iconLink} placeholder={placeholder}  />
            </div>
        </div>
    </div>
)
}

