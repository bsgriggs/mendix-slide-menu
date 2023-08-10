import React, { createElement } from "react";
import { SlideMenuContainerProps } from "../typings/SlideMenuProps";
import "./ui/SlideMenu.scss";
import { createPortal } from "react-dom";
import Menu from "./components/Menu";

export function SlideMenu(props: SlideMenuContainerProps): React.ReactElement {
    return props.usePortal ? (
        createPortal(
            <Menu
                {...props}
                tagText={props.tagText.value as string}
                closeClickOutside={props.closeClickOutside.value as boolean}
                tagAriaLabel={props.tagAriaLabel?.value as string}
                menuLength={props.menuLength.value as string}
                tagOffset={props.tagOffset.value as string}
            />,
            document.body
        )
    ) : (
        <Menu
            {...props}
            tagText={props.tagText.value as string}
            closeClickOutside={props.closeClickOutside.value as boolean}
            tagAriaLabel={props.tagAriaLabel?.value as string}
            menuLength={props.menuLength.value as string}
            tagOffset={props.tagOffset.value as string}
        />
    );
}
