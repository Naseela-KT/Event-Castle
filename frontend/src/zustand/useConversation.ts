/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages: any) => set({ messages }),
}));

export default useConversation;