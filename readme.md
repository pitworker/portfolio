# Swan's Portfolio

This is the source code for the current iteration of my portfolio. The site is primarily written with React, and all content for documented work is loaded from Markdown files.

## License

This repository uses a mixed license. Most of the source code[^1] is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). The content and visual design choices[^2] are licensed under the [Creative Commons Attribution NonCommercial ShareAlike 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. The typefaces[^3] retain their original [SIL Open Font License 1.1](https://scripts.sil.org/cms/scripts/page.php?item_id=OFL_web). Any linked or embedded content (such as YouTube and Vimeo videos) retains its original license and falls outside of the licensing of this project. **All content** (images, text, videos, etc) related to collaborative and professional projects[^4] falls outside this licensing, and, unless otherwise stated, **full copyright** is maintained by myself and my collaborators, and/or any clients or employers.

[^1]: "Source code" is defined here as all HTML, Markdown outside of the `./public/content/` directory, NodeJS and React configuration files, and JavaScript code exclusive of any embedded titles, headers, body text, or captions within the page layouts in the `./src/pages/` directory.

[^2]: "Content and visual design choices" is defined here as all images, titles, headers, body text, or captions (both standalone and enclosed within JavaScript files in the `./src/pages/` directory), CSS code, and all Markdown files located within the `./public/content/` directory.

[^3]: "Typefaces" are defined here as all files located within the `./src/fonts/` directory.

[^4]: "Collaborative and professional projects" are defined here as ALL files located within the following directories:
  `./public/content/cloud-next-postcards`
  `./public/content/doodles-nftnyc`
  `./public/content/gml-pinball`
  `./public/content/google-woogle`
  `./public/content/highmark-hig`
  `./public/content/jen-ai`
  `./public/content/lollipop-licker`
  `./public/content/moderation-workstation`
  `./public/content/zooid`
  `./public/content/zobits`

## Running the app

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.