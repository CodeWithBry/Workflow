import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const genAi = new GoogleGenerativeAI(process.env.VITE_GEN_API_KEY!);
const origins = [
    "http://localhost:5173",
    "https://codewithbry.github.io",
    "https://codewithbry.github.io/Workflow/",
];

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

app.get("/server", async (req, res) => {
    res.send("FROM SERVER!");
})

app.post("/server/task-assistant", async (req, res) => {
    try {
        const { task } = req.body;
        const aiAssistPrompt = `
            You are a helpful productivity assistant.

            The user has the following task:
            - Task description: "${task.description}"
            - Status: ${task.status}
            - Date created: ${task.dateCreated}

            Your job:
            Explain clearly how the user can accomplish this task.

            Guidelines:
            - Break the solution into simple steps
            - Be practical and actionable
            - Assume the user is a beginner
            - Keep the explanation concise but helpful
        `;

    } catch (error) {

    }
})

app.listen(3000, async () => console.log("FROM SERVER!"))