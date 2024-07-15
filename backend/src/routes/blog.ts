import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userMiddleware } from "../middleware/userMiddleware";
import { createBlogBody, updateBlogBody } from "@utkarsh.dev/readium";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL :  string,
        JWT_SECRET : string
    },
    Variables : {
        id : string
    }
}>(); 

blogRouter.post("/",userMiddleware,async(c)=>{
    const id = c.get("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = createBlogBody.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message : "Invalid Inputs"})
    }
    try{
        await prisma.blogs.create({
        data : {
            title : body.title,
            content : body.content,
            author_id : id
        }})
        return c.json({message : "Created succesfully"})
    }catch(e){
        c.status(500)
        return c.json({message : "Error while creating"})
    }

})

blogRouter.put("/",userMiddleware,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    
    const {success,data} = updateBlogBody.safeParse(body);
    const user_id = c.get("id");
    if(!success){
        c.status(411)
        return c.json({message : "Invalid Entry"})
    }
    
    try{
        await prisma.blogs.update({
            where : {
                id : data.id,
                author_id : user_id
            },
            data :{
                title : data.title,
                content : data.content 
            }
        })
        return c.json({message : "Updated Successfully"})
    }catch(e){
        c.status(500)
        return c.json({message : "Something went wrong"})
    }
})

blogRouter.get("/bulk",async(c)=>{
    console.log("hey");
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    console.log("hi");
    
    try{
        console.log("hello");
        const blogs = await prisma.blogs.findMany({
            select : {
                id : true,
                title : true,
                content : true,
                created_at : true,
                author : {
                    select : {
                        firstName : true,
                        lastName : true 
                    }
                }
            }
        })
        console.log(blogs);
        return c.json({blogs : blogs})
    }
    catch(e){
        c.status(500)
        return c.json({message : "Something went wrong"})
    }
})

blogRouter.get("/:id",userMiddleware,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const blog_id = c.req.param("id");
    try{
        const blog = await prisma.blogs.findUnique({
            where : {
                id : blog_id
            },
            select :{
                title :true,
                content : true,
                created_at : true,
                author : {
                    select : {
                        firstName : true,
                        lastName : true
                    }
                }
            }
        })
        return c.json(blog)
    }catch(e){
        c.status(500)
        return c.json({message : "Does not exist"})
    }
})



// postgresql://utkarshmishra2410:MyVWtvDP6a9m@ep-round-shape-a534r717.us-east-2.aws.neon.tech/Readium?sslmode=require