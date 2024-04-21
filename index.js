/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from'qr-image';
import { createWriteStream } from 'node:fs';
import { writeFile } from 'node:fs';
inquirer
  .prompt([{
       /* Pass your questions in here */
    "message":"type the URL to convert to QR-code",
    "name":"url"
  }
 
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    // console.log(answers)
    //create qr-code
    var qr_png = qr.image(answers.url);
    qr_png.pipe(createWriteStream('url-qr.png'));
    
    //save the url into a file
    writeFile('url.txt', answers.url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });