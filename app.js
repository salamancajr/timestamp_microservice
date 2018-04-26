const express = require("express")
const port = process.env.PORT || 3000; 
var app = express();

 var reg = /\/(((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*([,-]|\%20)*[0-3]{0,1}[0-9]|[0-3]{0,1}[0-9]([,-]|\%20)*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)([,-]|\%20)*\d{4}|\/[0-9]{1,13})\b/i
 
app.get("/", (req, res)=>{
      
 //res.send(val)
 res.sendFile(__dirname + '/index.html')

 
});
app.get(reg, (req, res)=>{
   var date = req.originalUrl
    
    //var d = new Date(hello)
    //var e = d.getYear()
      //   console.log("hooll");

 var regex = /([0-3]{0,1}[0-9])(([,-]|\%20)*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-1][0-9])[a-z]*)(([,-]|\%20)*\d{4}\b)/;  
   var truth = regex.test(date)
  var yes =date.replace(regex, "$2, $1 $5")  
  var hello = yes.replace(/[-]/g, "").replace(/[/]/g, "").replace(/jan[a-z]*/gi, "January") 
  res.send({"Date":truth, "unix": null,"natural":hello})
})
app.get("/"+!reg, (req, res)=>{
    res.send({error:"error"})
})

app.listen(port, ()=>{`Running app.js in ${port}`})
