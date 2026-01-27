import { FirebaseError, initializeApp } from "firebase/app";
import { arrayUnion, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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
// Users > :userId > {user_info}, {projectLists}, {chatLists}
// Users > :userId > Projects > :projectId > data()
// Users > :userId > Chats > :chatId > {convoLists}, Convo > :convoId > data()
// chatLists: [{id, isOpened, convoLists}];
// convoLists: [{id, isOpened}]
// convoData: {data...}

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

export async function createUserInfo(email: string, password: string, fullName: string, userId: string): Promise<string> {
    try {
        await saveUserToFirebase({ fullName, email, userId: userId, password });
        await logOut();
        const message: string = "User added succesfully.";
        return message;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);
    }

}

export async function createUserWithEmail(email: string, password: string, fullName: string): Promise<string> {
    console.log(auth)
    try {
        const setUser = await createUserWithEmailAndPassword(auth, email, password);
        const userCredential: User = setUser.user;
        const getMessage = await createUserInfo(email, password, fullName, userCredential.uid);
        return getMessage;
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

        const ref = doc(firestore, "Users", getUser.uid);
        const getUserInfo = await getDoc(ref);
        if (!getUserInfo.data()) {
            createUserInfo(getUser.email || "", "", getUser.displayName || "", getUser.uid);
        }
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
        const ref = doc(firestore, "Users", getUser.uid);
        const getUserInfo = await getDoc(ref);
        if (!getUserInfo.data()?.user.userId) {
            createUserInfo(getUser.email || "", "", getUser.displayName || "", getUser.uid);
        } else[
            console.log(getUserInfo.data())
        ]
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
// USER DATA TO FIRESTORE

export async function saveUserToFirebase(user: UserInfo): Promise<string> {
    const userRef = doc(firestore, "Users", user.userId);
    const chatLists: ChatList[] = [
        { isOpen: false, id: "everyday-task", convoLists: [] },
        { isOpen: false, id: "daily-routine", convoLists: [] },
        { isOpen: false, id: "occasional", convoLists: [] }
    ];
    const projectLists: TaskClassLists[] = [
        { name: "Everyday Tasks", id: "everyday-task", icon: "fas far fa-list-alt", taskType: "normal-tasks", isOpened: false, status: "pending" },
        { name: "Daily Routine", id: "daily-routine", icon: "fas fa-calendar-alt", taskType: "normal-tasks", isOpened: false, status: "pending" },
        { name: "Occasional", id: "occasional", icon: "	fas fa-calendar-day", taskType: "normal-tasks", isOpened: false, status: "pending" },
    ]
    try {
        await setDoc(userRef, { user, chatLists, projectLists });
        await Promise.all(
            projectLists.map((e) => {
                const docRef = doc(firestore, "Users", user.userId, "Projects", e.id);
                return setDoc(docRef, {
                    project: { ...e, taskGroups: [] }
                });
            })
        );
        await Promise.all(
            chatLists.map((e) => {
                const docRef = doc(firestore, "Users", user.userId, "Chats", e.id);
                return setDoc(docRef, {
                    convoLists: []
                });
            })
        )
        const message: string = "User added succesfully.";
        return message;
    } catch (error: unknown) {
        const err = isFirebaseError(error);
        throw new Error(err);
    }
}

export async function updateProjectLists(userId: string, projectLists: TaskClassLists[]): Promise<string> {
    const userRef = doc(firestore, "Users", userId);
    try {
        await updateDoc(userRef, {
            projectLists
        })
        const message: string = "User added succesfully.";
        return message;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);
    }
}

// ABOUT PROJECTS: CRUD OPERATIONS FOR PROJECTS;
export async function getDataFromFirestore(userId: string): Promise<UserData> {
    const ref = doc(firestore, "Users", userId);
    try {
        const requestData = await getDoc(ref);
        const getData = requestData.data() as UserData;
        return getData;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function getProjectsData(userId: string, projectId: string): Promise<TaskClass> {
    const docRef = doc(firestore, "Users", userId, "Projects", projectId);
    try {
        const requestData = await getDoc(docRef);
        const getData = requestData.data()?.project as TaskClass;
        return getData;
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function saveProjectFromFirestore(userId: string, project: TaskClass, chatInfo: ChatList | undefined, action: "update" | "create" | "delete"): Promise<string> {
    const userRef = doc(firestore, "Users", userId);
    const projectRef = doc(firestore, "Users", userId, "Projects", project.id);
    const chatRef = doc(firestore, "Users", userId, "Chats", project.id);
    try {

        if (action == "delete") {
            await deleteDoc(projectRef);
            await deleteDoc(chatRef);
        }

        if (action == "update") {
            await updateDoc(projectRef, { project: project });
        }

        if (action == "create") {
            await setDoc(projectRef, { project: project });
            if (chatInfo) {
                const chatRef = doc(firestore, "Users", userId, "Chats", chatInfo.id);
                await setDoc(chatRef, { convoLists: [] })
                await updateDoc(userRef, { chatLists: arrayUnion(chatInfo) });
            }
        }
        return "Saved!";
    } catch (error: unknown) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}
// CRUD OPERATIONS FOR CHATS

// export async function getChatsData(userId: string): Promise<Chats> {
//     const docRef = collection(firestore, "Users", userId, "Chats");
//     try {
//         const requestData = await getDocs(docRef);
//         let mergeData: Chats = [];
//         requestData.forEach(chat => {
//             const data = chat.data() as Chat;
//             mergeData = [...mergeData, data];
//         });
//         return mergeData;
//     } catch (error) {
//         const err = isFirebaseError(error);
//         throw new Error(err);;
//     }
// }

export async function updateChatList(userId: string, chatList: ChatList[]) {
    const docRef = doc(firestore, "Users", userId);
    try {
        await updateDoc(docRef, {
            chatLists: chatList
        });
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function getConvoLists(userId: string, chatId: string): Promise<ConvoList[]> {
    const chatRef = doc(firestore, "Users", userId, "Chats", chatId);
    try {
        const getConvoLists = (await getDoc(chatRef)).data()?.convoLists as ConvoList[];
        return getConvoLists
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function getConvoData(userId: string, chatId: string, convoId: string): Promise<Convo> {
    const convoRef = doc(firestore, "Users", userId, "Chats", chatId, "Convos", convoId);
    try {
        const getConvoData = (await getDoc(convoRef)).data()?.convo as Convo;
        console.log(getConvoData)
        return getConvoData
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function saveConvoLists(userId: string, chatId: string, convoLists: ConvoList[]) {
    const convoRef = doc(firestore, "Users", userId, "Chats", chatId);
    try {
        await updateDoc(convoRef, { convoLists });
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}

export async function saveConvoData(userId: string, chatId: string, convoId: string, convo: Convo) {
    const convoRef = doc(firestore, "Users", userId, "Chats", chatId, "Convos", convoId);
    try {
        await setDoc(convoRef, { convo });
    } catch (error) {
        const err = isFirebaseError(error);
        throw new Error(err);;
    }
}