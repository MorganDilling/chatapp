<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { logout } from '../lib/PocketBase';
  import { navigate } from 'svelte-navigator';
  import DeleteAccountModal from './DeleteAccountModal.svelte';
  import ProfileChangeModal from './ProfileChangeModal.svelte';
  import UsernameChangeModal from './UsernameChangeModal.svelte';

  export let visible = false;
  export let sharedVisible = false;

  let deleteAccountModalVisible = false;
  let profileAccountModalVisible = false;
  let usernameModalVisible = false;

  const Logout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };
</script>

{#if visible}
  <button
    on:click={() => {
      visible = false;
      sharedVisible = false;
    }}
    transition:fade={{ duration: 750 }}
    class="background"
  />
  <main transition:fly={{ x: 200, duration: 750 }}>
    <button on:click={() => (usernameModalVisible = true)}
      >CHANGE USERNAME</button
    >
    <button on:click={() => (profileAccountModalVisible = true)}
      >CHANGE PROFILE PIC</button
    >
    <button on:click={Logout} class="small redbutton">LOG OUT</button>
    <button
      on:click={() => {
        deleteAccountModalVisible = true;
      }}
      class="redbutton bigspace">DELETE ACCOUNT</button
    >
    <button
      on:click={() => {
        visible = false;
        sharedVisible = false;
      }}
      class="small">CLOSE</button
    >
  </main>
{/if}

<DeleteAccountModal
  visible={deleteAccountModalVisible}
  bind:sharedVisible={deleteAccountModalVisible}
/>

<ProfileChangeModal
  visible={profileAccountModalVisible}
  bind:sharedVisible={profileAccountModalVisible}
/>

<UsernameChangeModal
  visible={usernameModalVisible}
  bind:sharedVisible={usernameModalVisible}
/>

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  main {
    right: 0;
    position: absolute;
    background-color: white;
    width: 315.01px;
    height: 100vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 20;
  }
  button {
    display: block;
    text-align: center;
    width: 75%;
    height: 82.5px;
    font-size: 26.25px;
    font-weight: 700;
    color: white;
    background-color: colours.$primary;
    border: none;
    outline: none;
    margin-bottom: 23px;
    cursor: pointer;
  }
  .small {
    height: 54px;
    display: block;
    text-align: center;
  }
  .redbutton {
    background-color: colours.$error;
  }
  .bigspace {
    margin-bottom: 154.6875px;
  }
</style>
