<script lang="ts">
  import { ThreeDotsVertical, Send } from 'svelte-bootstrap-icons';
  import { onMount, onDestroy } from 'svelte';
  import { user, pb } from '../lib/PocketBase';
  import Message from './Message.svelte';

  let newMessage: string;
  let messages = [];
  let unsubscribe: () => void;

  onMount(async () => {
    const resultList = await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'username',
    });
    messages = resultList.items;

    pb.collection('messages').subscribe('*', async ({ action, record }) => {
      if (action === 'create') {
        const user = await pb.collection('users').getOne(record.user);
        messages = [...messages, record];
      }
    });
  });
  async function sendMessage() {
    const data = {
      text: messages,
      user: $user.id,
    };
    const createdMessage = await pb.collection('messages').create(data);
  }
</script>

<main>
  <div class="ChatApp">
    <h1>ChatApp</h1>
  </div>
  <button class="threeDotsVertical"
    ><ThreeDotsVertical style="scale: 2" /></button
  >
  <div class="message-container">
    {#each messages as message (message.id)}
      <div class="msg">
        <img
          class="avatar"
          src="https://avatars.dicebear.com/api/avataaars/${message.username}.svg"
          alt="avatar"
          width="40px"
        />
        <div>
          <small>
            sent by @{message.expand?.user?.username}
          </small>
          <p class="msg-text">{message.text}</p>
        </div>
      </div>
    {/each}
  </div>
  <div class="input-box-container">
    <div class="input-box">
      <input type="text" placeholder="Type something ..." />
      <button class="send"><Send style="scale: 2;" /></button>
    </div>
  </div>
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
  textarea,
  input {
    color: white;
    font-size: 30px;
    width: 100%;
  }
  .message-container {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 85%;
  }
</style>
