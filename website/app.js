/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function ini(){
    const button = document.getElementById('generate')
    button.addEventListener('click', () => {
        console.log('Button was clicked');
        const zipCode = document.getElementById('zip');
        const zipCodeValue = zipCode.value;
        const feelings = document.getElementById('feelings').value
        var feelingsValue = feelings.value;
        
        if (!isNaN(zipCodeValue) && !isNaN(parseInt(zipCodeValue))){
            console.log(`User entered ${zipCodeValue} into the Zipcode field`);
            console.log(`User feels like ${feelingsValue}`)
            zipCode.classList.remove('textError')
            if (typeof feelingsValue != 'undefined')
                feelingsValue = 'Not in a sharing mood'
        }

        else{
            console.log('Invalid Input Detected')
            if (isNaN(zipCodeValue)){
                console.log("Inside Invalid Zip else condition")
                zipCode.value = "";
                zipCode.placeholder = "Zipcode must be a numeric!"
                zipCode.classList.add('textError')
            }

            if (isNaN(parseInt(zipCodeValue))){
                console.log('inside epty zip else condition')
                zipCode.placeholder = "Required Field!"
                zipCode.classList.add('textError')
            }

        }
    });

}

ini();