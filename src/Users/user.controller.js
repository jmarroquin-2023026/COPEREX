import { checkpassword, encryp } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'
import User from './user.model.js'

export const DefultAdmin = async()=>{
    try{
        const adminList=await User.findOne({role:'ADMIN'})
        if(!adminList){
            const defaultAdmin=new User(
                {
                    name: 'Josue',
                    surname: 'Marroquin',
                    username: 'jmarroquin',
                    email: 'jmarroquin-2023026@kinal.edu.gt',
                    password: await encryp(`${process.env.ADMIN_PASSWORD}`),
                    role: 'ADMIN'
                }
            )
            await defaultAdmin.save()
            console.log('Default admin created successfully')
        }else{
            console.log('Admin user already exists')
        }
    }catch(e){
        console.error('Error adding default admin',e)
    }
}

export const Login=async(req,res)=>{
    try{
        let{userLogin,password}= req.body
        let user=await User.findOne({
            $or:[
                {email:userLogin},
                {username:userLogin}
            ]
        })
        if(user && await checkpassword(user.password,password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message:'Invalid Credentials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'General error with login function',e})
    }
}