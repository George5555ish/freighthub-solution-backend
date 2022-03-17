import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { ApolloError } from "apollo-server";
class UserService {
  async createUser(input: CreateUserInput) {
    // call user model

    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    // get user by email
    const emailErrMsg = "Email Doesn't exist. Please Sign Up";
    const errMsg = "Invalid Email or password";
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(emailErrMsg);
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(errMsg);
    }

    const token = signJwt(user);

    context.res.cookie("accessToken", token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return token;
  }
}

export default UserService;
