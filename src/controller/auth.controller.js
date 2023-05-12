import { PrismaClient } from "@prisma/client"
import UserController from "./user.controller";

export default class AuthController {
    constructor(props) {
        this.fields = props?.fields ?? undefined
        this.prisma = new PrismaClient();
    }


    async signIn() {
        console.log("========================sign in==============")
        console.log(this.fields)
        try {
            if (!this.fields) {
                return [
                    new Error("this.fields must be defined"),
                    null
                ]
            }
            // call database

            const [err, data] = await new UserController({
                value: this.fields.email,
                password: this.fields.password
            })._getuserByEmail()

            if (err) {
                console.log(err)
            }
            if (data == null) {
                console.log("USER NOT FOUND OR PASSWORD INVALID")
            }
            console.log("======================== got user ==============")
            console.log(data)

            // const user = {
            //     id:1,
            //     username:"johndoe",
            //     isBanned:true,
            //     email: "johndoe@gmail.com",
            //     avatar: null
            // }
            return [null, data];
        } catch (err) {
            console.log(err)
            return [err, null];
        }
    }

}