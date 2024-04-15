/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const useVendorConversation = create((set) => ({
	selectedConversationV: null,
	setSelectedConversationV: (selectedConversationV: any) => set({ selectedConversationV }),
	messagesV: [],
	setMessagesV: (messagesV: any) => set({ messagesV }),
}));

export default useVendorConversation;