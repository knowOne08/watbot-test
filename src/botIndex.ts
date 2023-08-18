import { Client, LocalAuth, Message} from "whatsapp-web.js";
import { Request, Response } from "express";
import qrcodecanvas from "qrcode"
import { sendWhatsappMessage } from "./sendMessage";
// import { dailyVoucherUpdateMessage } from "./utils/dailyMessageUpdate";
// import { mailTransporter } from "../config/mailConfig";


export const client = new Client({
    authStrategy: new LocalAuth({clientId: "Yash-test"}),
    puppeteer: {
        headless: true, 
        args: [
            '--log-level=3', // fatal only
            '--start-maximized',
            '--no-default-browser-check',
            '--disable-infobars', 
            '--disable-web-security',
            '--disable-site-isolation-trials',
            '--no-experiments',
            '--ignore-gpu-blacklist',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--disable-gpu',
            '--disable-extensions',
            '--disable-default-apps',
            '--enable-features=NetworkService',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', 
        ]
    }
});


export const showQr = (req: Request, res: Response) => {
    
    if(client.pupPage){
            try {
                client.initialize()
                client.on('qr', async (qr)=>{
                    console.log('qr created !')
                    let qrUrl = await qrcodecanvas.toDataURL(qr)
                    if (qrUrl) {
                        res.send(`
                            <img src="${qrUrl}"/>
                        `);
                    } else {
                        res.send(`
                            <p>Loading QR code...</p>
                        `);
                    }
                })
                } catch (error) {
                    console.log(error);
                }
    } else {
        try {
            
            client.on('qr', async (qr)=>{
                console.log('qr created !')
                let qrUrl = await qrcodecanvas.toDataURL(qr)
                if (qrUrl) {
                    res.send(`
                        <img src="${qrUrl}"/>
                    `);
                } else {
                    res.send(`
                        <p>Loading QR code...</p>
                    `);
                }
            })
            client.initialize()
            } catch (error) {
                console.log(error);
            }
    }
    }
       



client.on('ready', async () => {
    console.log('Client is ready!');
});

client.on('message', (msg: Message) => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

// if(!client.pupBrowser){
//     client.initialize()
// }
// DUMMY_PHONENUMBERS = '9727230804,9638051000,7990451310,9712933808'


