<script lang="ts">
  import { Link, navigate } from 'svelte-navigator';
  import Input from './Input.svelte';
  import { register, login } from '../lib/PocketBase';

  let username: string;
  let password: string;
  let errorDisplayed = false;
  let errorMessage = '';

  const Register = () => {
    if (username.length < 3) {
      errorDisplayed = true;
      errorMessage = 'Username must have minimum 3 characters';
      return;
    }
    if (password.length < 8) {
      errorDisplayed = true;
      errorMessage = 'Password must have minimum 8 characters';
      return;
    }
    register(username, password);
    login(username, password);
    navigate('/app', { replace: true });
  };
</script>

<main>
  <h1>ChatApp</h1>
  <form
    style="display:flex; justify-content: center; align-items: center; flex-direction: column;"
    on:submit|preventDefault={Register}
  >
    <Input
      bind:value={username}
      type="text"
      name="username"
      placeholder="username"
    />
    <Input
      bind:value={password}
      type="password"
      name="password"
      placeholder="password"
    />
    {#if errorDisplayed == true}
      <p class="error">{errorMessage}</p>
    {/if}
    <button>REGISTER</button>
  </form>
  <div class="already-account">
    <p>Already have an account?</p>
    <Link to="/login">Log in here.</Link>
  </div>
</main>

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  .already-account > * {
    font-weight: 300;
  }

  form {
    margin-bottom: 20px;
  }

  main {
    background-color: colours.$primary;
    width: 100vw;
    height: 100vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  button {
    width: 298px;
    height: 70px;
    font-size: 36px;
    padding: 0px;
    margin-top: 15px;
    border: none;
    color: colours.$primary;
    font-weight: 700;
    cursor: pointer;
  }

  p {
    width: 298px;
    position: relative;
    display: block;
    margin: 0 auto;
    font-size: 24px;
    color: white;
  }

  h1 {
    font-size: 96px;
    margin: 0px;
    color: white;
  }

  .error {
    color: colours.$error;
  }
</style>
