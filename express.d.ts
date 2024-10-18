import { User } from './model/User'; // Adjust the import according to your user model

declare global {
  namespace Express {
    interface Request {
      //@ts-ignore
      user?: User; // Assuming User is the type of the user object
    }
  }
}
