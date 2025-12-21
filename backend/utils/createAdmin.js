import User from "../models/User.js";

export const createAdminIfNotExists = async () => {
  try {
    const adminEmail = "admin@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: "Super Admin",
        email: adminEmail,
        password: "Admin1234@",
        role: "admin",
      });

      console.log("✅ Admin account created:");
      console.log("   Email: admin@gmail.com");
      console.log("   Password: Admin1234@");
    } else {
      console.log("ℹ️ Admin account already exists");
    }
  } catch (err) {
    console.error("❌ Failed to create admin:", err.message);
  }
};
