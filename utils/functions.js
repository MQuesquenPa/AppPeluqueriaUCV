export const generateFileName=(val)=>{
    return  val.split('/').pop();
}
  
export const generateType=(val)=>{
    let match = /\.(\w+)$/.exec(val);
    if(match==="mp4"){
        return match ? `video/${match[1]}` : `video`;
    }else{
        return match ? `image/${match[1]}` : `image`;
    }    
}