
import { create } from "zustand";

const useUserStore = create((set) => ({
    user:null,
    update:(user) => set({user:user})
}));

const useErrorStore = create((set) => ({
    error:null,
    update:(error) => set({error:error ? error : "Wystąpił nieoczekiwany błąd"}),
    disable:() => set({error:null})
}));

const useDeleteConfirmStore = create((set) => ({
    active:false,
    update:(active, onConfirm) => set({active, onConfirm}),
    onConfirm:() => {},
    onCancel:() => set({active:false})
}));

const useUpdateDataStore = create((set) => ({
    data:null,
    update:(data) => set({data})
}))

export {useUserStore, useErrorStore, useDeleteConfirmStore, useUpdateDataStore}