import UserModels from '../model/userModel'



//  GET:   http://localhost:3000/api/users
export async function getUsers(req,res) {
    try {
        const users = await UserModels.find()
        if (!users) {
            return res.status(404).json({error:'Data not found'})
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({error:'Error while fetching data'})
    }
}


//  GET Detail:   http://localhost:3000/api/users/id
export async function getUserByID(req, res) {
    try {
        const {userId} = req.query
        if (userId) {
            const user = await UserModels.findById(userId)
            return res.status(200).json(user)
        }
        return res.status(404).json({error:'User not Selected'})
    } catch (error) {
        return res.status(404).json({error:'Cannot get the User '})
    }
}




//  POST:   http://localhost:3000/api/users
export async function postUsers(req,res) {
    try {
        const formData = req.body
        if (!formData) {
            return res.status(404).json({error:'Form data not provided'})
        }
        UserModels.create(formData, function(err, data) {
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(404).json(error)
    }
}



//  PUT:                        http://localhost:3000/api/users/id
//  PUT method in Postman       http://localhost:3000/api/users/?userId=63ae81fb4918c73a1f997d90

export async function putUser(req,res) {
    try {
        const {userId} = req.query              //  маълумотни браузерни url идан оляпти  Мисол:  http://localhost:3000/api/users/?userId=63ae81fb4918c73a1f997d90
        const formData = req.body               //  маълумотни form дан оляпти input полядаги

        if (userId && formData) {
            const user = await UserModels.findByIdAndUpdate(userId, formData)
            return res.status(200).json(user)
        }
        return res.status(404).json({error:'User not Selected'})
    } catch (error) {
        return res.status(404).json({error:'Error while updating the data'})
    }
}


//  DELETE:   http://localhost:3000/api/users
export async function deleteUser(req,res) {
    try {
        const {userId} = req.query
        if (userId) {
            const user = await UserModels.findByIdAndDelete(userId)
            return res.status(200).json({deleted:userId})
        }
        return res.status(404).json({error:'User not Selected'})
    } catch (error) {
        return res.status(404).json({error:'Error while deleting the data'})
    }
}