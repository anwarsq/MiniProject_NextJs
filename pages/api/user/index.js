import nc from 'next-connect'
import ErrorHandler from '@/src/handlers/error.handler'
import { UserValidator } from '@/src/validator/user.validator'
import UserController from '@/src/controller/user.controller'

const handler = nc(ErrorHandler);

/**
 * DEFAULT dari next js
 * @param req
 * @param res
 */

handler
.post(
    
    // UserValidator.create,
    async (req,res)=> {
        // res.status(200)
        // return;
    try{
        console.log("============================= user ==============")

        const [err, data] = await new UserController({
            fields:req.body?.user
        })._bikininUser()

        if(err){
            res.status(400)
            return res.json({
                error:true,
                message:err?.message
            })
        }

        return res.json({
            error:false,
            data:data
        })
    }catch(err){
        console.log("=======================ERRRRRRRRRRRRRRRRRRRRRRRRRRRROR==============")
        res.status(500)
        return res.json({
            error: true,
            status:500,
            message: err?.message
        })
    }
}
)
.get(
    async(req, res)=>{
        try {
            const [err, data] = await new UserController({
                fields:req.body?.user
            })._semuaUser()

            if(err){
                res.status(400)
                return res.json({
                    error:true,
                    message:err?.message
                })
            }
    
            return res.json({
                error:false,
                data:data
            })
        } catch (error) {
            res.status(500)
            return res.json({
                error: true,
                status:500,
                message: err?.message
            })
        }
    }
)


export default handler;