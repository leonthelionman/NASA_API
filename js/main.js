//Example fetch using pokemonapi.co
document.querySelector('#getPicDate').addEventListener('click', getInput)

function getInput(){
  const choice = document.querySelector('input').value
  getFetch(choice)
}
function getFetch(choice){

  const url = `https://api.nasa.gov/planetary/apod?api_key=zU71SV2z8UAS2tpSRxtx9Ii4giGUAk6QIufK4bCn&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if( data.media_type === 'image' ){
          document.querySelector('#NASApic').src = data.hdurl
        }else if(data.media_type === 'video'){
          document.querySelector('iframe').src = data.url
        }
       
        document.querySelector('h3').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Random date generator
document.querySelector('#getRandom').addEventListener('click', getRandomDate)


function getRandomDate() {
  startDate = new Date(1990,0,1);
  endDate = new Date(2020,11,31);
  const minValue = startDate.getTime();
  const maxValue = endDate.getTime();
  const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  const date = new Date(timestamp)
  formatDate(date)
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  const choice = [year, month, day].join('-');
  getFetch(choice)
}
