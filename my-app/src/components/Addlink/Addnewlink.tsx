import React, { useState, useEffect } from "react";
import { linkArray } from "../../linkArray";
import "../Dropdown/Dropdown.css";
import "../Input/InputField.css";
import iconLink from "../../assets/images/icon-link.svg";
import { MBody } from "../Text/Text";

type Tdropdown = {
  dropArrayImage: string;
  error: boolean;
  type: string;
  handleOptionClick: (e: any, i: any, label: string, image: string, placeholder: string, bgColor: string, id: string) => void;
  prompts: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
handleDelete: (i: any) => void;
handleButtonClick: (i: number) => void;
activeIndex: number | null;
};

export default function AddnewLink(Props: Tdropdown) {
  const { dropArrayImage, error, type, handleOptionClick, prompts, handleInputChange, handleDelete, handleButtonClick, activeIndex } = Props;
//   const [isActive, setIsActive] = useState<boolean>(false);
//   const [selectedlabel, setSelectedLabel] = useState<string>(
//     linkArray[0].label
//   );
//   const [selectedImage, setSelectedImage] = useState<string>(
//     linkArray[0].image
//   );
//   const [selectedPlaceholder, setSelectedPlaceholder] = useState<string>(
//     linkArray[0].placeholder
//   );
//   const [selectedBgColor, setSelectedBgColor] = useState<string>(
//     linkArray[0].bgColor
//   );
//   const [selectedId, setSelectedId] = useState<string>(linkArray[0].id);

//   const [selectedUrl, setSelectedSelectedUrl] = useState<string>("");

//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const handleButtonClick = (i: number) => {
//     setActiveIndex(i === activeIndex ? null : i);
//   };

//   const handleDelete = (i: any) => {
//     let deletePrompts = [...prompts];
//     deletePrompts.splice(i, 1);
//     setPrompts(deletePrompts);
//   };

//   useEffect(() => {
//     setPrompts((prevPrompts) => {
//       const updatedPrompts = [...prevPrompts];
//       updatedPrompts[0] = {
//         ...updatedPrompts[0],
//         label: selectedlabel,
//         bgColor: selectedBgColor,
//         placeholder: selectedPlaceholder,
//         image: selectedImage,
//         id: selectedId,
//         urlAddress: selectedUrl,
//       };
//       return updatedPrompts;
//     });
//   }, [
//     selectedlabel,
//     selectedBgColor,
//     selectedPlaceholder,
//     selectedImage,
//     selectedId,
//     selectedUrl,
//   ]);

//   const [prompts, setPrompts] = useState([
//     {
//       prompt: "",
//       answer: "",
//       label: linkArray[0].label,
//       bgColor: "",
//       image: "",
//       id: "",
//       placeholder: "",
//       urlAddress: "",
//       timestamp: new Date().getTime(),
//     },
//   ]);

//   console.log(prompts);

//   const handlePrompt = (
//     e:
//       | React.ChangeEvent<HTMLTextAreaElement>
//       | React.ChangeEvent<HTMLSelectElement>
//       | React.ChangeEvent<HTMLInputElement>,

//     i: number
//   ) => {
//     const { name, value } = e.target;

//     setPrompts((prevPrompts) => {
//       const updatedPrompts = [...prevPrompts];
//       updatedPrompts[i] = {
//         ...updatedPrompts[i],
//         [name]: value,
//         label: selectedlabel,
//         bgColor: selectedBgColor,
//         placeholder: selectedPlaceholder,
//         image: selectedImage,
//         id: selectedId,
//         urlAddress: selectedUrl,
//       };
//       return updatedPrompts;
//     });
//   };

//   const handleAddPrompt = () => {
//     setPrompts([
//       ...prompts,
//       {
//         prompt: "",
//         answer: "",
//         label: selectedlabel,
//         bgColor: "",
//         image: "",
//         id: "",
//         placeholder: "",
//         urlAddress: "",
//         timestamp: new Date().getTime(),
//       },
//     ]);
//   };

//   const handleOptionClick = (
//     e: any,
//     i: any,
//     label: string,
//     image: string,
//     placeholder: string,
//     bgColor: string,
//     id: string
//   ) => {
//     const updatedPrompts = prompts.map((prompt, index) => {
//       if (index === i) {
//         return {
//           ...prompt,
//           selectedlabel: label, 
//           bgColor: bgColor, 
//           image: image,
//           placeholder: placeholder,
//           id: id,
//           label: label,
//         };
//       }
//       return prompt;
//     });
  
//     setPrompts(updatedPrompts);
  
//     setIsActive(false);
//     setActiveIndex(null);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     i: number
//   ) => {
//     const { value } = e.target;

//     setPrompts((prevPrompts) => {
//       const updatedPrompts = [...prevPrompts];
//       updatedPrompts[i] = {
//         ...updatedPrompts[i],
//         answer: value,
//       };
//       return updatedPrompts;
//     });
//   };

//   //   const handleBlur = () => {

//   //     dispatch(validateField());

//   //   }


return (
    <div>
        {/* <div onClick={handleAddPrompt} >Add Prompt</div> */}
      {prompts.map((prompt: any, i: any) => (
        <div className="addlink-container" key={prompt.timestamp}>
          <div className="addlinknumber-remove">
            <MBody text={`= Link #${prompts.indexOf(prompt) + 1}`} />
            <button onClick={() => handleDelete(i)}> Remove </button>
          </div>
          <div>
            <div>
              <label className="label">Platform</label>
              <div className="platform-link">
                <div className={`custom-select ${i === activeIndex ? "active" : ""}`}>
                  <button
                    className="select-button"
                    role="combobox"
                    aria-labelledby="select button"
                    aria-haspopup="listbox"
                    aria-expanded={i === activeIndex ? "true" : "false"}
                    aria-controls="select-dropdown"
                    onClick={() => handleButtonClick(i)}
                  >
                    <div className="dropdown-selected-value">
                      <span className="image">
                        <img src={dropArrayImage} alt="Icon" />
                      </span>
                      <span className="selected-value">{prompt.label}</span>
                    </div>
                    <span className="arrow"></span>
                  </button>
                  <ul className="select-dropdown" role="listbox" id="select-dropdown">
                    {linkArray.map((list, index) => (
                      <li
                        key={index}
                        role="option"
                        onClick={(e) =>
                          handleOptionClick(
                            e,
                            i,
                            list.label,
                            list.image,
                            list.placeholder,
                            list.bgColor,
                            list.id
                          )
                        }
                      >
                        <input type="radio" id={list.label} name={list.label} />
                        <label htmlFor={list.label}>
                          <img className="bx bxl-github" src={list.image} alt="" />
                          {list.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="label">Link</label>
            <div className="platform-link">
              <div className={`input-container ${error ? "error" : ""}`}>
                <span className="image">
                  <img src={iconLink} alt="Icon" />
                </span>
                <div className="input-and-error">
                  <input
                    value={prompt.answer}
                    onChange={(e) => handleInputChange(e, i)}
                    type={type}
                    data-id="myInput"
                    className={`${error ? "error-text" : ""}`}
                    placeholder={prompt.placeholder}
                    id={`answer-${i}`}
                    name={`answer-${i}`}
                  />
                  {/* {touched && error && <span className="error-span"> {errorMessage} </span>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
    }
   


{/* {touched && error && <span className="error-span"> {errorMessage} </span>} */}
// onClick={handleAddPrompt}