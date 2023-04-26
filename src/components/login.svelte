<script lang="ts">
    import { Link } from 'svelte-routing';
    import Input from './Input.svelte';
  </script>
  
  <main>
    <h1>ChatApp</h1>
    <form on:submit|preventDefault>
      <Input type="text" name="username" placeholder="username" />
      <Input type="password" name="password" placeholder="password" />
      <button>LOG IN</button>
    </form>
    <div class="no-account">
      <p>Don't have an account?</p>
      <Link to="/register">Register here.</Link>
    </div>
  </main>
  
  <style lang="scss">
    @use '../lib/styles/colours.scss' as colours;
  
    .no-account > * {
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
  </style>