# Selenium Webdriver Automated Screenshots

Utility to capture a sequence of screenshots from a website.

## Configuration

* Run `npm install` to install required components
* Edit the file `example.json` to create your own configuration:

```json
{
    "folder" : "screenshots",
    "baseurl" : "https://www.google.com",
    "width": 1024,
    "height": 768,
    "headless": false,
    "pages" : [
        {
            "url" : "/",
            "tag" : "textarea",
            "filename" : "home"
        }
    ]
}
```

### Base configration

* `folder` : Subfolder to store the screenshots (it should be created manually)
* `baseurl` : A base url to use for pages. If pages are from different base URLs, leave this blank.
* `width` and `height`: Setup the initial size of the window
* `headless` Run chromedriver in headless mode 
* `pages` a list of page configurations to perform operations.

### Pages configuration

Each entry on `pages` can define the following attributes:

* `url` : Mandatory. The relative url (if `baseurl` is used) or the absolute URL of the page
* `tag` : Optional. Wait for a certain tag name to appear before taking a screenshot
* `id` : Optional. Wait for a specific element ID to appear before taking a screenshot
* `xpath` : Optional. Wait for a specific XPATH ID to appear before taking a screenshot
* `filename`: Optional. Name of the screenshot file being created (without extension). If no filename is set, screeenshots will be named as numbers (1,2,3) folowwing the page sequence.

## Running the process

Run from a console window with `node index.js` or `npm run start`


