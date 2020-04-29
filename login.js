// Return a random number between 1 and 10:
//Math.floor((Math.random() * 10) + 1);
const RANDOMSTRING = "!@#$%^&*()_+1234567890-=qwertyuiop[]\asdfghjkl;zxcvbnm,./{}|:<>?QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

function newDate(){
  document.getElementById("errorMessage").innerHTML = "";
  
  let month = Math.floor((Math.random() * 12) + 1);
  let day;
  if(month == 2){
     day = Math.floor((Math.random() * 29) + 1);
  } else if(month == 4 || month == 6 || month == 9 || month == 11){
    day = Math.floor((Math.random() * 30) + 1);
  } else {
    day = Math.floor((Math.random() * 31) + 1);
  }
  
  document.getElementById("day").innerHTML = day;
  document.getElementById("month").innerHTML = month;
  document.getElementById("year").innerHTML = Math.floor((Math.random() * (2020 - 1900)) + 1900);
}

function newUsername(){
  document.getElementById("errorMessage").innerHTML = "";
  let len = Math.floor((Math.random() * (12 - 2)) + 2);
  let output = "";
  for(var i = 0; i < len; i++){
    let x = Math.floor((Math.random() * RANDOMSTRING.length));
    output += RANDOMSTRING[x];
  }
  document.getElementById("username").innerHTML = output;
}

function newPassword(){
  document.getElementById("errorMessage").innerHTML = "";
  let len = Math.floor((Math.random() * (20 - 5)) + 5);
  let pass = "";
  for(var ii = 0; ii < len; ii++){
    let x = Math.floor((Math.random() * RANDOMSTRING.length));
    pass += RANDOMSTRING[x];
  }
  let output = "";
  for(var iii = 0; iii < pass.length; iii++){
    output += "*"
  }
  document.getElementById("password").innerHTML = output;
}

function login(){
  document.getElementById("day").innerHTML = "";
  document.getElementById("month").innerHTML = "";
  document.getElementById("year").innerHTML = "";
  document.getElementById("username").innerHTML = "";
  document.getElementById("password").innerHTML = "";
  document.getElementById("errorMessage").innerHTML = "failed sign in";
}