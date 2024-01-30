import { Login } from "#controller/auth-controller.js";
import { Router } from "express";

export const auth_route = Router()

auth_route.post('/login', Login)