import { Request, Response } from "express";
import { client } from "./botIndex";

export const sendMultipleMessages =  async (req:Request, res:Response) =>{

    const text = typeof req.body.text !== 'string' ? req.body.text.toString() : req.body.text; //converting to string if not
    
    const phoneNumbers = req.body.phone_numbers
    
    // console.log(client.pupPage)
    if(!client.pupPage){
        console.log("First initilization")
        // client.initialize() 
        // client.getState().then((res)=> console.log(res))()
        await client.initialize()
        console.log({text,phoneNumbers})
        sendWhatsappMessage(text,phoneNumbers)
            .then((messageSent)=> {
                console.log(messageSent)
                if(messageSent){
                    setTimeout(async () => {
                        console.log("10 minutes passed and Client Closed")
                        // client.pupPage.close()
                        await client.destroy()
                        // console.log(client.pupPage)
                    }, 10 * 60 *1000);
                } else {
                    
                    console.log("Message not send")
                }
                res.json({
                    messageSent
                })
            })
    } else if(client.pupPage.isClosed()) {
        console.log("It is not closed")
        await client.initialize() 
        sendWhatsappMessage(text,phoneNumbers)
            .then((messageSent)=> {
                
                console.log(messageSent)
                if(messageSent){
                    setTimeout(async () => {
                        console.log("10 minutes passed and Client Closed")
                        // client.pupPage.close()
                        await client.destroy()
                        console.log(client.pupPage)
                    }, 10 * 60 *1000);
                } else {
                    console.log("Message not send")
                }
                res.json({
                    messageSent
                })
            })
    } else  {
        console.log({text,phoneNumbers})
        sendWhatsappMessage(text,phoneNumbers)
        .then((messageSent)=> {
            console.log(messageSent)
            if(messageSent){
                setTimeout(async () => {
                    console.log("10 seconds passed and Client Closed")
                    await client.destroy()
                }, 10 * 60 *1000);
            }else {
                console.log("Message not send")
            }
            res.json({
                messageSent
            })
        })
    }

    // if(client.pupPage){
    //     if(client.pupPage.isClosed()){
    //         client.initialize()
    //         client.on('ready', ()=>{
    //             // console.log("Ready")
    //             sendWhatsappMessage(text,phoneNumbers).then((messageSent)=>{
    //                 if(messageSent){
    //                     console.log("Whatsapp message sent")
    //                 } else {
    //                     console.log("Message not sent")
    //                 }
    //             })
    //         })
    //     } else {
    //         sendWhatsappMessage(text,phoneNumbers).then((messageSent)=>{
    //             if(messageSent){
    //                 console.log("Whatsapp message sent")
    //             } else {
    //                 console.log("Message not sent")
    //             }
    //         })
    //     }
    // } else {
    //     console.log("Not initialised")
    //     client.initialize()
    //     client.on('ready', ()=>{
    //         console.log("Ready")
    //         sendWhatsappMessage(text,phoneNumbers).then((messageSent)=>{
    //             if(messageSent){
    //                 console.log("Whatsapp message sent")
    //             } else {
    //                 console.log("Message not sent")
    //             }
    //         })
    //     })
    // }

} 

export const sendWhatsappMessage = async (text:string, phoneNumbers:string[]): Promise<boolean> => { 
    // console.log(text)
    // console.log("Idhar kaise pohoh gaya ?")
    const promises = phoneNumbers.map (async (phoneNumber)=> {
        const cleanedNumber = phoneNumber.toString().replace(/[- )(]/g, "");
        const chatId = `91${cleanedNumber.substring(cleanedNumber.length - 10)}`
        console.log(chatId)
        const number_details = await client.getNumberId(chatId);
        const sendToNumber = number_details?._serialized || "";
        if (sendToNumber.length > 0) {
            const message = await client.sendMessage(sendToNumber, text) // send message
            // console.log(message)
            return true
        } else {
            console.log(chatId, "Mobile number is not registered");
            return false
        }
    })
    const results = await Promise.all(promises);
    return results.every(result => result);

}