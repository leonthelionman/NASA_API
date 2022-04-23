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
        // console.log(data)
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
  getRandomDate();
  load_data()
  $( ".load-button" ).click()
};


// Load date from saved list
const container = document.querySelector('#myTable'); // Adding clicks to all of the generated table
container.addEventListener('click', function (e) {
  // But only run for elements that have load class button
$( ".load-button" ).click(function() {  
  findLoadClickRow()
});
});

//Find the row the load data click was on
function findLoadClickRow(){
  console.log("in first");
  var buttons = document.getElementsByClassName("load-button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      buttonsControl(this, i);
    }, false);
  }

  function buttonsControl(button, i) {
    let date_table = JSON.parse(localStorage.getItem('date_table'));
    let choice = date_table[i]
    getFetch(choice)
  }
}

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

  addRowToTable(date_to_save)
  // https://stackoverflow.com/questions/47686544/save-variable-into-localstorage
}

//Add new row to loaded page
function addRowToTable(date_saved){
    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    
    // Insert a cell at the end of the row
    var loadCell = newRow.insertCell();
    var dateCell = newRow.insertCell();
    var clearCell = newRow.insertCell();
    // load saved date
    var load = document.createElement('button');
    load.classList.add('load-button')
    load.setAttribute('type', 'button');
    load.innerText = 'Load Date';
    loadCell.appendChild(load);

    // Append date cell
    var date = document.createElement('input');
    date.classList.add('form-control')
    date.setAttribute("value", date_saved);
    dateCell.appendChild(date);

    // Create Clear Button 
    var btn = document.createElement('button');
    btn.classList.add('alert-button')
    btn.innerText = 'Clear Date';
    clearCell.appendChild(btn);
}

//Load Data
function load_data(){
  let date_table = JSON.parse(localStorage.getItem('date_table'));
  for (i = 0; i < (date_table.length); i +=1) {

    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    
    // Insert a cell at the end of the row
    var loadCell = newRow.insertCell();
    var dateCell = newRow.insertCell();
    var clearCell = newRow.insertCell();
    // load saved date
    var load = document.createElement('button');
    load.classList.add('load-button')
    load.setAttribute('type', 'button');
    load.innerText = 'Load Date';
    loadCell.appendChild(load);

    // Append date cell
    var date = document.createElement('input');
    date.classList.add('form-control')
    date.setAttribute("value", date_table[i]);
    dateCell.appendChild(date);

    // Create Clear Button 
    var btn = document.createElement('button');
    btn.classList.add('alert-button')
    btn.innerText = 'Clear Date';
    clearCell.appendChild(btn);
  }
}


// Clear button 
// Adding "Clear Row" button for each book line
// Click handler for entire Table
container.addEventListener('click', function (e) {
// But only run for elements that have an alert-button class
    $( ".alert-button" ).click(function() {
      $(this).closest('tr').remove()
      save_data_after_clear()
    });
});

  //Save data
function save_data_after_clear(){
  let date_table = []
  $('.form-control').each(function() { date_table.push( $(this).val() )});
  localStorage.setItem('date_table', JSON.stringify(date_table));
}
