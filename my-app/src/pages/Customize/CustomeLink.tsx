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

  const { isPrompts, userId, userInformation} = Props;


  const dispatch = useDispatch<AppDispatch>();




  const [getUpdatedLinks, setGetUpdatedLinks] = useState(false);


  // const userId = username?.username;

  // const userId = "my@test.coms";

  //initial value of new prompt

  const [prompts, setPrompts] = useState<TCustomize[]>([
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

  // useEffect(() => {
  //   dispatch(getlinks(userId));
  // },[])



  // const isPrompts = useSelector(selectAllPrompts);

  // console.log(isPrompts, "isPrompts")

  // Populate the prompts array with the items in the promptSlice (isPrompts) if there is any


  // if (isPrompts.length > 0) {
  //   const convertedData: TCustomize[] = isPrompts.map((link: any) => ({
  //     id: link.id,
  //     answer: link.answer,
  //     label: link.label,
  //     bgColor: link.bgColor,
  //     image: link.image,
  //     placeholder: "",
  //     userId: link.userId,
  //   }));

  //   setPrompts(convertedData);
  //   setGetUpdatedLinks(true);
  // }

  useEffect(() => {
    if (isPrompts.length > 0) {
      const convertedData: TCustomize[] = isPrompts.map((link: any) => ({
        id: link.id,
        answer: link.answer,
        label: link.label,
        bgColor: link.bgColor,
        image: link.image,
        placeholder: "",
        userId: link.userId,
      }));
  
      setPrompts(convertedData);
      setGetUpdatedLinks(true);
    }
  }, [isPrompts]);


  // useEffect(() => {

   
  // }, [isPrompts ]);



 const [isActive, setIsActive] = useState<boolean>(false);
 const [activeIndex, setActiveIndex] = useState<number | null>(null);

 const [myError, setMyError] = useState<boolean>(false);
 const [errorMessage, setErrorMessage] = useState<string>("");

  


  //   // selectors
  // const linksComponents = useSelector((state: RootState) => state.link.links);

 
 
 



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
        userId: userId,
      },
    ]);
  }
  };



  // Option click handler to handle the platform selection

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

    const updatedPrompts = prompts.map((prompt, index) => {

      console.log(prompt)
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



 // Remove a prompt from the prompts array and also from the promptSlice 

  const handleDelete = (i: string) => {
    // let deletePrompts = [...prompts];
    // deletePrompts.splice(i, 1);

    // dispatch(removeLink(prompts[i].id));
    dispatch(deletePrompt(i));

    // setPrompts(deletePrompts);
    console.log(prompts.length)
  };


  // save the prompts to the promptSlice

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

  const newPromptsArray = prompts.map(({ answer, label, bgColor, image, id, userId }) => ({
    id,
    answer,
    label,
    bgColor,
    image,
    userId
  }));
  
    dispatch(addPrompt(newPromptsArray));
    // dispatch(setPrompt(prompts));
    // dispatch(setAllPrompts(newPromptsArray))
    console.log(prompts)
    setMyError(false)

  };





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
          {(!isActive  && !getUpdatedLinks) || (prompts.length <= 1) && (
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
        />
      </div>
      </form>
    </div>
  );
}
