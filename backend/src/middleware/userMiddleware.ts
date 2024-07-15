import { Context } from "hono";
import { verify } from "hono/jwt";

export async function userMiddleware(c:Context,next:any){
    const auth = c.req.header("Authorization")
    if(!(auth && auth.startsWith("Bearer "))){
        c.status(401)
        return c.json({message : "You are not authorized please login"})
    }
    const token = auth.split(" ")[1];
    try{
        const payload = await verify(token,c.env.JWT_SECRET);
        c.set("id",payload.id);
        await next();
    }catch(e){
        c.status(411)
        return c.json({message : "Invalid access"})
    }   
}