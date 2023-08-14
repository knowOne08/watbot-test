import express from 'express'
import { showQr } from './botIndex'
import { sendMultipleMessages } from './sendMessage'
export const whatsappRoutes = express.Router()

whatsappRoutes.get('/check', (req,res) => res.send('<html>Chal raha hu be laude</html>'))
whatsappRoutes.get('/qr', showQr)
whatsappRoutes.post('/send_message', sendMultipleMessages)