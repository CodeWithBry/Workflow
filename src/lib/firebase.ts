import { FirebaseError, initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, type User, signOut, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBL0EpwoXiAnQsqCk3yaF2RDC0SURthRX0",
    authDomain: "workflow-1526c.firebaseapp.com",
    projectId: "workflow-1526c",
    storageBucket: "workflow-1526c.firebasestorage.app",
    messagingSenderId: "562910802976",
    appId: "1:562910802976:web:eab22872f883c475ccb845",
    measurementId: "G-9EBP35CS46"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const auth = getAuth(app);

// FIRESTORE DB MODEL:
// Users > :userId > user_info
// Users > :userId > Projects > {projectLists} :projectId > data()
// Users > :userId > Chats > {chatLists} :chatId > {convoLists} :convoId > data()
// 
// 

function isFirebaseError(error: unknown): string | undefined {
    if (error instanceof FirebaseError) {
        console.log(error)
        return error.message;
    }
    if (error instanceof Error) {
        console.log(error.message)
        return error.message;
    }
}

// ABOUT USER: CRUD OPERATIONS FOR USER;

export async function createUserWithEmail(email: string, password: string, fullName: string): Promise<string> {
    console.log(auth)
    try {
        const setUser = await createUserWithEmailAndPassword(auth, email, password);
        const userCredential: User = setUser.user;
        await saveUserToFirebase({ fullName, email, userId: userCredential.uid, password });
        await logOut();
        const message: string = "User added succesfully.";
        return message;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);
    }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
    try {
        const getUserData = await signInWithEmailAndPassword(auth, email, password);
        const getUser = getUserData.user;
        return getUser;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);
    }
}

export async function signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const getUser = result.user;
        return getUser;
    } catch (error) {
        const err = isFirebaseError(error)
        throw new Error(err);
    }
}

export async function signInWithFacebook(): Promise<User> {
    const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const getUser = result.user;
        return getUser;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);
    }
}

export async function logOut(): Promise<string> {
    try {
        await signOut(auth);
        return "success";
    } catch (error) {
        const err = isFirebaseError(error)
        throw new Error(err);
    }
}
// SAVE USER DATA TO FIRESTORE

export async function saveUserToFirebase(user: UserInfo): Promise<string | undefined> {
    const ref = doc(firestore, "Users", user.userId);
    try {
        await setDoc(ref, { user });
        const message: string = "User added succesfully.";
        return message;
    } catch (error: unknown) {
        const err = isFirebaseError(error);
        throw new Error(err);
    }
}

// ABOUT PROJECTS: CRUD OPERATIONS FOR PROJECTS;

export async function getUserInfo(userId: string): Promise<unknown> {
    const ref = doc(firestore, "Users", userId);
    try {
        const requestData = await getDoc(ref);
        const getData = requestData.data();
        console.log(requestData)
        return getData;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function getChatsData(userId: string): Promise<Chats> {
    const docRef = collection(firestore, "Users", userId, "Chats");
    try {
        const requestData = await getDocs(docRef);
        let mergeData: Chats = [];
        requestData.forEach(chat => {
            const data = chat.data() as Chat;
            mergeData = [...mergeData, data];
        });
        return mergeData;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function getProjectsData(userId: string): Promise<TaskClass[]> {
    const docRef = collection(firestore, "Users", userId, "Projects");
    try {
        const requestData = await getDocs(docRef);
        let mergeData: TaskClass[] = [];
        requestData.forEach(project => {
            const data = project.data() as TaskClass;
            mergeData = [...mergeData, data];
        });
        return mergeData;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function getDataFromFirestore(userId: string): Promise<UserInfo> {
    const ref = doc(firestore, "Users", userId);
    try {
        const requestData = await getDoc(ref);
        const getData = requestData.data() as UserInfo;
        return getData;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function updateProjectFromFirestore(userId: string, project: TaskClass): Promise<string> {
    const docRef = doc(firestore, "Users", userId, "projects", project.id);
    try {
        await updateDoc(docRef, {
            project: project
        });
        return "Saved!";
    } catch (error: unknown) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function saveProjectFromFirestore(userId: string, project: TaskClass): Promise<string> {
    const docRef = doc(firestore, "Users", userId, "projects", project.id);
    try {
        await updateDoc(docRef, {
            project: project
        });
        return "Saved!";
    } catch (error: unknown) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}
