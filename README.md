## Slide Menu
A widget that allows content to slide in from any side of the screen. The user can click a button to expand/collapse the content. 

It is a React-based replacement for the Dojo-based [Slide in Slide out ](https://marketplace.mendix.com/link/component/17847) widget by Rob Stricker & Joël van de Graaf.

| Menu Closed | Menu Open |  
| ------------- | ------------- |  
| ![closed](https://github.com/bsgriggs/mendix-slide-menu/blob/media/demoClosed.png)   | ![open](https://github.com/bsgriggs/mendix-slide-menu/blob/media/demoOpen.png)  |  

## Features
- Show or hide content on any side of the screen
- Control where the menu button appears for each widget
- Ability to have the widget set a string attribute to be the name of the current page ~ useful for page-dependent FAQs
- Option to have the menu automatically close when the user clicks away
- Option to have the menu automatically close when the user tabs away
- Option to have the menu open by default
- Can set the menu's open state to be set to a boolean attribute
- Option to either have the menu's DOM at the very end of the body or where the menu would be in the page structure
- Passes WCAG AA accessibility requirements according to [Axe Dev Tools](https://www.deque.com/axe/devtools/) automated testing
- Able to control the menu's length responsively

## Usage
### General
![general](https://github.com/bsgriggs/mendix-slide-menu/blob/media/general.png)  
**Tag type** - Determines the content of the button that opens the menu  
- Text - Basic text template - 'Tag text'
- Custom - A new box for content appears on the Mendix page, allowing you to put any content you want in the button, like an icon.  

**Screen side** - Determines which side of the screen the tag is fixed on.  
**Top or Bottom**, this is the menu's **Height**.  
**Center?** - When enabled, the tag is fixed to the center of the side of the screen.  
**Tag offset** - Only available if Center is set to No. Otherwise, it is an expression expected to be a valid CSS length. For screen sides **Left or Right**, this is the distance from the **Top** of the screen. For screen sides **Top or Bottom**, this is the distance from the **Left** of the screen.  

### Menu Lengths 
![menuLengths](https://github.com/bsgriggs/mendix-slide-menu/blob/media/menuLengths.png)  
CSS width for Screen Side Left or Right and height for Screen Side Top or Bottom (i.e. '30%', '10rem').  
For screen sides **Left or Right**, this is the menu's **Width**.  

There are values for Desktop, Tablet, and Phone. The Menu Length is chosen based on the browser's width.   
- width > 992px = Desktop
- width > 768px = Tablet
- else Phone
_This can be verified with `window.innerWidth` in the browser console_

### Customization 
![customization](https://github.com/bsgriggs/mendix-slide-menu/blob/media/customization.png)  
**Close on click outside** - Boolean expression that determines if the menu should automatically close when the user clicks outside of the menu  
**Close on tab outside** - Boolean expression that determines if the menu should automatically close when the user tabs outside of the menu  
**Toggle on hover** - When true, the user can open the menu by hovering their mouse on the button and close the menu by moving their mouse outside of the menu.  
**Menu state mode** - Define how to customize the open state of the menu.  
**Override open state** - (Optional) boolean expression. When the expression becomes true, the menu is forced open. False forces it to close. Can be used to make the menu open by default.  
**Open attribute** - Control the open state of the menu directly with a boolean. If the boolean is true outside the widget, the menu is opened. The widget should keep the state of this boolean up to date.  
**Debug mode** - Enables the widget's actions to be logged to the browser console  
**Use portal** - When enabled, the widget's content will be rooted at the end of the HTML. When disabled, the widget's content will be rooted where it appears on the page in Studio Pro. Consider the following when deciding which setting to use:  
- If the menu is describing something specific on the page (i.e. a list view with search criteria in the slide menu), accessibility requirements say the widget should be near the content it describes, so the setting should be false.
- If the menu is not describing something specific on the page (i.e. the menu shows the current user's account information, it is okay to leave the menu content rendering directly in the body DOM, so the setting should be true.
- The setting affects the tab order of the button to trigger the menu. When true, the button with be the last tabbable item for the page. When false, the button with be in the tab order of the widget in Studio Pro.  

#### Attributes  
**Page name** - String attribute that will be set with the name of the current page. This value can then be used to make content specific to a page (details in the 'How to use the Page Name to make a Page-Based FAQ Menu' section [below](https://github.com/bsgriggs/mendix-slide-menu/edit/master/README.md#how-to-use-the-page-name-to-make-a-page-based-faq-menu)).  
**Interval offset** - Time between each check if the page has changed. When set to 0, there is no polling.  

### Events
![events](https://github.com/bsgriggs/mendix-slide-menu/blob/media/events.png)  
**On tag click** - Action triggered when the user clicks on the button to expand or collapse the menu.  
**On click outside** - Action triggered when the user clicks on anything outside the menu (including the tag button).  
**On change** - Action triggered when the Page Name attribute's value changes.  

### Accessibility
![accessibility](https://github.com/bsgriggs/mendix-slide-menu/blob/media/accessibility.png)  
**Tag aria label** - Aria label for the button that opens or closes the menu.  
**Modal aria label** - Aria label for the content of the menu.  

### Common
![common](https://github.com/bsgriggs/mendix-slide-menu/blob/media/common.png)  
Generic settings for name, tab index, and visibility.

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

Now when you run the project, you should see the Slide Menu appearing on all pages, but it has no data. Add a button inside the Slide Menu's content so admins can create FAQs directly on the page they're on.  
The button should call a Microflow similar to the following that checks if there is already a Page object in the database with the page name, and create a new FAQ object associated with that page.  
![ACT_FAQ_New](https://github.com/bsgriggs/mendix-slide-menu/blob/media/ACT_FAQ_New.png)  
*Below is the sub-Microflow*  
![SUB_Page_CreateRetrieve](https://github.com/bsgriggs/mendix-slide-menu/blob/media/SUB_Page_CreateRetrieve.png)  

### Dojo vs React Client
Due to changes in the client API, the page name is different between Dojo and React Client.  
- Dojo clients will save the page names as `{ModuleName}.{PageName}.page.xml`
- React clients will save the page name as `{ModuleName}.{PageName}`
> [!WARNING]  
> If you are migrating between Dojo and React clients, you MUST manually convert your data and remove the '.page.xml' suffix.

### Performance
The most performant option is to have 'Close on click outside?' set to true and 'Interval offset (ms)' set to 0. This makes it so the slide menu closes when the user tries to change pages, and the page name will update when they click on the tag to re-open the menu. If you do not want the menu to close when the user changes pages, then set 'Close on click outside?' to false and 'Interval offset (ms)' to 1000 or more.


## Demo project
https://widgettesting105-sandbox.mxapps.io/p/slide-menu

## Issues, suggestions and feature requests
https://github.com/bsgriggs/mendix-slide-menu/issues

## Development and contribution

1. Install NPM package dependencies by using: `npm install`.  
2. Run `npm run dev` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.
3. When changes are complete, use `npm run lint:fix ; npm run release` to:
    - check for logical errors
    - minify the widget's code 

Benjamin Griggs

Idea from [Slide in Slide out ](https://marketplace.mendix.com/link/component/17847) widget by Rob Stricker & Joël van de Graaf 
