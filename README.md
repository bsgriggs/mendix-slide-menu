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
![general](https://github.com/bsgriggs/mendix-slide-menu/blob/media/general.png)  
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
**Page name** - String attribute that will be set with the name of the current page. This value can then be used to make content specific to a page (details in the 'How to use the Page Name to make a Page-Based FAQ Menu' section below).
**Interval offset** - 

### Events
![events](https://github.com/bsgriggs/mendix-slide-menu/blob/media/events.png)  
**On tag click** - Action triggered when the user clicks on the button to expand or collapse the menu.
**On click outside** - Action triggered when the user clicks on anything outside the menu (including the tag button).
**On change** - Action triggered when the Page Name attribute's value changes.

## How to use the Page Name to make a Page-Based FAQ Menu
For this example, we will use the following persistent data structure.  
![domainMain](https://github.com/bsgriggs/mendix-slide-menu/blob/media/domainMain.png)  
The Page entity stores the value from the Page Name attribute on the widget. Then you can have any number of objects that are associated and store information about that page.  

You will also need a non-persistent page helper.  
![domainHelper](https://github.com/bsgriggs/mendix-slide-menu/blob/media/domainHelper.png)   

Create a Microflow/Nanoflow that creates this helper and returns it.  
![DS_Helper](https://github.com/bsgriggs/mendix-slide-menu/blob/media/DS_Helper.png)  

Inside a snippet on your project's main layout (so the widget appears on all pages), add a data view that calls the above Microflow/Nanoflow. Inside the data view, add the Slide Menu widget and set the Page Name property to SlideMenuHelper -> PageName. Inside the content of the Slide Menu, add a List View or Gallery that retrieves by the Page Name.  
![pageFAQ](https://github.com/bsgriggs/mendix-slide-menu/blob/media/pageFAQ.png)  
*Note: the content above the Gallery widget is from using Tag Type = 'Custom' and is not required*

Now when you run the project, you should see the Slide Menu appearing on all pages but it has no data. Add a button inside the Slide Menu's content so admins can create FAQs directly on the page they're on.  
The button should call a Microflow similar to the following that checks if there is already a Page object in the database with the page name and create a new FAQ object associated with that page.  
![ACT_FAQ_New](https://github.com/bsgriggs/mendix-slide-menu/blob/media/ACT_FAQ_New.png)  
*Below is the sub-Microflow*  
![SUB_Page_CreateRetrieve](https://github.com/bsgriggs/mendix-slide-menu/blob/media/SUB_Page_CreateRetrieve.png)  

The most performant option is to have 'Close on click outside?' set to true and 'Interval offset (ms)' set to 0. This makes it so the slide menu closes when the user tries to change pages and the page name will update when the click on the tag to re-open the menu. If you do not want the menu to close when the user changes pages, then set 'Close on click outside?' set to false and 'Interval offset (ms)' set to 1000 or more.


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
