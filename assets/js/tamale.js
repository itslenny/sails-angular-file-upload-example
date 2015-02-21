var chorizoApp = angular.module('ChorizoApp',['bootstrap.fileField']);

chorizoApp.controller('TortillaCtrl',['$scope','$http',function($scope,$http){

    $scope.uploadFile=function(){

        if(!$scope.uploadThis){
            alert('Please select a file to upload.')
            return;
        }

        var fd = new FormData();

        //you can also send other fields
        //this will be available as req.body.title
        //NOTE: files must be added AFTER other form data
        fd.append('title', $scope.titleText);

        //nacho relates to what we called the file
        //in the api on sails
        fd.append('nacho', $scope.uploadThis);

        

        $http.post('/api/burrito', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            console.log('upload data',data);
            if(data.result){
                
                alert('file uploaded. See .tmp/uploads folder.');
            }


        })
        .error(function(err){
            alert('there was an error uploading the file.');
            console.log(err);
        });        
    }


}]);