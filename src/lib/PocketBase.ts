import PocketBase from 'pocketbase';
import { select_multiple_value } from 'svelte/internal';
import { writable } from 'svelte/store';

export const pb = new PocketBase("https://chatapp-api.morgandilling.dev")

export const autheduser = writable(pb.authStore.model)

export const login = async (username: string, password: string) => {
  try {
    return await pb.collection('users').authWithPassword(username, password);
  } catch (e) {
    return null
  }
};

export const logout = async () => {
  pb.authStore.clear();
};

export const register = async (username: string, password: string) => {
  await pb.collection('users').create({username, password, passwordConfirm: password})
};


pb.authStore.onChange((auth) => {
  autheduser.set(pb.authStore.model);
});

