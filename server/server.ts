import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const genAi = new GoogleGenerativeAI(process.env.VITE_GEN_API_KEY!);
const getModel = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });
const origins = [
    "http://localhost:5173",
    "https://codewithbry.github.io",
    "https://codewithbry.github.io/Workflow/",
];

const promptForTask = `
            IMPORTANT:
            MAKE SURE TO SUMMARIZE AND SIMPLIFY EVERYTHING!
            YOUR MAXIMUM TEXT IS ONLY 500 WORDS!

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
            IMPORTANT:
            MAKE SURE TO SUMMARIZE AND SIMPLIFY EVERYTHING!
            YOUR MAXIMUM TEXT IS ONLY 500 WORDS!

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

            NOTE: IF THE USER ASKS TO MODIFY THE PROJECT DATA, TURN IT INTO A JSON FORMAT ONLY WITHOUT EXPLANATIONS AND STRICTLY USE THIS FORMAT!

            type TaskClass = {
                name: string,
                taskType: "projects" | "normal-tasks"
                id: string, //UUID FORMAT!
                isOpened: boolean,
                icon: string,
                taskGroups: TaskGroup[],
                status?: "finished" | "pending"
            };
            // TASK GROUP
            type TaskGroup = {
                groupName: string,
                groupId: string, //UUID FORMAT!
                tasks: Task[]
            };
            // TASKS
            type Task = {
                id: string, //UUID FORMAT!
                description: string,
                dateCreated: string,
                status: "pending" | "finished",
                isSelected: "true" | "false",
                groupId: string
            }; 
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


// Normal Convo AI
app.post("/server/ai-chat", async (req, res) => {
    try {
        const { messagesAi, modifyData } = req.body;
        console.log(modifyData.task)
        const aiAssistPrompt = modifyData?.task ? promptForTask + `
            Task: ${JSON.stringify(modifyData.task)}
            Project: ${JSON.stringify(modifyData.project)}
        ` : promptForProject + `Project: ${JSON.stringify(modifyData.project)}`;
        const persona = { role: "model", parts: [{ text: aiAssistPrompt }] };
        const messAi = [persona, ...messagesAi];
        const result = await getModel.generateContent({ contents: messAi });
        const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Something went wrong.";
        res.json({ reply, messagesAi });
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000, "0.0.0.0", () => {
    console.log(`🚀 BryTech server is running on port ${3000}`);
    console.log("🌐 Allowed URLs:", origins);
});