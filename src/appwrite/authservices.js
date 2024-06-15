import { Client, Account, ID } from "appwrite";
import conf from "../conf/config";

const { appwriteurl, projectid } = conf;

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(appwriteurl).setProject(projectid);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name, phonenumber, location }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
        phonenumber,
        location
      );
      if (userAccount) {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async updateName(username) {
    try {
      await this.account.updateName(username);
    } catch (error) {
      console.error("Appwrite service :: updateName :: error", error);
    }
  }

  async createEmailToken({userId,email} ) {
    try {
      const sessionToken = await this.account.createEmailToken(userId,email); // Remove `userId` as it is not needed
      return sessionToken;
    } catch (error) {
      console.error("Appwrite service :: createEmailToken :: error", error);
      throw error;
    }
  }

  async createSession({userId, secret}) {
    try {
      const session = await this.account.createSession(userId, secret);
      return session;
    } catch (error) {
      console.error("Appwrite service :: createSession :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
