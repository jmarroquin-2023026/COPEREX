import { isValidObjectId } from 'mongoose'
import Company from '../src/Company/compay.model.js'
import User from '../src/Users/user.model.js'

export const existName = async (name, company)=>{
    const alreadyName = await Company.findOne({name})
    if (alreadyName && alreadyName._id != company._id){
        console.error(`Name ${name} is already taken`)
        throw new Error(`Name ${name} is already taken`)
    }
}

export const existEmail = async (email, company)=>{
    const alreadyEmail = await Company.findOne({email})
    if (alreadyEmail && alreadyEmail._id != company._id){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existPhone = async (phone, company)=>{
    const alreadyPhone = await Company.findOne({phone})
    if (alreadyPhone && alreadyPhone._id != company._id){
        console.error(`Phone ${phone} is already taken`)
        throw new Error(`Phone ${phone} is already taken`)
    }
}

export const existAddress = async (address, company) => {
    const alreadyAddress = await Company.findOne({address})
    if (alreadyAddress && alreadyAddress._id != company._id){
        console.error(`Address ${address} is already taken`)
        throw new Error(`Address ${address} is already taken`)
    }
}

export const notRequiredField=(field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}

export const objectValid=(objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error(`Id is not a valid ObjectId`)
    }
}

export const findUser=async(id)=>{
    try{
        const userExist=await User.findById(id)
        if(!userExist)return false
        return userExist
    }catch(e){
        console.error(e)
        return e
    }
}