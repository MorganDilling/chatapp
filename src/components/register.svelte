<script lang="ts">
  import { Link } from 'svelte-routing';
  import Input from './Input.svelte';
</script>

<main>
  <h1>ChatApp</h1>
  <form>
    <Input type="text" name="username" placeholder="username" />
    <Input type="password" name="password" placeholder="password" />
    <button>REGISTER</button>
  </form>
  <p>Already have an account?</p>
  <Link to="/login">Log in here.</Link>
</main>

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

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
    font-weight: bold;
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
</style>
