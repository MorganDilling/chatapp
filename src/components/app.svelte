<script lang="ts">
  import { ThreeDotsVertical, Send } from 'svelte-bootstrap-icons';
</script>

<main>
  <div class="ChatApp">
    <h1>ChatApp</h1>
  </div>
  <button class="threeDotsVertical"
    ><ThreeDotsVertical style="scale: 2" /></button
  >
  <div class="message-container">
    <div>bitch</div>
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
    background-color: red;
    display: flex;
    justify-content: center;
  }
</style>
