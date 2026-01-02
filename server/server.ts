import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const genAi = new GoogleGenerativeAI(process.env.VITE_GEN_API_KEY!);
const getModel = genAi.getGenerativeModel({ model: "gemini-3-flash-preview" });
const origins = [
    "http://localhost:5173",
    "https://codewithbry.github.io",
    "https://codewithbry.github.io/Workflow/",
];

const promptForTask = `
            You are a helpful productivity assistant.
            Your job:
            Explain clearly how the user can accomplish this task.

            Guidelines:
            - Break the solution into simple steps
            - Be practical and actionable
            - Assume the user is a beginner
            - Keep the explanation concise but helpful
        `;
const promptForProject = `
            You are a helpful productivity assistant.
            Your job:
            - Suggests a project workflow where you are going to create a project plan with 
            different tasks depending on what task group or where the task belong.
            - Make a list of task group within its tasks and explain how the project will 
            be done.
            - If the project has taskGroups and tasks inside the object. Give help 
            the user on how to do the tasks step by step.

            Guidelines:
            - Break the solution into simple steps
            - Be practical and actionable
            - Assume the user is a beginner
            - Keep the explanation concise but helpful
        `;

app.use(cors({
    origin: (
        origin: string | undefined,
        callback: (err: null | Error, allow: boolean) => void
    ) => {
        if (!origin) return callback(null, true);

        const isAllowed = origins.includes(origin)

        if (isAllowed) callback(null, true);
        else {
            console.log("BLOCKED BY CORS", origin)
            callback(new Error("not allowed by cors"), false)
        }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight requests globally (Express 5-safe)
app.options(/.*/, cors({ origin: true }));
app.use(express.json());

// AI Ask
app.post("/server/task-assistant", async (req, res) => {
    try {
        const { modifyData } = req.body;


    } catch (error) {

    }
})

// Normal Convo AI
app.post("/server/ai-chat", async (req, res) => {
    try {
        const { messagesAi, modifyData } = req.body;
        console.log(modifyData.task)
        const aiAssistPrompt = modifyData?.task ? promptForTask + `
            Task: ${JSON.stringify(modifyData.task)}
        ` : promptForProject + `
            Note: Update the project object that will be sent here:
            Project: ${JSON.stringify(modifyData.project)}

            TYPE: TASK GROUP AND PROJECT MODEL
            type TaskClass = {
                name: string,
                taskType: "projects" | "normal-tasks"
                id: crypto.randomUUID(),
                isOpened: boolean,
                icon: string,
                taskGroups: TaskGroup[],
                status?: "finished" | "pending"
            };
            type TaskGroup = {
                groupName: string,
                groupId: crypto.randomUUID(),
                tasks: Task[]
            };
            type Task = {
                id: crypto.randomUUID(),
                description: string,
                dateCreated: string,
                status: "pending" | "finished",
                isSelected: "true" | "false",
                groupId: string
            };
        `;
        const persona = { role: "model", parts: [{ text: aiAssistPrompt }] };
        const messAi = [persona, ...messagesAi];
        const result = await getModel.generateContent({ contents: messAi });
        const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Something went wrong.";

        // const analyzeDataPrompt = reply + `\n\n IMPORTANT GOAL: Analyze the data then create an object
        // based on the given data and the object must be in a "JSON Format". \n\n
        // Object Formats:
        // TYPE: TASK GROUP AND PROJECT MODEL
        //     type TaskClass = {
        //         name: string,
        //         taskType: "projects" | "normal-tasks"
        //         id: crypto.randomUUID(),
        //         isOpened: boolean,
        //         icon: string,
        //         taskGroups: TaskGroup[],
        //         status?: "finished" | "pending"
        //     };
        //     type TaskGroup = {
        //         groupName: string,
        //         groupId: crypto.randomUUID(),
        //         tasks: Task[]
        //     };
        //     type Task = {
        //         id: crypto.randomUUID(),
        //         description: string,
        //         dateCreated: string,
        //         status: "pending" | "finished",
        //         isSelected: "true" | "false",
        //         groupId: string
        //     };`
        // const analyzerPrompt = { role: "model", parts: [{ text: analyzeDataPrompt }] };
        // const dataResult = await getModel.generateContent({ contents: [analyzerPrompt] });
        // const dataReply = dataResult?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        //     "Something went wrong.";

        console.log(reply)
        res.json({ reply, messagesAi });
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000, "0.0.0.0", () => {
    console.log(`🚀 BryTech server is running on port ${3000}`);
    console.log("🌐 Allowed URLs:", origins);
});

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// const messages = [
//     { role: "user", parts: [{ text: "Hello AI!" }] },
//     { role: "model", parts: [{ text: "Ai's response..." }] },
//     { role: "user", parts: [{ text: "Can you give me the answer of 8+8" }] }
// ]

// const result = await model.generateContent({ contents: messages });

// const reply =
//     result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
//     "Hmm, di ko alam paano sagutin yan.";

// messages.push({ role: "model", parts: [{ text: reply }] })
// console.log(messages);