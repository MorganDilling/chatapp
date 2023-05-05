<script lang="ts">
  import { ThreeDotsVertical, Send } from 'svelte-bootstrap-icons';
  import { onMount, onDestroy } from 'svelte';
  import { autheduser, pb } from '../lib/PocketBase';
  import { writable } from 'svelte/store';
  import Message from './Message.svelte';
  import Menu from './menu.svelte';
  import { navigate } from 'svelte-navigator';

  let menuOpened = false;
  let message: string;
  const messages = [];
  const messagesWritable = writable(messages);

  onMount(async () => {
    if (!$autheduser) {
      navigate('/login', { replace: true });
      return;
    }

    const resultList = await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });

    resultList.items.forEach((item) => {
      messages.unshift(item);
    });

    messagesWritable.set(messages);

    pb.collection('messages').subscribe('*', async ({ action, record }) => {
      if (action === 'create') {
        const user = await pb.collection('users').getOne(record.user);

        record.expand = { user };

        messages.unshift(record);
        messagesWritable.set(messages);
      }
    });
  });

  onDestroy(async () => {
    await pb.collection('messages').unsubscribe('*');
  });

  const sendMessage = async () => {
    try {
      await pb.collection('messages').create({
        message,
        user: $autheduser.id,
      });
    } catch {}
    message = '';
  };
</script>

<main>
  <div class="ChatApp">
    <h1>ChatApp</h1>
  </div>
  <button
    on:click={() => {
      menuOpened = true;
    }}
    class="threeDotsVertical"><ThreeDotsVertical style="scale: 2" /></button
  >
  <div class="message-container">
    {#each $messagesWritable as message}
      {#if message.expand.user}
        <Message
          username={message.expand.user.username}
          record={message.expand.user}
          creationDate={new Date(message.created)}>{message.message}</Message
        >
      {/if}
    {/each}
  </div>
  <div class="input-box-container">
    <form on:submit|preventDefault={sendMessage} class="input-box">
      <input
        bind:value={message}
        type="text"
        placeholder="Type something ..."
      />
      <button class="send"><Send style="scale: 1.5;" /></button>
    </form>
  </div>
  <Menu visible={menuOpened} bind:sharedVisible={menuOpened} />
</main>

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  main {
    background-color: colours.$primary;
    width: 100%;
    height: 100%;
  }
  input {
    background: none;
    border: none;
    outline: none;
  }
  h1 {
    position: absolute;
    font-family: outfit;
    top: 0;
    left: 0;
    font-size: 25px;
    padding: 0;
    margin: 0;
    color: colours.$text;
  }
  .input-box-container {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 75px;
    font-size: 20px;
  }
  .input-box {
    border: none;
    border-top: 2px solid white;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .threeDotsVertical {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    background-color: transparent;
    aspect-ratio: 1/1;
    height: 50px;
    padding: 0;
    margin: 0;
    color: white;
    cursor: pointer;
  }
  .send {
    border: none;
    background-color: transparent;
    aspect-ratio: 1/1;
    height: 50px;
    padding: 0;
    margin: 0;
    color: white;
    cursor: pointer;
  }
  input {
    color: white;
    font-size: 20px;
    width: 100%;
  }
  .message-container {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 90%;
    height: 84%;
    overflow-y: scroll;
    flex-direction: column-reverse;
    color: whitesmoke;
  }
</style>
