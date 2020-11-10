/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '/'+ d.getDate() +'/'+ d.getFullYear();
const urlHeader = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const urlFooter = ',us&units=metric&appid=';
const apiKey = '37b36ce4000c7679e923282b82a94786';
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
//api.openweathermap.org/data/2.5/weather?zip=85001,us&appid=685bd71bfc09cbca1c9bd72bbfe8c1cc

function ini(){
    const button = document.getElementById('generate')
    button.addEventListener('click', () => {
        const zipCode = document.getElementById('zip');
        const zipCodeValue = zipCode.value;
        const feelings = document.getElementById('feelings').value
        let feelingsValue = feelings.value;

        if (!isNaN(zipCodeValue) && !isNaN(parseInt(zipCodeValue)) && zipCodeValue.length == 5){
            zipCode.classList.remove('textError')
            if (typeof feelingsValue == 'undefined')
                feelingsValue = 'Not in a sharing mood'
            const url = urlHeader+zipCodeValue+urlFooter+apiKey;
            console.log(feelingsValue)
            getWeather(url, feelingsValue)
            
        }

        else{
            zipCode.classList.add('textError')
            if (isNaN(zipCodeValue)){
                zipCode.value = '';
                zipCode.placeholder = "Zipcode Must Be Numeric!"
            }
            else if (isNaN(parseInt(zipCodeValue))){
                zipCode.placeholder = "Required Field!"
            }
            else if (zipCodeValue.length != 5){
                zipCode.value = ''
                zipCode.placeholder = "Zipcode Must Be Five Characters Long!"
            }
        }
    });

}

const getWeather = async(url, content) => {
    const res = await fetch(url);
    try{
        const data = await res.json();
        console.log(data);
        temp = data.main.temp + '°C - ' + data.weather[0].description;
        populate(temp, content);

    } catch(error){
        console.log('Error: ' , error);
    }
}

function populate(temp, content){
    document.getElementById('date').textContent = newDate;
    document.getElementById('temp').textContent = temp;
    document.getElementById('content').textContent = content; 
}

ini();