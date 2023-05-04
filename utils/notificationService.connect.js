var Client = require('node-rest-client').Client;

var client = new Client();
const sendNotificationMail = (subject,content,recipientEmails,requestor,ticketId)=>{
 // set content-type header and data as json in args parameter
const reqBody = {
    subject,content,recipientEmails,requestor,ticketId
}
console.log(reqBody)
var args = {
	data: reqBody,
	headers: { "Content-Type": "application/json" }
};

client.post("http://localhost:5001/notificationService/api/vi/createTicNotification", args, function (data, response) {
	// parsed response body as js object
	console.log(data);
	// raw response
	console.log(response);
});
}

module.exports = {sendNotificationMail}