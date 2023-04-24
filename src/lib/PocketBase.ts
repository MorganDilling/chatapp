import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase("https://chatapp-api.morgandilling.dev")

export const autheduser =writable(pb.authStore.model)

export const login = async (username: string, password: string) => {
  await pb.collection('users').authWithPassword(username, password);
};

export const logout = async () => {
  pb.authStore.clear();
};

pb.authStore.onChange((auth) => {
  autheduser.set(pb.authStore.model);
});

