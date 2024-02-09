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

//   console.log(selectedlabel, "myselectedlabel");


//   // selectors
    const links = useSelector((state: RootState) => state.link.links);
  const linksComponents = useSelector(    (state: RootState) => state.link.links  );
//   const mergedValue = useSelector(
//     (state: RootState) => state.mergedValuesSlice.mergedValue
//   );

 



// const [prompts, setPrompts] = useState([
//   {
//     prompt: "",
//     isActive: false,
//     answer: "",
//     label: selectedlabel,
//     bgColor: "",
//     image: "",
//     id: "",
//     placeholder: "",
//     urlAddress: "",
//     timestamp: new Date().getTime(),
//   },
// ]);





//   const handlePrompt = (
//       e:
//       | React.ChangeEvent<HTMLTextAreaElement>
//       | React.ChangeEvent<HTMLSelectElement>
//       | React.ChangeEvent<HTMLInputElement>,
//       i: number
//   ) => {
//       const { name, value } = e.target;

//       setPrompts((prevPrompts) => {
//       const updatedPrompts = [...prevPrompts];
//       updatedPrompts[i] = {
//           ...updatedPrompts[i],
//           [name]: value,
//           isActive: false,
//           label: selectedlabel,
//           bgColor: selectedBgColor,
//           placeholder: selectedPlaceholder,
//           image: selectedImage,
//           id: selectedId,
//           urlAddress: selectedUrl,
//       };
//       return updatedPrompts;
//       });
//   };



// const handleAddPrompt = () => {
//   setPrompts([
//     ...prompts,
//     {
//       prompt: "",
//       isActive: false,
//       answer: "",
//       label: "",
//       bgColor: "",
//       image: "",
//       id: "",
//       placeholder: "",
//       urlAddress: "",
//       timestamp: new Date().getTime(),
//     },
//   ]);
// };



// // const handleAddLink = (): void => {
// //   handleAddPrompt()
// //   dispatch(addComponent("hello"))

// // };

// console.log(prompts);


// const handleOptionClick = (
//   e: any,
//   i: any,
//   label: string,
//   image: string,
//   placeholder: string,
//   bgColor: string,
//   id: string
// ) => {
 
//   setSelectedLabel(label);
//   setSelectedBgColor(bgColor);
//   setSelectedImage(image);
//   setSelectedPlaceholder(placeholder);
//   setSelectedId(id);
//   setSelectedSelectedUrl(selectedUrl);

//   handlePrompt(e, i );

//   setIsActive(false);

//   console.log(prompts);
// };




// const handleDelete = (i: any) => {
//   console.log(i, "myi")
//   let deletePrompts = [...prompts];
//   deletePrompts.splice(i, 1);
//   setPrompts(deletePrompts);
// };

// const handleSave = () => {
//   dispatch(addNewLink(prompts));
//   console.log(linksComponents, "mylinksComponents");
// }

// const handleClick = (i: any) => {
//   setIsActive(!isActive);
// };

// // const handleClick = (index: any) => {

// //   console.log(prompts)
// //   setPrompts((prevPrompts) =>
// //     prevPrompts.map((prompt, i) =>
// //       i === index ? { ...prompt, isActive: !prompt.isActive } : prompt
// //     )
// //   );
// // };



  return (
    <div className="customelinkcontainer">
      <div className="edit-links-remove">
        <MHeader className="your-links" text="Customize your links" />
        <MBody text="Add/edit/remove links below and then share all your profiles with the world!" />
        <div className="add-new-link">
          <Button
            // onClick={handleAddPrompt}
            buttonType="secondary"
            text="+ Add new link"
          />
        </div>
        {/* <div>
          {linksComponents.length === 0 ? (
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
          ) : 
            linksComponents.map((link) => (
              <AddLink key={uuidv4()} id={uuidv4()} number={linksComponents.length + 1} />
            ))
          }
        </div> */}

      </div>

       <AddnewLink dropArrayImage={picture} type="text" error={false}/>

      

      <div className="custome-save-button">
        <Button
          backgroundSubtype={linksComponents.length === 0 && "active"}
          classname="custom-button"
          text="Save"
          //  onClick={handleSave}
        />
      </div>
    </div>
  );
}
