import { type IStorage } from "./storage";
import { hashPassword, comparePassword, validatePassword } from "./password";
import { log } from "./index";

export interface AuthResult {
  success: boolean;
  user?: { id: string; email: string; name: string };
  error?: string;
}

export async function registerUser(
  storage: IStorage,
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return {
      success: false,
      error: passwordValidation.errors.join("; "),
    };
  }

  // Check if user already exists
  const existingUser = await storage.getUserByEmail(email);
  if (existingUser) {
    return {
      success: false,
      error: "Email already registered",
    };
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await storage.createUser({
    email,
    name,
    passwordHash: hashedPassword,
  });

  log(`User registered: ${email}`);

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

export async function loginUser(
  storage: IStorage,
  email: string,
  password: string
): Promise<AuthResult> {
  // Find user
  const user = await storage.getUserByEmail(email);
  if (!user) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  // Compare passwords
  const passwordMatch = await comparePassword(password, user.passwordHash);
  if (!passwordMatch) {
    log(`Failed login attempt: ${email}`);
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  log(`User logged in: ${email}`);

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}
