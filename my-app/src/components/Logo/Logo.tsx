import React from "react";
import largeLogo from "../../assets/images/logo-devlinks-large.svg";
import smallLogo from "../../assets/images/logo-devlinks-small.svg";

type TLogo = {
    size: "small" | "large"
}
export default function Logo(Props: TLogo){
    const {size} = Props
    return (
        <div>
            <img src={size === "small" ? smallLogo : largeLogo} alt="devlinks-logo"/>
        </div>
    )
}
