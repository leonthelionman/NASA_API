//fetch data from NASA API
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
       
        localStorage.setItem('current_date', data.date);

        document.querySelector('h3').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Random date generator
document.querySelector('#getRandom').addEventListener('click', getRandomDate)


function getRandomDate() {
  startDate = new Date(1996,0,1);
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


// Random picture generation on loadup
window.onload = function() {
  console.log("Working on page load")
  getRandomDate();
  load_data()
};


// Save Dates
document.querySelector('#saveDatetoTable').addEventListener('click', save_data)
function save_data(){
  let date_table = [];
  if (localStorage.getItem("date_table") != null) {
    date_table = JSON.parse(localStorage.getItem('date_table'));
  }
  let date_to_save = localStorage.getItem('current_date');
  date_table.push(date_to_save);
  localStorage.setItem('date_table', JSON.stringify(date_table));
  // https://stackoverflow.com/questions/47686544/save-variable-into-localstorage
}



//Load Data
function load_data(){
  let date_table = JSON.parse(localStorage.getItem('date_table'));
  for (i = 0; i < (date_table.length); i +=1) {

    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    
    // Insert a cell at the end of the row
    var dateCell = newRow.insertCell();
    var clearCell = newRow.insertCell();

    // Append date cell
    var date = document.createElement('input');
    date.setAttribute("value", date_table[i]);
    dateCell.appendChild(date);

    // Create Clear Button 
    var btn = document.createElement('button');
    btn.classList.add('alert-button')
    btn.innerText = 'Clear Row';
    clearCell.appendChild(btn);
  }
}


// Clear button 
// Adding "Clear Row" button for each book line
const container = document.querySelector('#myTable');
// Click handler for entire Table
container.addEventListener('click', function (e) {
// But only run for elements that have an alert-button class
    $( ".alert-button" ).click(function() {
      $(this).closest('tr').remove()
    });
});
