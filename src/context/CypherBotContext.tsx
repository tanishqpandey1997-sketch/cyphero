import { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface CypherBotContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggleBot: () => void;
    messages: Message[];
    sendMessage: (content: string) => Promise<void>;
    isTyping: boolean;
}

const CypherBotContext = createContext<CypherBotContextType | undefined>(undefined);

// Initialize Gemini
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `You are CypherBot, the legendary AI music producer and industry mentor for the CypherConnect platform. 
    Your persona is edgy, futuristic, and highly technical. You talk like a seasoned pro who has worked in high-end studios but cares about the underground.
    
    Expertise:
    1. Audio Engineering: Mixing frequencies (EQ, Compression), Sidechaining, Vocal Chains.
    2. Songwriting: Rhyme schemes, flow patterns, lyrical themes.
    3. Community: How to build a brand on CypherConnect, finding collabs.
    
    If a user asks for feedback, give specific technical advice (e.g., "Boost the 5kHz on those vocals to cut through the 808s").
    Keep responses concise, impactful, and "in the culture." Never be overly corporate.`
});

export function CypherBotProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: '1', 
            role: 'assistant', 
            content: "Yo! I'm CypherBot. Your personal producer AI. I'm tapped into the global sound. What we cookin' today? Mix feedback? New hooks? Bar analysis? Let me know.", 
            timestamp: new Date() 
        }
    ]);

    const toggleBot = useCallback(() => setIsOpen(prev => !prev), []);

    const sendMessage = async (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            console.log("CypherBot: Sending message to Gemini...", content);
            
            // Prepare chat history for Gemini
            const history = messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            }));

            const chat = model.startChat({ history });
            const result = await chat.sendMessage(content);
            const response = await result.response;
            let text = response.text();

            console.log("CypherBot: Received response:", text);

            // Handle potential markdown code blocks in JSON responses
            if (text.includes("```json")) {
                text = text.split("```json")[1].split("```")[0].trim();
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: text,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error: any) {
            console.error("CypherBot AI Error:", error);
            
            let descriptiveError = "My connection to the mainframe is glitchy right now.";
            if (error?.message?.includes("API_KEY_INVALID")) {
                descriptiveError = "Your Gemini API Key seems to be invalid. Please double-check it in the .env file.";
            } else if (error?.message?.includes("safety")) {
                descriptiveError = "I can't answer that due to safety filters. Let's keep it strictly about the music.";
            } else if (error?.message) {
                descriptiveError = `System Error: ${error.message}`;
            }

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: descriptiveError,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <CypherBotContext.Provider value={{ isOpen, setIsOpen, toggleBot, messages, sendMessage, isTyping }}>
            {children}
        </CypherBotContext.Provider>
    );
}

export function useCypherBot() {
    const context = useContext(CypherBotContext);
    if (context === undefined) {
        throw new Error("useCypherBot must be used within a CypherBotProvider");
    }
    return context;
}
