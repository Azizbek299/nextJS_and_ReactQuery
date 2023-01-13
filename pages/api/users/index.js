import connectMongo from "../../../database/conn";
import { deleteUser, getUsers, postUsers, putUser } from "../../../database/controller";




export default async function handler(req, res) {
  
    connectMongo().catch(()=> {
        return res.status(405).json({error:'Error in the Connection'})
    })

  switch (req.method) {
    //    http://localhost:/3000/api/users     Адресга  GET  запрос берсангиз ишлайди , чунки бу кодлар  api/users/index.js  файлида жойлашган
    //    Кейин у керакли сиз белгилаган controller даги функцияни ишга туширади
    case "GET":
      getUsers(req,res)
      break

    case "POST":
      postUsers(req,res)
      break

    default:
        res.setHeader('Allow', ['GET','POST','PUT','DELETE'])
        res.status(405).end(`Method ${req.method} not allowed`)
  }
}
