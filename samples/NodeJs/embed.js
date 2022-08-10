var fs = require("fs");
var http = require("https");
var url = require("url");
var express = require('express');
var app = express();
var bytes = require('utf8-bytes');
var crypto = require('crypto');


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static('assets'));

var appconfig = JSON.parse(fs.readFileSync('embedConfig.json'));
// Get the embedSecret key from Bold BI
var embedSecret = appconfig.EmbedSecret;

var configjson ={"DashboardId": appconfig.DashboardId, "ServerUrl":appconfig.ServerUrl, "SiteIdentifier": appconfig.SiteIdentifier, "Environment" : appconfig.Environment};
	
//Enter your BoldBI credentials here
var userEmail = appconfig.UserEmail;



app.post('/embeddetail/get', function (req, response) {
  var embedQuerString = req.body.embedQuerString;
  var dashboardServerApiUrl = req.body.dashboardServerApiUrl;
 

  embedQuerString += "&embed_user_email=" + userEmail;
  var embedSignature = "&embed_signature=" + GetSignatureUrl(embedQuerString);
  var embedDetailsUrl = "/embed/authorize?" + embedQuerString+embedSignature;
  

  http.get(dashboardServerApiUrl+embedDetailsUrl, function(res){
        var str = '';
        res.on('data', function (chunk) {
               str += chunk;
         });
        res.on('end', function () {
             response.send(str);
        });
  });
})

function GetSignatureUrl(queryString)
{
  var keyBytes = Buffer.from(embedSecret);
  var hmac = crypto.createHmac('sha256', keyBytes);
  data = hmac.update(queryString);
  gen_hmac= data.digest().toString('base64');

return gen_hmac;
}

app.get("/",function (request, response) {

  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");

  response.writeHead(200);

  if(pathname == "/") {
      html = fs.readFileSync("samples/NodeJs/index.html", "utf8");
	    html=html.replace("<script>","<script>var configjsonstring='"+JSON.stringify(configjson)+"';var configjson=JSON.parse(configjsonstring);");
      response.write(html);
  }
  response.end();
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
