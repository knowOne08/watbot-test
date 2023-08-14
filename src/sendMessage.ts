import { Request, Response } from "express";
import { client } from "./botIndex";

export const sendMultipleMessages =  (req:Request, res:Response) =>{

    const text = typeof req.body.text !== 'string' ? req.body.text.toString() : req.body.text; //converting to string if not
    
    const phoneNumbers = req.body.phone_numbers

    // if(!client.pupPage.isClosed()){
    if(false){
        console.log(client.pupBrowser.wsEndpoint())
        console.log("Bhul se idahr a gaya")
        sendWhatsappMessage(text,phoneNumbers).then((messageSent)=> {
            console.log(messageSent)
            if(messageSent){
               console.log("Page Closed which was already open")
            client.pupPage.close()
            console.log(client.pupBrowser.wsEndpoint())
           }
        })
    } else {
        console.log("Else mai hu")
        client.initialize
        // client.pupBrowser.newPage().then((res)=>{
        //     console.log(res)
        //     client.pupPage.goto(client.pupBrowser.wsEndpoint())
        //         .then((res)=>{
        //             console.log(res)
        //             // client.pupPage.goto(client.pupBrowser.wsEndpoint())
        //             sendWhatsappMessage(text,phoneNumbers)
        //                 .then((messageSent)=>{
        //                     console.log("Here")
        //                     console.log(messageSent)
        //                     console.log("Page Closed")
        //                     // client.pupPage.close()
        //                     client.pupBrowser.close()
        //                 })
        //         })
        // })
    }
} 

export const sendWhatsappMessage = async (text:string, phoneNumbers:string[]): Promise<boolean> => { 
    
    console.log(phoneNumbers)
    console.log(text)
    // let messageSent:boolean;
    const promises = phoneNumbers.map (async (phoneNumber)=> {
        const cleanedNumber = phoneNumber.toString().replace(/[- )(]/g, "");
        const chatId = `91${cleanedNumber.substring(cleanedNumber.length - 10)}`
        const number_details = await client.getNumberId(chatId);
        const sendToNumber = number_details?._serialized || "";
        if (sendToNumber.length > 0) {
            const message = await  client.sendMessage(sendToNumber, text) // send message
            return true
        } else {
            console.log(chatId, "Mobile number is not registered");
            return false
        }
    })
    const results = await Promise.all(promises);
    return results.every(result => result);

}