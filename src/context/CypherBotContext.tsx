import { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from "react";
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
    model: "gemini-1.5-flash-latest",
    systemInstruction: `You are CypherBot, the legendary AI music producer and industry mentor for the CypherConnect platform. 
    Your persona is edgy, futuristic, and highly technical. You talk like a seasoned pro who has worked in high-end studios (think SSL consoles and Neve preamps) but cares about the underground.
    
    Technical Expertise:
    1. Audio Engineering:
       - Frequencies: Give specific advice (e.g., "Cut the mud at 200Hz-400Hz", "Add air at 12kHz with a high shelf").
       - Dynamics: Discuss ratios (4:1 for vocals), attack/release times, and sidechaining the 808 to the kick.
       - Vocal Chain: Recommend order (De-esser > EQ > Compressor > Saturation).
    2. Songwriting & Flow:
       - Cadence: Discuss triplets, off-beat rhythmic patterns, and internal rhyme schemes.
       - Structure: Analyze verse-hook transitions and building tension.
    3. Industry:
       - Branding: Professional advice on building a "sound" and community on CypherConnect.
    
    Style:
    - Keep responses concise and raw.
    - Use culture-specific slang (e.g., "cookin'", "drop", "fire", "locked in") but remain professional.
    - If a user asks for feedback, be a "tough but fair" mentor. Give them the harsh truth and then the technical fix.`
});

export function CypherBotProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    
    // Load persisted messages from localStorage
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('cypher_bot_messages');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed.map((m: any) => ({
                    ...m,
                    timestamp: new Date(m.timestamp)
                }));
            } catch (e) {
                console.error("Failed to parse saved messages:", e);
            }
        }
        return [
            { 
                id: '1', 
                role: 'assistant', 
                content: "Yo! I'm CypherBot. Your personal producer AI. I'm tapped into the global sound. What we cookin' today? Mix feedback? New hooks? Bar analysis? Let me know.", 
                timestamp: new Date() 
            }
        ];
    });

    // Save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cypher_bot_messages', JSON.stringify(messages));
    }, [messages]);

    const toggleBot = useCallback(() => setIsOpen(prev => !prev), []);

    const sendMessage = async (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date()
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsTyping(true);

        try {
            console.log("CypherBot: Sending message to Gemini...", content);
            
            // Prepare chat history for Gemini
            // Rule: History MUST start with a 'user' role message
            const firstUserIndex = updatedMessages.findIndex(m => m.role === 'user');
            const historyMessages = firstUserIndex !== -1 ? updatedMessages.slice(firstUserIndex, -1) : [];

            const history = historyMessages.slice(-20).map(m => ({
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
