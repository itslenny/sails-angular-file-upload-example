/**
 * TacoController
 *
 * @description :: Server-side logic for managing Tacoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

//Taco Controller aka ANY controller
module.exports = {

    //POST /burrito
    //torta action... aka upload file action
    torta:function(req,res){

        console.log('form body',req.body);

        //accepts upload and moves it to .tmp/uploads
        req.file('nacho').upload(function(err,files){

            //if there was an error
            //stop here and tell the frontend
            if(err) return res.send(400,{result:false,error:err});

            //if the file didn't upload for some reason
            //stop here and tell the frontend
            if(!files) return res.send(400,{result:false,error:'Unable to upload file'});
            

            console.log('file data',err,files);
            // files is an array of the files that were uploaded
            // files[0].fd = file path to first uploaded file
            // see console for more info



            //move file to cloudinary or something
            console.log('uploaded file path',files[0].fd)



            //send response

            //result:true -- file upload successful
            //files:files -- send uploaded file data to the front end
            res.send({result:true,files:files});

            
        });
    }
};

