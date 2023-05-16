<script lang="ts">
  import { Router, Route, Link } from 'svelte-navigator';
  import app from './components/app.svelte';
  import register from './components/register.svelte';
  import login from './components/login.svelte';
</script>

<Router primary={false}>
  <Route path="/">
    <main>
      <div class="header">
        <h1>ChatApp</h1>
        <div class="options-container">
          <Link style="text-decoration: none;" to="/register"
            ><div class="button highlight">Register</div></Link
          >
          <Link style="text-decoration: none;" to="/login"
            ><div class="button">Login</div></Link
          >
        </div>
      </div>

      <div class="welcome">
        <h1>
          Welcome to ChatApp, the world's best single channel chat
          application... According to us.
        </h1>
      </div>

      <div class="review">
        <h1>
          "The #1 way to get harrassed on the internet."<br /> - Anonymous user
        </h1>
      </div>
    </main>
  </Route>
  <Route path="app" component={app} />
  <Route path="register" component={register} />
  <Route path="login" component={login} />
</Router>

<style lang="scss">
  @use './lib/styles/colours.scss' as colours;

  main {
    width: 100%;
  }

  .button {
    width: 235px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    text-transform: uppercase;
    font-weight: 700;
    background-color: colours.$text;
    color: colours.$primary;
    vertical-align: center;
  }

  .highlight {
    background-color: colours.$primary;
    color: colours.$text;
  }

  .options-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .header {
    background-color: colours.$grey;
    color: colours.$black;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    left: 0;
    top: 0;
    position: sticky;
  }

  .welcome {
    padding: 150px;
  }
  .copyright {
    text-align: center;
  }
  .review {
    background-color: colours.$grey;
    color: colours.$black;
    padding: 150px;
    text-align: left;
  }
</style>
