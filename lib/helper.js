const BASE_URL = 'http://localhost:3000'


export const getUsers = async()=> {
    const response = await fetch(`${BASE_URL}/api/users`)               //  Бу ерда биз проектимизни ичидаги api/index.js файлига мурожат киляпмиз
    const json = await response.json()    
    return json
}


export const getUser = async(userId)=> {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`)     //  Бу ерда биз проектимизни ичидаги api/[userId].js файлига мурожат киляпмиз
    const json = await response.json()

    if(json){
        return json
    }
    return {}
}


export const addUser = async(formData)=> {
    try {
        const Options = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}/api/users`, Options)      //  Бу ерда биз проектимизни ичидаги api/index.js файлига мурожат киляпмиз
        const json = await response.json()
        return json

    } catch (error) {
        return error
    }
}



export const updateUser =  async(userId, formData)=> {
    try {
        const Options = {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
        }
        console.log(Options) 
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options)      //  Бу ерда биз проектимизни ичидаги api/[userId].js файлига мурожат киляпмиз
        const json = await response.json()
        return json


    } catch (error) {
        return error
    }
}




export const deleteUser =  async(userId)=> {
    try {
        const Options = {
            method:'DELETE',
            headers:{'Content-Type':'application/json'},            
        }
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options)      //  Бу ерда биз проектимизни ичидаги api/[userId].js файлига мурожат киляпмиз
        const json = await response.json()
        return json


    } catch (error) {
        return error
    }
}