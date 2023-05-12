import nc from 'next-connect'
import ErrorHandler from '@/src/handlers/error.handler'
import AboutController from '@/src/controller/about.controller';

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

            const [err, data] = await new AboutController({
                // key:"name",
                // key:"id",
                key:field,
                value:id
              }).aboutWeb()

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
                    message:"About not found"
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

export default handler;