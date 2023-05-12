import {PrismaClient} from '@prisma/client'
export default class controller{
        /**
     * 
     * @param props
     * 
     **/

        constructor(props){
            this.req = props?.req ?? undefined
            this.res = props?.res ?? undefined
            this.prisma = new PrismaClient();
            this.fields = props?.fields ?? null
            this.key = props?.key ?? undefined
            this.value = props?.value ?? null
            this.password = props?.password ?? null
            this.tableName = props?.tableName ?? undefined
            this.where = props?.where ?? undefined
            BigInt.prototype.toJSON = function(){
                return this.toString();
            }
        }


        async _bikininUser(){
            console.log("============================func create============================")
            try {
                if(!this.tableName) return [new Error('tablename : table name must be defined'),null]
                if(typeof(this.fields) !== "object" &&
                Object.keys(this.fields).length ===0
                ){
                    return [new Error('No data found to save'), null]
                }
                const response = await
                this.prisma[this.tableName]
                .create({
                    data:this.fields
                })
                return [null,response]
            } catch (error) {
                return [error, null]
            }
        }

        async _getuserByEmail(){
            try {
                let condition = {
                    where:{
                        email:this.value,
                        password:this.password
                    }
                }
                let user = await this.prisma[this.tableName]
                .findFirst(condition)

                return [null, user]
            } catch (error) {
                return[error, null]
            }
        }

        async _cariinUser(){
            try {
                let condition = {
                    where:{
                        [this.key]:{
                            // startsWith:this.value
                            contains:this.value
                        }
                    }
                }


                if(!isNaN(Number(this.value))){
                    this.value = Number(this.value)
                }

                let response = {}
                if(this.key =="id"){
                    response = await this.prisma[this.tableName]
                    .findUnique({
                        where:{
                            [this.key]:this.value
                        },
                    })
    
                }else{
                    response = await this.prisma[this.tableName]
                    // .findUnique({
                    //     where:{
                    //         [this.key]:this.value
                    //     },
                    // })
                    // .findMany({
                    //     where:{
                    //         [this.key]:{
                    //             // startsWith:this.value
                    //             contains:this.value
                    //         }
                    //     }
                    // })
        
                    .findMany(condition)
                }
                return [null, response]
            } catch (error) {
                return[error, null]
            }
        }

        async _semuaUser(){
            try {
             
                if(!isNaN(Number(this.value))){
                    this.value = Number(this.value)
                }

                let response = {}
                    response = await this.prisma[this.tableName]
                    .findMany()
                
                return [null, response]
            } catch (error) {
                return[error, null]
            }
        }

        async _hapusinUser(){
            try {
                if(!isNaN(Number(this.value))){
                    this.value = Number(this.value)
                }
                const response = await this.prisma[this.tableName]
                .delete({
                    where:{
                        [this.key]:this.value
                    }
                })
                return [null, response]
            } catch (error) {
                return [error, null]
            }
        }

        async aboutWeb(){
            try {
             
                if(!isNaN(Number(this.value))){
                    this.value = Number(this.value)
                }

                let response = {}
                    response = await this.prisma[this.tableName]
                    .findMany()
                
                return [null, response]
            } catch (error) {
                return[error, null]
            }
        }
}