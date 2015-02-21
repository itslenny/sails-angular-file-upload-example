#Sails Angular File Upload

This app is a quick and simple example of doing file uploads using sails and angular.

##Backend (Sails)

Sails uses Skipper to handle it's file uploads. Skipper is an express middleware that can be used in non-sails express projects too. It is a drop in replacement for body-parser or multer.

Skipper can also upload directly to S3 or other file services.

####Setup

To accept an upload from angular we create a REST endpoint (route) for uploading the file. The route is added to `config/route.js` and points to an action in a controller that uses skipper's `req.file().upload()` method to accept the upload.

```javascript
req.file('nacho').upload(function(err,files){
    //do something with the uploaded file here
    //and res.send() a response
});
```

####Usage / testing

You can test your new upload end point using Postman by doing a POST to the route you defined. For the form data you can change the type from "text" to "file" and upload a file directly from postman.

####Reference
* [Sails file upload docs](http://sailsjs.org/#!/documentation/concepts/File-Uploads)
* [Skipper home page](https://github.com/balderdashy/skipper)


##Frontend (angular)

The angular part of the equation is fairly simple and is essentially the same as sending any form data to the server. First, we have to get the value of the file input field. Then, we have to send the data to the server using `$http`, but both parts are slightly different when dealing with file uploads.

####Getting file field value

Usually, it's simple to get the value of a form element using `ng-model`, but file fields are the exception as they do not support `ng-model`.

To overcome this we can do something like what is outlined in this [stack overflow answer](http://stackoverflow.com/a/17923521/3068157).


OR use a directive such as [angular-bootstrap-file-field](https://github.com/itslenny/angular-bootstrap-file-field).

As long as we can get the file element in our `$scope` we're good to go.


####Sending data to the backend

So, we have our form data and our backend route created and tested (using postman) so now all we have to do is send the data to the route.

Files must be sent as [multi-part form data](http://stackoverflow.com/a/4526286/3068157) to create this in javascript we use the [FormData() Constructor](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and append the file and any other data then send the object with `$http.post()` just like any other request.

```javascript
var fd = new FormData();
fd.append('nacho', $scope.fileToUpload);

$http.post('/api/burrito', fd, {
    transformRequest: angular.identity,
    headers: {'Content-Type': undefined}
})
.success(function(data){
    alert('file upload successful');
})
.error(function(err){
    alert('there was an error uploading the file.');
    console.log(err);
}); 
```

####Multiple file upload



[angular-file-upload](https://github.com/nervgh/angular-file-upload) is A great directive that handles queuing multiple file uploads with progress, but is a bit much if you only need to upload a single file.
