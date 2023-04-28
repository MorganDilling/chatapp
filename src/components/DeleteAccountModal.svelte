<script lang="ts">
  import { pb, autheduser } from '../lib/PocketBase';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';

  export let visible = false;
  export let sharedVisible = false;

  async function DeleteUserHandler() {
    await pb.collection('users').delete($autheduser.id);
    navigate('/login', { replace: true });
  }
</script>

{#if visible}
  <div class="background">
    <main class="main">
      <div class="center">
        <h1>ARE YOU SURE?</h1>
        <p>Delete account</p>
        <div class="options">
          <button
            on:click={() => {
              visible = false;
              sharedVisible = false;
            }}
            class="cancel">CANCEL</button
          >
          <button on:click={DeleteUserHandler} class="delete">DELETE</button>
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
    color: white;
    background: colours.$primary;
  }
  .delete {
    background-color: colours.$error;
    color: white;
  }
  h1 {
    text-align: center;
    margin: 0;
  }
  p {
    text-align: center;
    margin: 20px;
    margin-top: 18px;
  }

  .main {
    background-color: colours.$text;
    width: 400px;
    height: 200px;
  }

  .options {
    display: flex;
    justify-content: space-evenly;
    width: 70%;
  }
</style>
