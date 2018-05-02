const express = require("express")
const port = process.env.PORT || 3000; 
var app = express();
var unixTime = require('unix-time');
let date = require('date-and-time');
var date3 = require('unix-date');
 var reg = /\/((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*([,-]|\%20)*[0-3]{0,1}[0-9]|[0-3]{0,1}[0-9]([,-]|\%20)*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)([,-]|\%20)*\d{4}|\/[0-9]{1,13}\b/i
 
app.get("/", (req, res)=>{
      
 //res.send(val)
 res.sendFile(__dirname + '/index.html')

 
});
app.get(reg, (req, res)=>{
   var date2 = req.originalUrl
    
    //var d = new Date(hello)
    //var e = d.getYear()
      //   console.log("hooll");

 var regex = /([0-3]{0,1}[0-9])((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)(\d{4}\b)/gi;  
var regex2 = /((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)([0-3]{0,1}[0-9])(\d{4}\b)/gi; 
var regex3 = /\b[0-9]{1,16}\b/gi;  
 
  date2 = date2.replace(/jan[a-z]*/gi, "January")
  .replace(/feb[a-z]*/gi, "February")
  .replace(/mar[a-z]*/gi, "March")
  .replace(/apr[a-z]*/gi, "April")
  .replace(/may[a-z]*/gi, "May")
  .replace(/jun[a-z]*/gi, "June")
  .replace(/jul[a-z]*/gi, "July")
  .replace(/aug[a-z]*/gi, "August")
  .replace(/sep[a-z]*/gi, "September")
  .replace(/oct[a-z]*/gi, "October")
  .replace(/nov[a-z]*/gi, "November")
  .replace(/dec[a-z]*/gi, "December")
  .replace(/[-]/g, "")
  .replace(/[/]/g, "") 
  .replace(/[,]/g, "") 
  .replace(/%\d{2}/g, "") 
  var truth = regex.test(date2)
  var truth2 = regex2.test(date2)
  var truth3 = regex3.test(date2)
  if(truth3){
    var yes = date3.parseDay(Number(date2)*1000) 
    res.send({"unix": Number(date2),  "natural":yes})  
}
else if(truth2){
  var yes =date2.replace(regex2, "$1 $3, $4")
  var a =unixTime(new Date(yes))-18000 //5 hr local time difference 
  res.send({"unix": a,  "natural":yes })
} 
else {
  

  var yes =date2.replace(regex, "$2 $1, $4") 
  var a =unixTime(new Date(yes))-18000//5 hr local time difference 
  res.send({"unix": a,  "natural":yes})
}


// var c = date3.parseDay(525278000000)  
// var b = new Date(1421038800000); 
//  var a =unixTime(new Date(yes))            // => (Jan 1 1970 15:14:05 GMT-0800)
//   res.send({"unix": a,  "natural":yes, test:c})
})
app.get("/"+!reg, (req, res)=>{
    res.send({error:"error"})
})

app.listen(3000, ()=>{`Running app.js in ${port}`})
