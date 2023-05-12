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
.get(
    async (req,res)=>{
        try {
            let { id} = req.query
            let field = req.query.searchBy

            console.log("================================= query ===========================")
            console.log(id)
            console.log(req.query.searchBy)
            console.log(field)

            const [err, data] = await new UserController({
                // key:"name",
                // key:"id",
                key:field,
                value:id
              })._cariinUser()

              if(err){
                res.status(400)
                return res.json({
                    error:true,
                    status:400,
                    message: err?.message
                })
              }
        
              if(!data){
                res.status(404)
                return res.json({
                    error:true,
                    status:404,
                    message:"User not found"
                })
              }
        
              res.status(200)
              return res.json({
                error:false,
                status:200,
                message:"ok",
                data
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
.delete(
    async (req,res)=>{
        try {
            const [err, data] = await new UserController({
                key:"id",
                value:req.query?.id
            })._hapusinUser()
    
            if(err){
                res.status(400)
                return res.json({
                    error:true,
                    message:err?.message
                })
            }
    
            res.status(201)
            return res.json({})
        } catch (error) {
            res.status(500)
            return res.json({
                error:true,
                message:error?.message
            })
        }
    }
)


export default handler;