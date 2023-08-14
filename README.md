## SlideMenu
Widget that allows you to put content in a section on any side of the screen. The user can click a button to expand/collapse the content. 

It is a React-based replacement for the Dojo-based [Slide in Slide out ](https://marketplace.mendix.com/link/component/17847) widget by Rob Stricker & Joël van de Graaf.

| Menu Closed | Menu Open |  
| ------------- | ------------- |  
| ![closed](https://github.com/bsgriggs/mendix-slide-menu/blob/media/demoClosed.png)   | ![open](https://github.com/bsgriggs/mendix-slide-menu/blob/media/demoOpen.png)  |  

## Features
- Show or hide content on the side of the screen
- Ability to have the widget set a string attribute to be the name of the current page ~ useful for page-dependent FAQs
- Option to have the menu automatically close when the user clicks away
- Option to either have the menu's DOM at the very end of the body or where the menu would be in the page structure

## Usage
### General settings
![generalPageName](https://github.com/bsgriggs/mendix-slide-menu/blob/media/generalPageName.png)  
#### Style
**Tag type** - Determines the content of the button that opens the menu

- Text - Basic text template - 'Tag text'
- Custom - A new box for content appears on the Mendix page allowing you to put any content you want in the button like an icon.  

Using the Tag Type "Custom" will add the Aria Label option to the widget settings (second image below). This is so screen readers know what the content of the button means.  
![accessibility](https://github.com/bsgriggs/mendix-slide-menu/blob/media/accessibility.png)  

**Screen side** - Determines which side of the screen the tag is fixed on.  
**Menu length** - String expression that is expected to be a valid CSS length. For screen sides **Left or Right**, this is the menu's **Width**. For screen sides **Top or Bottom**, this is the menu's **Height**.  
**Center?** - When enabled, the tag is fixed to the center of the side of the screen.  
**Tag offset** - Only available if Center is set to No. Otherwise, it is an expression expected to be a valid CSS length. For screen sides **Left or Right**, this is the distance from the **Top** of the screen. For screen sides **Top or Bottom**, this is the distance from the **Left** of the screen.  

#### Customization  
**Close on click outside** - Boolean expression that determines if the menu should automatically close when the user clicks outside of the menu  
**Debug mode** - Enables the widget's actions being logged to the browser console  
**Use portal** - When enabled, the widget's content will be rooted at the end of the body tag. When disabled, the widget's content will be rooted where it appears on the page in Studio Pro. 
- If the menu is describing something specific on the page (i.e. a list view with search criteria in the slide menu), accessibility requirements say the widget should be near the content it describes.
- If the menu is not describing something specific on the page (i.e. the menu shows the current user's account information, it is okay to leave the menu content rendering directly in the body DOM.  


#### Attributes  
**Page name** - String attribute that will be set with the name of the current page. This value can then be used to make content specific to a page (details below).
**Interval offset** - 

### Events
![events](https://github.com/bsgriggs/mendix-slide-menu/blob/media/events.png)  
**On tag click** - Action triggered when the user clicks on the button to expand or collapse the menu.
**On click outside** - Action triggered when the user clicks on anything outside the menu (including the tag button).
**On change** - Action triggered when the Page Name attribute's value changes.

## How to use the Page Name to make a Page-Based FAQ Menu
![generalPageName](https://github.com/bsgriggs/mendix-slide-menu/blob/media/generalPageName.png)  




## Demo project
https://widgettesting105-sandbox.mxapps.io/p/slide-menu

## Issues, suggestions and feature requests
https://github.com/bsgriggs/mendix-slide-menu/issues

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
2. Run `npm run dev` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

Benjamin Griggs

Idea from [Slide in Slide out ](https://marketplace.mendix.com/link/component/17847) widget by Rob Stricker & Joël van de Graaf 
