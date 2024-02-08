import React, { useState, useEffect } from "react";
import { linkArray } from "../../linkArray";
import "../Dropdown/Dropdown.css";
import "../Input/InputField.css";
import iconLink from "../../assets/images/icon-link.svg";

type Tdropdown = {
  dropArrayImage: string;
  error: boolean;
  type: string;
};

export default function AddnewLink(Props: Tdropdown) {
  const { error } = Props;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedlabel, setSelectedLabel] = useState<string>(
    linkArray[0].label
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    linkArray[0].image
  );
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<string>(
    linkArray[0].placeholder
  );
  const [selectedBgColor, setSelectedBgColor] = useState<string>(
    linkArray[0].bgColor
  );
  const [selectedId, setSelectedId] = useState<string>(linkArray[0].id);

  const [selectedUrl, setSelectedSelectedUrl] = useState<string>("");

  console.log(selectedlabel, "myselectedlabel");

  const [prompts, setPrompts] = useState([
    {
      prompt: "",
      answer: "",
      label: selectedlabel,
      bgColor: "",
      image: "",
      id: "",
      placeholder: "",
      urlAddress: "",
      timestamp: new Date().getTime(),
    },
  ]);

  useEffect(() => {
    console.log(prompts);
  }, [prompts]);

  const handleAddPrompt = () => {
    setPrompts([
      ...prompts,
      {
        prompt: "",
        answer: "",
        label: "",
        bgColor: "",
        image: "",
        id: "",
        placeholder: "",
        urlAddress: "",
        timestamp: new Date().getTime(),
      },
    ]);
  };


    const handlePrompt = (
        e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLInputElement>,
        i: number
    ) => {
        const { name, value } = e.target;
    
        setPrompts((prevPrompts) => {
        const updatedPrompts = [...prevPrompts];
        updatedPrompts[i] = {
            ...updatedPrompts[i],
            [name]: value,
            prompt: selectedlabel,
            label: selectedlabel,
            bgColor: selectedBgColor,
            placeholder: selectedPlaceholder,
            image: selectedImage,
            id: selectedId,
            urlAddress: selectedUrl,
        };
        return updatedPrompts;
        });
    };


   
      
  

  const handleDelete = (i: any) => {
    let deletePrompts = [...prompts];
    deletePrompts.splice(i, 1);
    setPrompts(deletePrompts);
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  console.log(prompts);
 

  const handleOptionClick = (
    e: any,
    i: any,
    label: string,
    image: string,
    placeholder: string,
    bgColor: string,
    id: string
  ) => {
 

    setSelectedLabel(label);
    setSelectedBgColor(bgColor);
    setSelectedImage(image);
    setSelectedPlaceholder(placeholder);
    setSelectedId(id);
    setSelectedSelectedUrl(selectedUrl);

    handlePrompt(e, i );

    setIsActive(false);

    console.log(prompts);
  };



  return (
    <div>
      <fieldset className="flex flex-col gap-2 border py-1 px-4">
        <legend className="text-2xl font-semibold mb-2 text-gray-500">
          Prompts
        </legend>
        {prompts.map((prompt, i) => (
          <div key={prompt.timestamp} className="flex flex-col">
            <label className="text-3xl font-semibold">Select a prompt</label>
            <div className="flex flex-row items-center gap-2">
              <select
                className="w-full border rounded text-lg leading-tight py-3 px-2 mt-4 mb-3 focus:outline-indigo-200"
                id="prompt"
                name="prompt"
                // onChange={(e) => handlePrompt(e, i)}
              >
                <option>Select Prompt</option>
                <option value="Dating me is like...">
                  Dating me is like...
                </option>
                <option value="Fact about me that surprises people:">
                  Fact about me that surprises people:
                </option>
                <option value="I want someone who...">
                  I want someone who...
                </option>
                <option value="I spend most of my money on:">
                  I spend most of my money on:
                </option>
                <option value="The most spontaneous thing I've done:">
                  The most spontaneous thing I've done:
                </option>
                <option value="We're the same type of weird if...">
                  We're the same type of weird if...
                </option>
              </select>

              <div className={`custom-select ${isActive ? "active" : ""}`}>
                <button
                  className="select-button"
                  role="combobox"
                  aria-labelledby="select button"
                  aria-haspopup="listbox"
                  aria-expanded={isActive ? "true" : "false"}
                  aria-controls="select-dropdown"
                  onClick={handleClick}
                >
                  <div className="dropdown-selected-value">
                    <span className="image">
                      <img src={selectedImage} alt="Icon" />
                    </span>

                    <span className="selected-value">{selectedlabel}</span>
                  </div>

                  <span className="arrow"></span>
                </button>
                <ul
                  className="select-dropdown"
                  role="listbox"
                  id="select-dropdown"
                >
                  {linkArray.map((list, index) => (
                    <li
                      key={index}
                      role="option"
                    //   onChange={(e) => handleOptionClick(e, i, list.label, list.image, list.placeholder, list.bgColor, list.id)}
                    onClick={(e) => handleOptionClick(e, i, list.label, list.image, list.placeholder, list.bgColor, list.id)}
                    >
                      <input type="radio" id={list.label} name={list.label} />
                      <label htmlFor={list.label}>
                        <img
                          className="bx bxl-github"
                          src={list.image}
                          alt=""
                        />
                        {list.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`input-container ${error ? "error" : ""}`}>
                <span className="image">
                  <img src={iconLink} alt="Icon" />
                </span>
                <div className="input-and-error">
                  <input
                    //   value={selectedUrl}
                    //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, i)}
                    // //   onChange={(e) => handleInputChange(e, i)}
                    // //   onBlur={handleBlur}
                    //   type={type}
                    //   id={selectedId}
                    // name={"urlAddress"}
                    //   data-id="myInput"
                    //   className={`${error ? 'error-text' : ''}`}
                    //   placeholder={selectedPlaceholder}

                    className={`${error ? "error-text" : ""}`}
                    id="answer"
                    name="answer"
                    placeholder={selectedPlaceholder}
                    onChange={(e) => handlePrompt(e, i)}
                    type="text"
                  />
                  {/* {touched && error && <span className="error-span"> {errorMessage} </span>} */}
                </div>
              </div>

              <button
                className="border bg-red-400 py-2.5 px-4 rounded-lg text-white font-bold text-xl"
                type="button"
                onClick={() => handleDelete(i)}
              >
                —
              </button>
            </div>
            <textarea
              className="border border-dashed py-3 px-2 mb-4 focus:outline-indigo-200"
              id="answer"
              name="answer"
              rows={5}
              placeholder="Let your true colours shine through"
              onChange={(e) => handlePrompt(e, i)}
            />
          </div>
        ))}

        <div className="w-full flex justify-center">
          <button
            className="border bg-indigo-400 py-1 px-2 rounded-lg text-white font-bold text-xl"
            type="button"
            onClick={handleAddPrompt}
          >
            Add Prompt
          </button>
        </div>
      </fieldset>
    </div>
  );
}

// onClick={(e) => handleOptionClick(e, i, list.label, list.image, list.placeholder, list.bgColor, list.id)}
