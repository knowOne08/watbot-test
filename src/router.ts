import express from 'express'
import { showQr } from './botIndex'
import { sendMultipleMessages } from './sendMessage'
import { startClient } from './controllers'
export const whatsappRoutes = express.Router()

whatsappRoutes.get('/check', (req,res) => res.send('<html>Chal raha hu be laude</html>'))
whatsappRoutes.get('/qr', showQr)
whatsappRoutes.get('/start_client', startClient)
whatsappRoutes.post('/send_message', sendMultipleMessages)