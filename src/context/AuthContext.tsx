import React, { createContext, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    type User, 
    signInWithPopup, 
    signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Sync with Firestore on every login to ensure data is fresh
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: serverTimestamp(),
                // Keep existing fields if they exist
                updatedAt: serverTimestamp()
            }, { merge: true });
            
            // Initialize defaults only if they don't exist
            const userSnap = await getDoc(userRef);
            if (!userSnap.data()?.bio) {
                await setDoc(userRef, {
                    bio: "New artist in the Cypher.",
                    level: 1,
                    xp: 0
                }, { merge: true });
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
