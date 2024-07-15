import { z } from "zod";

export const signupBody = z.object({
    firstName : z.string(),
    lastName  : z.string(),
    email : z.string().email(),
    password : z.string().min(8),
})

export const signinBody = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

export const createBlogBody = z.object({
    title : z.string().min(1),
    content : z.string().min(20),
})

export const updateBlogBody = z.object({
    id : z.string(),
    title : z.string().min(1).optional(),
    content : z.string().min(1).optional()
})

export const updateUserBody = z.object({
    firstName : z.string().min(1),
    lastName : z.string().min(1)
})

export const updatePasswordBody = z.object({
    oldPassword : z.string().min(8),
    newPassword : z.string().min(8)
})

export type SignupBody = z.infer<typeof signupBody>
export type SigninBody = z.infer<typeof signinBody>
export type CreateBlogBody = z.infer<typeof createBlogBody>
export type UpdateBlogBody = z.infer<typeof updateBlogBody>
export type UpdateUserBody = z.infer<typeof updateUserBody>
export type UpdatePasswordBody  = z.infer<typeof updatePasswordBody>