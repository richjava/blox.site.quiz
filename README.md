# blox.site.quiz

[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100)](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Finspiring-sammet-8f8ba9.netlify.com&tab=desktop)

A [Building Blox](https://github.com/Building-Blox/building-blox) informational/brochure site that includes a quiz.

## Features
- Quiz with wizard-like interface
- Save email to Google Sheets document functionality
- Bio section with light & dark theme
- Newsletter signup
- Resources download section & page

## Dependencies
- Bootstrap
- jQuery

## Type
Informational/Brochure

## Blocks
### Pages
- home [blox.page.home.quiz]()
- about [blox.page.about.quiz]()
- resources [blox.page.resources.quiz]()
- admin - [blox.page.admin]()

### Packages
#### Page packages
- quiz [blox.package.quiz.quiz]()

#### Partial packages
- navigation [blox.partial-package.navigation]()
- resources [blox.partial-package.resources]()
- social [blox.partial-package.social]()

#### Component packages
- about [blox.component-package.about]()

### Lambdas
- google-sheets [blox.lambda.google-sheets.quiz]

## Installation
### 1. Use this template (click the green "Use this template" button) or,
#### Clone this repository
Make sure to include the ```--recursive``` flag so that all the submodules ("blocks") will be cloned too.
```
git clone https://github.com/richjava/blox.site.quiz.git --recursive

cd building-blox
```

### 2. Install packages
```
npm install
```

NOTE: building-blox.js library is not an NPM package yet so to run the project, you'll need to run:

````
cd building-blox.js
````
````
npm link
````
````
cd ..
````
````
npm link building-blox
````

### 3. Run the development server
```
npm run dev
```
The website will be viewable at http://localhost:3000. On save of the project, output will be built to the "dist" directory and the website will be reloaded.
