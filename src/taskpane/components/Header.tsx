import * as React from "react";

export interface Props {
    theme: string;
}

const Header = (props: Props) => {

    return (
        <div className="header">
            <p>{`header : ${props.theme}`}</p>
        </div>
    )
}

export default Header