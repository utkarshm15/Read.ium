import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinBody, signupBody, updatePasswordBody, updateUserBody } from "@utkarsh.dev/readium";
import { userMiddleware } from "../middleware/userMiddleware";
import { hash } from "../utils/hash";


export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        id : string
    }
}>();

userRouter.post("/signup",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success,data}  =signupBody.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message : "Invalid Username or Password"})
    }
    try{
        data.password = await hash(data.password)
        const res = await prisma.users.create({
        data:data
        })
        const token = await sign({id : res.id},c.env.JWT_SECRET);
        return c.json({
            message : "User created successfully",
            token : token
        });
    }catch(e){
        console.log(e);
        c.status(400)
        return c.json({message : "User already exists"})
    }
});

userRouter.post("/signin",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success,data} = signinBody.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message : "Invalid Username or Password"})
    }
    try{
        data.password = await hash(data.password)
        const user = await prisma.users.findUnique({
            where : data
        })
        if(!user){
            c.status(400)
            return c.json({message : "User not found"})
        }
        const token = await sign({id : user.id},c.env.JWT_SECRET)
        return c.json({
            message : "Signed In Successfully",
            token : token
        })
    }catch(e){
        console.log(e);
        c.status(400);
        return c.json({message : "Error while signing in"})
    }
})

userRouter.get("/",userMiddleware,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = c.get("id");
    try{
        const user = await prisma.users.findUnique({
            where :{
                id
            },
            select:{
                firstName :true,
                lastName : true,
                email : true,
                blogs : {
                    select : {
                        title : true,
                        id : true
                    }
                }
            }
        })
        return c.json(user);
    }catch(err){
        c.status(500)
        return c.json({message:"Something went wrong"});
    }
})

userRouter.put("/update",userMiddleware,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = c.get("id");
    const body = await c.req.json();
    const {success,data} = updateUserBody.safeParse(body);
    if(!success){
        c.status(400)
        return c.json({messsage : "Invalid Request"})
    }
    try{
        await prisma.users.update({
            where : {id},
            data : {
                firstName : data.firstName,
                lastName : data.lastName
            }
        })
        return c.json({message : "Updated Succesfully"})
    }catch(err){
        c.status(500)
        return c.json({message : "Something went wrong"})
    }
})

userRouter.put("/update/password",userMiddleware,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = c.get("id");
    const body = await c.req.json();
    const {success,data} = updatePasswordBody.safeParse(body);
    if(!success){
        c.status(400)
        return c.json({message : "Invalid Request"})
    }
    try{
        const oldPH = await hash(data.oldPassword)
        const newPH = await hash(data.newPassword)
        
        await prisma.users.update({
            where : {
                id,
                password : oldPH
            },
            data : {
                password : newPH
            }
        })
        return c.json({message : "Updated Succesfully"})
    }catch(err){
        c.status(400)
        return c.json({message : "Incorrect Password Please try Again"})
    }
})

