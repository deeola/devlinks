import { useState, useEffect } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg";
import AddLink from "../../components/Addlink/AddLink";
import { linkArray } from "../../linkArray";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { addNewLink } from "../../state/link/linkSlice";
import { addComponent } from "../../state/link/linkComponentSlice";
import {
  MergedValues,
  updateMergedValue,
} from "../../state/inputs/mergedValuesSlice";

import { validateField } from "../../state/inputs/inputSlice";
import { v4 as uuidv4 } from "uuid";
import AddnewLink from "../../components/Addlink/Addnewlink";

export default function CustomeLink() {
  const dispatch = useDispatch();

  //   // selectors
  const links = useSelector((state: RootState) => state.link.links);
  const linksComponents = useSelector((state: RootState) => state.link.links);

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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  let linksed = 0;
  const linkedArray = ["1"];

  const handleButtonClick = (i: number) => {
    setActiveIndex(i === activeIndex ? null : i);
  };

  const handleDelete = (i: any) => {
    let deletePrompts = [...prompts];
    deletePrompts.splice(i, 1);
    setPrompts(deletePrompts);
  };

  useEffect(() => {
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[0] = {
        ...updatedPrompts[0],
        label: selectedlabel,
        bgColor: selectedBgColor,
        placeholder: selectedPlaceholder,
        image: selectedImage,
        id: selectedId,
        urlAddress: selectedUrl,
      };
      return updatedPrompts;
    });
  }, [
    selectedlabel,
    selectedBgColor,
    selectedPlaceholder,
    selectedImage,
    selectedId,
    selectedUrl,
  ]);

  const [prompts, setPrompts] = useState([
    {
      prompt: "",
      answer: "",
      label: linkArray[0].label,
      bgColor: "",
      image: "",
      id: "",
      placeholder: "",
      urlAddress: "",
      timestamp: new Date().getTime(),
    },
  ]);

  console.log(prompts);

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

  const handleAddPrompt = () => {
    setIsActive(true);
    setPrompts([
      ...prompts,
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
  };

  const handleOptionClick = (
    e: any,
    i: any,
    label: string,
    image: string,
    placeholder: string,
    bgColor: string,
    id: string
  ) => {
    const updatedPrompts = prompts.map((prompt, index) => {
      if (index === i) {
        return {
          ...prompt,
          selectedlabel: label,
          bgColor: bgColor,
          image: image,
          placeholder: placeholder,
          id: id,
          label: label,
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

    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[i] = {
        ...updatedPrompts[i],
        answer: value,
      };
      return updatedPrompts;
    });
  };

  //   const handleBlur = () => {

  //     dispatch(validateField());

  //   }

  const handleSave = () => {
    // dispatch(addNewLink("hello"));
    console.log(links, "mylinksComponents");
  };

  const handleDisplayFirstPrompt = () => {
    setIsActive(true);
  };

  return (
    <div className="customelinkcontainer">
      <div className="edit-links-remove">
        <MHeader className="your-links" text="Customize your links" />
        <MBody text="Add/edit/remove links below and then share all your profiles with the world!" />
        <div className="add-new-link">
          <Button
            onClick={isActive ? handleAddPrompt : handleDisplayFirstPrompt}
            buttonType="secondary"
            text="+ Add new link"
          />
        </div>
        <div>
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
            <AddnewLink
              handleInputChange={handleInputChange}
              prompts={prompts}
              activeIndex={activeIndex}
              handleDelete={handleDelete}
              handleButtonClick={handleButtonClick}
              handleOptionClick={handleOptionClick}
              dropArrayImage={picture}
              type="text"
              error={false}
            />
          )}
        </div>
      </div>

      <div className="custome-save-button">
        <Button
          backgroundSubtype={linksComponents.length === 0 && "active"}
          classname="custom-button"
          text="Save"
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
