<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import app from './components/app.svelte';
  import register from './components/register.svelte';
  import login from './components/login.svelte';
</script>

<Router>
  <Route path="/">
    <div class="header">
      <h1>ChatApp</h1>
      <div class="options-container">
        <div class="button"><Link to="/register">Register</Link></div>
        <div class="button"><Link to="/login">Login</Link></div>
      </div>
    </div>

    <div class="welcome">
      <h1>
        Welcome to ChatApp, the world's best single channel chat application...
        According to us.
      </h1>
    </div>

    <div class="review">
      <h1>
        "The #1 way to get harrassed on the internet."<br /> - Anonymous user
      </h1>
    </div>

    <div class="copyright">
      <h6>© ChatApp incorporated 2023</h6>
    </div>
  </Route>
  <Route path="app" component={app} />
  <Route path="register" component={register} />
  <Route path="login" component={login} />
</Router>

<style lang="scss">
  @use './lib/styles/colours.scss' as colours;

  .button {
    // styles here :)
  }

  .options-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    // perhaps some more stuff? hmmmmmmmmmmmmmmmmm ¯\_(ツ)_/¯
  }

  .header {
    background-color: colours.$grey;
    color: colours.$black;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
