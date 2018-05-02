const express = require("express")
const port = process.env.PORT || 3000;
var app = express();
var unixTime = require('unix-time');
let date = require('date-and-time');
var date3 = require('unix-date');
var reg = /\/((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*([,-]|\%20)*[0-3]{0,1}[0-9]|[0-3]{0,1}[0-9]([,-]|\%20)*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)([,-]|\%20)*\d{4}|\/[0-9]{1,13}\b/i

app.get("/", (req, res) => {

  res.sendFile(__dirname + '/index.html')


});
app.get(reg, (req, res) => {
  var date2 = req.originalUrl


  date2 = date2.replace(/[/]/g, "")
  var regex = /([0-3]{0,1}[0-9])((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)(\d{4}\b)/gi;
  var regex2 = /((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)([0-3]{0,1}[0-9])(\d{4}\b)/gi;
  var regex3 = /^[0-9]{1,16}$/gi;

  var truth3 = regex3.test(date2)

  if (truth3) {

    var yes = date3.parseDay(Number(date2) * 1000)
    res.send({
      "unix": Number(date2),
      "natural": yes
    })
  }

  date2 = date2
    .replace(/^[0]*1([-,]|%\d{2})+(?=[0-9])|jan[a-z]*/gi, "January")
    .replace(/^[0]*2([-,]|%\d{2})+(?=[0-9])|feb[a-z]*/gi, "February")
    .replace(/^[0]*3([-,]|%\d{2})+(?=[0-9])|mar[a-z]*/gi, "March")
    .replace(/^[0]*4([-,]|%\d{2})+(?=[0-9])|apr[a-z]*/gi, "April")
    .replace(/^[0]*5([-,]|%\d{2})+(?=[0-9])|may[a-z]*/gi, "May")
    .replace(/^[0]*6([-,]|%\d{2})+(?=[0-9])|jun[a-z]*/gi, "June")
    .replace(/^[0]*7([-,]|%\d{2})+(?=[0-9])|jul[a-z]*/gi, "July")
    .replace(/^[0]*8([-,]|%\d{2})+(?=[0-9])|aug[a-z]*/gi, "August")
    .replace(/^[0]*9([-,]|%\d{2})+(?=[0-9])|sep[a-z]*/gi, "September")
    .replace(/^10([-,]|%\d{2})+(?=[0-9])|oct[a-z]*/gi, "October")
    .replace(/^11([-,]|%\d{2})+(?=[0-9])|nov[a-z]*/gi, "November")
    .replace(/^12([-,]|%\d{2})+(?=[0-9])|dec[a-z]*/gi, "December")
    .replace(/[-]/g, "")
    .replace(/[,]/g, "")
    .replace(/%\d{2}/g, "")


  var truth = regex.test(date2)
  var truth2 = regex2.test(date2)


  if (truth2) {

    var yes = date2.replace(regex2, "$1 $3, $4")
    var a = unixTime(new Date(yes)) - 18000 //5 hr local time difference 
    res.send({
      "unix": a,
      "natural": yes
    })
  } else {

    var yes = date2.replace(regex, "$2 $1, $4")
    var a = unixTime(new Date(yes)) - 18000 //5 hr local time difference 
    res.send({
      "unix": a,
      "natural": yes
    })
  }
})
app.get("/" + !reg, (req, res) => {
  res.send({
    error: "error"
  })
})

app.listen(port, () => {
  `Running app.js in ${port}`
})