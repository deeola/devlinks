import { useState, useEffect } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg";
import linkImg from "../../assets/images/icon-link.svg";
// import AddLink from "../../components/Addlink/AddLink";
import { linkArray } from "../../linkArray";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { addNewLink, setAllPrompts } from "../../state/link/linkSlice";
import { addComponent } from "../../state/link/linkComponentSlice";
import {
  MergedValues,
  updateMergedValue,
} from "../../state/inputs/mergedValuesSlice";

import { validateField } from "../../state/inputs/inputSlice";
import { v4 as uuidv4 } from "uuid";
import AddnewLink from "../../components/Addlink/Addnewlink";
import { setPrompt } from "../../state/link/promptSlice";
import axios from "../../api/axios";
import { json } from "stream/consumers";

export interface TCustomize {
  id: string;
  answer: string;
  label: string;
  bgColor: string;
  image: string;
  placeholder: string;
  isEditable: boolean;
}


export interface TLinks {
  id: string;
  label: string;
  answer: string;
  image: string;
  bgColor: string;
}



export default function CustomeLink() {
  const dispatch = useDispatch();

  const [prompts, setPrompts] = useState<TCustomize[]>([
    {
      id: uuidv4(),
      answer: "",
      label: "",
      bgColor: "",
      image: "",
      placeholder: "",
      isEditable: false,
    },
  ]);

  


 const [isActive, setIsActive] = useState<boolean>(false);
 const [activeIndex, setActiveIndex] = useState<number | null>(null);

 const [myError, setMyError] = useState<boolean>(false);
 const [errorMessage, setErrorMessage] = useState<string>("");

  


  //   // selectors
  const linksComponents = useSelector((state: RootState) => state.link.links);

 
 
 



  const handleButtonClick = (i: number) => {
    setActiveIndex(i === activeIndex ? null : i);
  };




  const handleAddPrompt = () => {

  // Check if prompt.answer is empty for any existing prompt
  const hasEmptyAnswer = prompts.some(prompt => prompt.answer === "");

 
  if (!hasEmptyAnswer) {
    setIsActive(true);
    setPrompts([
      ...prompts,
      {
        id: uuidv4(),
        answer: "",
        label: "",
        bgColor: "",
        image: "",
        placeholder: "",
        isEditable: false,
      },
    ]);
  } else {
   
    console.error("Cannot add additional link without entering a value for the existing link.");

  }
  };



  const handleOptionClick = (
    e: any,
    i: any,
    label: string,
    image: string,
    placeholder: string,
    bgColor: string,
  ) => {

    const hasEmptyAnswer = prompts.some(prompt => prompt.label === label);

    if (hasEmptyAnswer) {
      console.error("Cannot select a label that already exists.");
      return;
    }


    const updatedPrompts = prompts.map((prompt, index) => {

      console.log(prompt)
      if (index === i) {
        return {
          ...prompt,
          bgColor: bgColor,
          image: image,
          placeholder: placeholder,
          label: label,
          isEditable: true
        };
      }
      return prompt;
    });
    setPrompts(updatedPrompts);
    setActiveIndex(null);
  };




  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const { value } = e.target;

    setPrompts((prevPrompts: any) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[i] = {
        ...updatedPrompts[i],
        answer: value,
      };
      return updatedPrompts;
    });
  };

 

  const handleDisplayFirstPrompt = () => {
    setIsActive(true);
  };

  const handleDelete = (i: any) => {
    let deletePrompts = [...prompts];
    deletePrompts.splice(i, 1);
    setPrompts(deletePrompts);
  };

  const handleSave = async(e: any) => {

e.preventDefault()
  
  const hasEmptyAnswer = prompts.some(prompt => prompt.answer === "");

  if (hasEmptyAnswer) {
    console.error("Cannot save link with empty answer for any prompt.");
    setMyError(true)
    setErrorMessage("Please enter a text.")
    return; 
  }

  // Check if any prompt has the same selectedlabel as the one being added
  const hasDuplicateLabel = prompts.some(prompt => prompt.label === "");

  // If any prompt has the same selectedlabel, display an error or handle as needed
  if (hasDuplicateLabel) {
    console.error("Cannot save link with duplicate label.");
    return; 
  }

  const newPromptsArray = prompts.map(({ answer, label, bgColor, image, id }) => ({
    id,
    answer,
    label,
    bgColor,
    image,
  }));

  console.log(newPromptsArray, "newPromptsArray")

  try {
    const response = await axios.post("/links",
        JSON.stringify(newPromptsArray),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    console.log(response);
    //console.log(JSON.stringify(response));
     const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
  
    
} catch (err:any) {
   console.log(err)
}

    dispatch(setPrompt(prompts));
    dispatch(setAllPrompts(newPromptsArray))
    console.log(prompts)
    setMyError(false)

  };


  const handleEdit = (i: string) => {
    console.log(i)
  }


  return (
    <div className="customelinkcontainer">
      <form onClick={handleSave}>
      <div className="edit-links-remove">
        <div>
        <MHeader className="your-links" text="Customize your links" />
        <MBody className="add-edit-remove" text="Add/edit/remove links below and then share all your profiles with the world!" />
        <div className="add-new-link">
          <Button
            onClick={isActive ? handleAddPrompt : handleDisplayFirstPrompt}
            buttonType="secondary"
            text="+ Add new link"
          />
        </div>
        </div>
        
        <div className="link-middle-addnewlinkcontainer">
          {!isActive && (
            <div className="link-middle">
              <div className="link-middle-image">
                <img src={picture} alt="get-started-icon" />
              </div>
              <div className="link-middle-header">
                <MHeader text="Let’s get you started" />
              </div>
              <div className="link-middle-text">
                <MBody
                  className="link-middle-mbody"
                  text="Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!"
                />
              </div>
            </div>
          )}

          {isActive && (
            <div className="addnewlinkcontainer">
               <AddnewLink
             errorMessage={errorMessage}
              handleInputChange={handleInputChange}
              prompts={prompts}
              activeIndex={activeIndex}
              handleDelete={handleDelete}
              handleButtonClick={handleButtonClick}
              handleOptionClick={handleOptionClick}
         
              type="text"
              error={myError}
              handleEdit={handleEdit}
              
            />
            </div>
           
          )}
        </div>
      </div>

      <div className="custome-save-button">
        <Button
          backgroundSubtype={linksComponents.length === 0 && "active"}
          classname="custom-button"
          text="Save"
 
        />
      </div>
      </form>
    </div>
  );
}
