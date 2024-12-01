import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "@/lib/firebase/init";

const firestore = getFirestore(app);

interface UserData {
  email: string;
  fullname: string;
  phone?: string;
  password?: string;
  role?: string;
}

interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

const handleError = (message: string, error: unknown) => {
  if (error instanceof Error) {
    console.error(message, error);
    throw error; // lemparkan objek Error jika memang Error
  } else {
    // Jika error bukan objek Error, buat objek Error baru
    console.error(message, new Error(String(error)));
    throw new Error(String(error)); // lemparkan objek Error baru
  }
};
const signUp = async (userData: UserData) => {
  if (
    !userData.email ||
    !userData.fullname ||
    !userData.phone ||
    !userData.password
  ) {
    return {
      success: false,
      message: "Missing required fields: email, password, fullname, phone",
    };
  }

  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  try {
    const snapshot = await getDocs(emailQuery);

    if (snapshot.empty) {
      userData.role = userData.role || "user"; // default role user
      userData.password = await bcrypt.hash(userData.password, 10); // hash password

      await addDoc(collection(firestore, "users"), userData);
      return { success: true, message: "User registered successfully" };
    } else {
      return { success: false, message: "Email is already registered" };
    }
  } catch (error) {
    handleError("Error during sign-up:", error);
    return { success: false, message: "An error occurred during sign-up" };
  }
};

const signIn = async (email: string) => {
  if (!email || typeof email !== "string")
    throw new Error("Invalid email format");

  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", email)
  );

  try {
    const snapshot = await getDocs(emailQuery);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    handleError("Error during sign-in:", error);
    return null;
  }
};

const loginWithGoogle = async (data: UserData): Promise<User | null> => {
  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  try {
    const snapshot = await getDocs(emailQuery);
    const user = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    if (user.length > 0) {
      return user[0]; // Return the first user found
    } else {
      // If the user doesn't exist, create a new one
      const fullname = data.fullname || "No Name Provided";
      const role = data.role || "member"; // Ensure role is set
      const newUser = { ...data, fullname, role };

      // Add the new user to Firestore
      const docRef = await addDoc(collection(firestore, "users"), newUser);

      // Return the user with the newly generated ID
      return { id: docRef.id, ...newUser } as User;
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    return null; // Return null if an error occurs
  }
};

const loginWithFacebook = async (data: UserData): Promise<User | null> => {
  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  try {
    const snapshot = await getDocs(emailQuery);
    const user = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    if (user.length > 0) {
      return user[0]; // Return the first user found
    } else {
      // If the user doesn't exist, create a new one
      const fullname = data.fullname || "No Name Provided";
      const role = data.role || "member"; // Ensure role is set
      const newUser = { ...data, fullname, role };

      // Add the new user to Firestore
      const docRef = await addDoc(collection(firestore, "users"), newUser);
      console.log("New user created:", docRef.id);

      // Return the user with the newly generated ID
      return { id: docRef.id, ...newUser } as User;
    }
  } catch (error) {
    console.error("Error during Facebook login:", error);
    return null; // Return null if an error occurs
  }
};

export { signUp, signIn, loginWithGoogle, loginWithFacebook };
