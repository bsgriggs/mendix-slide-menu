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
                toggleOnHover={props.toggleOnHover.value as boolean}
                closeClickOutside={props.closeClickOutside.value as boolean}
                closeTabOutside={props.closeTabOutside.value as boolean}
                openOverride={props.openOverride?.value}
                menuLength={props.menuLength.value as string}
                tagOffset={props.tagOffset.value as string}
                tagAriaLabel={props.tagAriaLabel?.value}
                modalAriaLabel={props.modalAriaLabel?.value}
            />,
            document.getElementById("content") || document.body
        )
    ) : (
        <Menu
            {...props}
            tagText={props.tagText.value as string}
            toggleOnHover={props.toggleOnHover.value as boolean}
            closeClickOutside={props.closeClickOutside.value as boolean}
            closeTabOutside={props.closeTabOutside.value as boolean}
            openOverride={props.openOverride?.value}
            menuLength={props.menuLength.value as string}
            tagOffset={props.tagOffset.value as string}
            tagAriaLabel={props.tagAriaLabel?.value}
            modalAriaLabel={props.modalAriaLabel?.value}
        />
    );
}
