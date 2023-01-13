import connectMongo from "../../../database/conn";
import { getUserByID, putUser, deleteUser } from "../../../database/controller";

//  Бу файлда хозир Detail ишлатиляпти
//  Бу файлда Update ва Delete ларни ишлатсангиз булади

export default async function (req, res) {
  connectMongo().catch(() => {
    return res.status(405).json({ error: "Error in the Connection" });
  });

  switch (req.method) {
    //    http://localhost:/3000/api/users/id     Адресга  GET  запрос берсангиз ишлайди , чунки бу кодлар  api/users/[userId].js  файлида жойлашган
    //    Кейин у керакли сиз белгилаган controller даги функцияни ишга туширади

    case "GET":
      getUserByID(req, res);
      break;

    case "PUT":
      putUser(req, res);
      break;

    case "DELETE":
      deleteUser(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} not allowed`);
  }
}


