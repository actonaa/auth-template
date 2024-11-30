import {
  getDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

const retrieveCollectionData = async (collectionName: string) => {
  if (!collectionName) throw new Error("Collection name is required");

  const collectionRef = collection(firestore, collectionName);
  const snapshot = await getDocs(collectionRef);

  if (snapshot.empty) {
    console.warn(`No documents found in collection: ${collectionName}`);
    return [];
  }

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const retrieveDataByID = async (collectionName: string, id: string) => {
  if (!collectionName || !id)
    throw new Error("Collection name and ID are required");

  const collectionRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(collectionRef);

  if (!snapshot.exists()) {
    console.warn(
      `No document found in collection: ${collectionName} with ID: ${id}`
    );
    return null;
  }

  return snapshot.data();
};

export { retrieveCollectionData, retrieveDataByID };
