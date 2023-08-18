import { Request, Response } from "express";
import { client } from "./botIndex";

export const startClient = async (req:Request, res: Response) => {
    console.log("initlaizing ping")
    // client.initialize()
    
    if(client.pupPage){
        if(client.pupPage.isClosed()){
            console.log(" client initlaizing ping 1")
            
            await client.initialize()
        } 
    } else  {
        console.log(" client initlaizing ping 2")
        await client.initialize()
    }
}