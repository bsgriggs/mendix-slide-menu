/**
 * This file was generated from SlideMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type TagTypeEnum = "TEXT" | "CUSTOM";

export type ScreenSideEnum = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

export interface SlideMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    tagType: TagTypeEnum;
    tagText: DynamicValue<string>;
    tagContent: ReactNode;
    menuContent: ReactNode;
    screenSide: ScreenSideEnum;
    menuLength: DynamicValue<string>;
    center: boolean;
    tagOffset: DynamicValue<string>;
    closeClickOutside: DynamicValue<boolean>;
    closeTabOutside: DynamicValue<boolean>;
    toggleOnHover: DynamicValue<boolean>;
    openOverride?: DynamicValue<boolean>;
    debugMode: boolean;
    usePortal: boolean;
    pageName?: EditableValue<string>;
    intervalOffset: number;
    onTagClick?: ActionValue;
    onClickOutside?: ActionValue;
    tagAriaLabel?: DynamicValue<string>;
    modalAriaLabel?: DynamicValue<string>;
}

export interface SlideMenuPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    tagType: TagTypeEnum;
    tagText: string;
    tagContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    menuContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    screenSide: ScreenSideEnum;
    menuLength: string;
    center: boolean;
    tagOffset: string;
    closeClickOutside: string;
    closeTabOutside: string;
    toggleOnHover: string;
    openOverride: string;
    debugMode: boolean;
    usePortal: boolean;
    pageName: string;
    intervalOffset: number | null;
    onTagClick: {} | null;
    onClickOutside: {} | null;
    onChange: {} | null;
    tagAriaLabel: string;
    modalAriaLabel: string;
}
