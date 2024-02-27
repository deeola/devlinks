import { useState, useEffect } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {  setAllPrompts, removeLink, addNewLink, selectAllLinks } from "../../state/link/linkSlice";
import { v4 as uuidv4 } from "uuid";
import AddnewLink from "../../components/Addlink/Addnewlink";
import { addPrompt, deletePrompt, getlinks, selectAllPrompts } from "../../state/link/promptSlice";
import axios from "../../api/axios";
import { TCustomize, TLinks } from "../../types";

type TProps = {
  isPrompts:  object[];
   userId: string;
   userInformation: any;
  }

export default function CustomeLink(Props: TProps) {


 const { isPrompts, userId } = Props;


 const dispatch = useDispatch<AppDispatch>();


 const [getUpdatedLinks, setGetUpdatedLinks] = useState(false);

 const [prompts, setPrompts] = useState<TCustomize[]>([
    {
      id: "",
      answer: "",
      label: "",
      bgColor: "",
      image: "",
      placeholder: "Enter a valid link",
      userId: "",
    },
 ]);


 const [isActive, setIsActive] = useState<boolean>(false);

 const [activeIndex, setActiveIndex] = useState<number | null>(null);

 const [myError, setMyError] = useState<boolean>(false);

 const [errorMessage, setErrorMessage] = useState<string>("");

 // Effect to update prompts when isPrompts changes
 useEffect(() => {
   if (isPrompts.length > 0) {
     // Convert data from isPrompts to TCustomize type
     const convertedData: TCustomize[] = isPrompts.map((link: any) => ({
       id: link.id,
       answer: link.answer,
       label: link.label,
       bgColor: link.bgColor,
       image: link.image,
       placeholder: "",
       userId: link.userId,
     }));

     // Update prompts state
     setPrompts(convertedData);
     setGetUpdatedLinks(true);
   } 
 }, [isPrompts]);



 // Function to handle button click
 const handleButtonClick = (i: number) => {
   setActiveIndex(i === activeIndex ? null : i);
 };


 // Function to add a new prompt
 const handleAddPrompt = () => {
   // Check if any prompt's answer is empty
   const hasEmptyAnswer = prompts.some(prompt => prompt.answer === "");

   if (!hasEmptyAnswer) {
     setIsActive(true);
     // Add a new prompt to the prompts array
     setPrompts([
       ...prompts,
       {
         id: uuidv4(),
         answer: "",
         label: "",
         bgColor: "",
         image: "",
         placeholder: "",
         userId: userId,
       },
     ]);
   }
 };


 // Function to handle option click
 const handleOptionClick = (
   e: any,
   i: any,
   label: string,
   image: string,
   placeholder: string,
   bgColor: string,
 ) => {
   const hasEmptyAnswer = prompts.some(prompt => prompt.label === label);
   if (hasEmptyAnswer) return;

   // Update the selected prompt
   const updatedPrompts = prompts.map((prompt, index) => {
     if (index === i) {
       return {
         ...prompt,
         bgColor: bgColor,
         image: image,
         placeholder: placeholder,
         label: label,
         userId: userId
       };
     }
     return prompt;
   });
   setPrompts(updatedPrompts);
   setActiveIndex(null);
 };


 // Function to handle input change
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

 // Function to display the first prompt
 const handleDisplayFirstPrompt = () => {
   setIsActive(true);
 };
 let deletePrompts = [...prompts];

 console.log("deletePrompts", deletePrompts);

 // Function to handle prompt deletion
 const handleDelete = async (e:React.MouseEvent<HTMLButtonElement>, i:number, id: string, label: string) => {
   e.preventDefault();
   try {
    // Remove the prompt from the prompts array
    let deletePrompts = [...prompts];
    deletePrompts.splice(i, 1);

    console.log("deletePrompts", deletePrompts);

    // Dispatch the removeLink action first
    dispatch(removeLink(id));
    
    // Wait for the removeLink action to complete before dispatching deletePrompt
    await dispatch(deletePrompt({id, label, userId}));

    // Optionally, update the local state with the modified prompts array
    setPrompts(deletePrompts);
} catch (error) {
    // Handle any errors here
    console.error("Error deleting prompt:", error);
}

 };

 // Function to save prompts
 const handleSave = async(e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const hasEmptyAnswer = prompts.some(prompt => prompt.answer === "");
   if (hasEmptyAnswer) {
     console.error("Cannot save link with empty answer for any prompt.");
     setMyError(true)
     setErrorMessage("Please enter a text.")
     return; 
   }

   // Check for duplicate labels
   const hasDuplicateLabel = prompts.some(prompt => prompt.label === "");
   if (hasDuplicateLabel) {
     console.error("Cannot save link with duplicate label.");
     return; 
   }

   // Save prompts
   const newPromptsArray = prompts.map(({ answer, label, bgColor, image, id, userId }) => ({
     id,
     answer,
     label,
     bgColor,
     image,
     userId
   }));
   dispatch(addPrompt(newPromptsArray));
   setMyError(false);
 };


  return (
    <div className="customelinkcontainer">
      <form onSubmit={handleSave}>
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
          {(!isActive  && !getUpdatedLinks && isPrompts.length === 0) && (
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

          {(isActive || getUpdatedLinks) && (
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

              
            />
            </div>
           
          )}
        </div>
      </div>

      <div className="custome-save-button">
        <Button
          backgroundSubtype={"active"}
          classname="custom-button"
          text="Save"
          type="submit"
        />
      </div>
      </form>
    </div>
  );
}
