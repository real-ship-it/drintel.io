import { randomUUID } from "crypto";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  hasPaid: boolean;
  createdAt: Date;
}

export interface InsertUser {
  name: string;
  email: string;
  passwordHash: string;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPaymentStatus(id: string, hasPaid: boolean): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      name: insertUser.name,
      email: insertUser.email,
      passwordHash: insertUser.passwordHash,
      hasPaid: false,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserPaymentStatus(id: string, hasPaid: boolean): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.hasPaid = hasPaid;
      this.users.set(id, user);
    }
    return user;
  }
}

export const storage = new MemStorage();
