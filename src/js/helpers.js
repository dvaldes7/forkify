import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJSON = async(url)=>{
    try {
        const resp = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
        const data = await resp.json();
        if(!resp.ok) throw new Error(`${data.message} ${resp.status}`)
        return data;
        
    } catch (error) {
        throw error;
    }
}

export const sendJSON = async(url,json)=>{
  try {
    console.log(json);
      const request = fetch(url,{
        headers : { "content-type" : "application/json"},
        method : "POST",
        body : JSON.stringify(json)
      });
      const resp = await Promise.race([request,timeout(TIMEOUT_SEC)]);
      const data = await resp.json();
      if(!resp.ok) throw new Error(`${data.message} ${resp.status}`)
      return data;
      
  } catch (error) {
      throw error;
  }
}