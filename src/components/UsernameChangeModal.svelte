<script lang="ts">
  import { pb, autheduser } from '../lib/PocketBase';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import InputDark from './InputDark.svelte';

  export let visible = false;
  export let sharedVisible = false;

  let username: string;

  const ChangeUsernameHandler = async () => {
    await pb.collection('users').update($autheduser.id, { username });
    visible = false;
    sharedVisible = false;
    navigate('/app', { replace: true });
  };
</script>

{#if visible}
  <div class="background">
    <main class="main">
      <div class="center">
        <h1>CHANGE USERNAME</h1>
        <InputDark
          type="text"
          name="new-username"
          placeholder="New username"
          bind:value={username}
        />
        <div class="options">
          <button
            on:click={() => {
              visible = false;
              sharedVisible = false;
            }}
            class="cancel">CANCEL</button
          >
          <button on:click={ChangeUsernameHandler} class="confirm"
            >CHANGE!</button
          >
        </div>
      </div>
    </main>
  </div>
{/if}

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  button {
    outline: none;
    border: none;
    font-weight: 700;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .cancel {
    background-color: colours.$error;
    color: white;
  }
  .confirm {
    color: white;
    background: colours.$primary;
  }
  h1 {
    text-align: center;
    margin: 0;
  }

  .main {
    background-color: colours.$text;
    // width: 450px;
    // height: 250px;
    padding: 20px;
  }

  .options {
    display: flex;
    justify-content: space-evenly;
    width: 70%;
  }
</style>
