import {v2 as cloudinary} from 'cloudinary'
import { log } from 'console';
import fs from "fs"
import { loadEnvFile } from 'process';
import { signUp } from '../controllers/user.controllers.js';


// this config helps in uploading file 

//LocalFilePath= local file path for uploding

// uploading file will take time so we will use await


    const uploadOnCloudinary= async (localFilePath) =>{
        cloudinary.config({ 
cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
api_key: process.env.CLOUDINARY_API_KEY, 
api_secret: process.env.CLOUDINARY_API_SECRET ,
secure:true// Click 'View API Keys' above to copy your API secret
});

        //cloudinary.config () is ou are re-configuring Cloudinary every single time a 
        // user uploads a file. This is inefficient and can slow down your server.





        try{
            if(!localFilePath) return null;
           // uploader
           const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
           })
           //file uploaded successfully
           //resourceType-> which type of file we are uploading
           // for checking does file is uploaded successfully
        // checking the file->   console.log('File is uloaded successfull', response.url);
        //we should print response for better knowledge not only url 
        //-> after uploading the file to cloudinary we unlink the file from the folder
        // sync-> we use sync for waiting until its gets finished
        // agr file successfuly upload hogya hai toh remove agr error toh v remove hojyega 
       if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return response // ye response user ko bhej dia jayega
           
        }
        // jo v cloudinary pe uplaod kr rha hai ...iska mtlab server pe file hai 
        // for a safe cleaning purpose uss file ko server par se hata dena chaiye
        // wrna bhut saare courupted file reh jyega 
        // so we use fs.unlinksync - unlink hona hi chaiye usske baad hi aage ka process

        catch (error){
            fs.unlinkSync(localFilePath) // remove the locally saved temporary file
            // as the upload operatio got failed

            return null ;
        }
    }

    export {uploadOnCloudinary}