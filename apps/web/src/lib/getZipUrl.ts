import JSZip from "jszip";
import axios from "axios";
import { BACKEND_URL, CLOUDFLARE_OBJECT_KEY } from "./config";

export async function getZipUrl(files: File[]) {
  const zip = new JSZip();
  try{
    const res = await axios.get(`${BACKEND_URL}/pre-signed-url`);
    const url = res.data.url;
    const key = res.data.key;
    
    if(files.length > 0){
        for(const file of files){
            const content = file.arrayBuffer();
            zip.file(file.name, content);
        }
        const content = await zip.generateAsync({type: "blob"});
        const formData = new FormData();
        formData.append("file", content);
        const response = await axios.put(url, formData);
        if(response.status === 200){
            console.log("Zip file uploaded successfully");
            console.log("Zip file url", `${CLOUDFLARE_OBJECT_KEY}/${key}`);
            return `${CLOUDFLARE_OBJECT_KEY}/${key}`;
        }
    }
  }catch(e){
    console.log("Error uploading zip file", e);
  }
  return "";
}