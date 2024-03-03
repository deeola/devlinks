import React from "react";
import { linkArray } from "../../linkArray";
import "../Dropdown/Dropdown.css";
import "../Input/InputField.css";
import iconLink from "../../assets/images/icon-link.svg";
import { MBody, SBody } from "../Text/Text";
import "../Addlink/AddLink.css";
import { useDeleteLinkMutation } from "../../state/api/apiSlice";

type Tdropdown = {
  errorMessage: string;
  error: boolean;
  type: string;
  handleOptionClick: (
    e: any,
    i: any,
    label: string,
    image: string,
    placeholder: string,
    bgColor: string,
    id: string
  ) => void;
  prompts: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>, i:number, id: string, label:string) => void;
  handleButtonClick: (i: number) => void;
  activeIndex: number | null;
 

};

export default function AddnewLink(Props: Tdropdown) {

  

  const {
    errorMessage,
    error,
    type,
    handleOptionClick,
    prompts,
    handleInputChange,
    handleDelete,
    handleButtonClick,
    activeIndex,


  } = Props;


  

  return (
    <div>
      {prompts.map((prompt: any, i: number) => (
        <div className="addlink-container" key={prompts.indexOf(prompt) + 1}>
          <div className="addlinknumber-remove">
            <MBody text={`= Link #${prompts.indexOf(prompt) + 1}`} />
            <div className="edit-remove">
          
            <button type="button" className="remove-button" onClick={(e) => handleDelete(e,i, prompt.id, prompt.label)}>
              Remove
            </button>
            </div>
            
          </div>

          <div className="platforms-container">
            <div className="platform-label-container">
              <label className="plabel">Platform</label>


              <div className="platform-link">
                <div
                  className={`custom-select ${
                    i === activeIndex ? "active" : ""
                  }`}
                >
                  <div
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
                        <img className="prompt-image" src={!prompt.image ? iconLink : prompt.image } alt="Icon" />
                      </span>
                      <span className="selected-value">{!prompt.label ? "Please select a platform" : prompt.label}</span>
                    </div>
                    <span className="arrow"></span>
                  </div>
                  <ul
                    className="select-dropdown"
                    role="listbox"
                    id="select-dropdown"
                  >
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
                        <div className="linkarraylabel">
                          <img
                            className="bx bxl-github"
                            src={list.image}
                            alt=""
                          />
                          <p>{list.label}</p>
                          
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>



            <div className="platform-label-container">
            <label className="plabel">Link</label>
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
                {error && <span className="error-span"> {errorMessage} </span>}
              </div>
            </div>
          </div>
          </div>

        </div>
      ))}
    </div>
  );
}
