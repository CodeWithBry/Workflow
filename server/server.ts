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
            IMPORTANT!
            Be very specific (narrow topic only)
            Limit output length (e.g., “max 3 bullets”)
            Use constraints (word/character limit)
            Ask for bullets, not paragraphs
            Request summaries only (“TL;DR”, “one-line each”)
            Avoid follow-up explanations
            Reuse context instead of repeating prompts
            Set a fixed format (template)
            Disable creativity (“no examples, no emojis”)
            Chunk tasks (small prompts, one goal)

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
            IMPORTANT!
            Be very specific (narrow topic only)
            Limit output length (e.g., “max 3 bullets”)
            Use constraints (word/character limit)
            Ask for bullets, not paragraphs
            Request summaries only (“TL;DR”, “one-line each”)
            Avoid follow-up explanations
            Reuse context instead of repeating prompts
            Set a fixed format (template)
            Disable creativity (“no examples, no emojis”)
            Chunk tasks (small prompts, one goal)

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

app.post("/server/ai-chat", async (req, res) => {
    try {
        const { messagesAi, modifyData } = req.body;

        const aiAssistPrompt = modifyData?.task
            ? promptForTask + `
                Task: ${JSON.stringify(modifyData.task)}
                Project: ${JSON.stringify(modifyData.project)}
                `
            : promptForProject + `
                Project: ${JSON.stringify(modifyData.project)}
                `;

        const persona = {
            role: "model",
            parts: [{ text: aiAssistPrompt }],
        };

        const messAi = [persona, ...messagesAi];

        // 🔥 REQUIRED STREAMING HEADERS
        res.status(200);
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache, no-transform");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Content-Encoding", "identity");
        res.flushHeaders?.();

        // Start Gemini streaming
        const stream = await getModel.generateContentStream({
            contents: messAi,
        });

        // Handle client disconnect
        let aborted = false;
        req.on("close", () => {
            aborted = true;
        });

        // 🔥 Correct Gemini chunk parsing
        for await (const chunk of stream.stream) {
            if (aborted) break;

            const parts = chunk.candidates?.[0]?.content?.parts;
            if (!parts) continue;

            for (const part of parts) {
                if (part.text) {
                    res.write(part.text);
                }
            }
        }

        res.end();
    } catch (error) {
        console.error("Streaming error:", error);

        if (!res.headersSent) {
            res.status(500).json({ error: "Streaming error" });
        } else {
            res.end();
        }
    }
});

app.post("/server/generate-title", async (req, res) => {
    try {
        const { messagesAi } = req.body;
        const prompt = `
            MessagesAi: ${JSON.stringify(messagesAi)}

            Using the MessagesAi data, I want you to generate a convo title that matches the messages topic.
            STRICTLY RETURN ONLY A TITLE TEXT FOR THE CONVO AND NOTHING ELSE!
        `
        const persona = { role: "user", parts: [{ text: prompt }] };
        const result = await getModel.generateContent({ contents: [persona] });

        const reply =
            result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Hmm, di ko alam paano sagutin yan.";
        res.json({title: reply});

    } catch (error) {
        console.log(error);
    }
})

app.listen(3000, "0.0.0.0", () => {
    console.log(`🚀 BryTech server is running on port ${3000}`);
    console.log("🌐 Allowed URLs:", origins);
});