import prisma from "../../core/config/db.js";
import { hashPassword, comparePassword } from "../../core/utils/hash.js";
import { generateToken } from "../../core/utils/token.js";

// REGISTER
export const register = async (data) => {
  try {
    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
        name: data.name,
        phone: data.phone,
        role: data.role,
      },
    });

    const { password, ...safeUser } = user;
    return safeUser;

  } catch (error) {
    // Prisma unique constraint error
    if (error.code === "P2002") {
      throw new Error("Email already exists");
    }

    throw error;
  }
};

// LOGIN
export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = generateToken(user);

  console.log("TOKEN GENERATED:", token); // 🔥 ADD THIS

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    token,   // MUST exist here
  };
};