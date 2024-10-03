import { Account, Client, ID } from "appwrite";
import config from "../config/config";

class AuthService {
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId)
        this.account = new Account(this.client)
    }

    // Create a new account
    async createAccount({ email, password, name }) {
        try {
            const response = await this.account.create(ID.unique(), email, password, name);
            if(response){
                return this.login({email,password})
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    // Login user
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    // Logout user
    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error(`Error getting current user: ${error} and here's the message ${error.message}`);
            return null;
        }
    }
}

const authService = new AuthService();

export default authService;