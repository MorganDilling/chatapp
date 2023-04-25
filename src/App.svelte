<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import app from './components/app.svelte';
  import register from './components/register.svelte';
  import login from './components/login.svelte';
</script>

<Router>
  <Route path="/">
    <div class="Header">
      <h1>ChatApp</h1>
      <div>
        <div class="register"><Link to="/register">Register</Link></div>
        <div class="login"><Link to="/login">Login</Link></div>
      </div>
    </div>

    <div class="welcome">
      <h2>
        Welcome to ChatApp, the world's best single channel chat
        applications...According to us.
      </h2>
    </div>

    <div class="review">
      <h2>"The #1 way to get harrassed on the internet."-Anonymous user</h2>
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
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');
  * {
    margin: 0px;
    padding: 0px;
  }

  .Header {
    background-color: #d9d9d9;
    color: black;
    padding: 12px;
    // padding-right: 1100px;
    display: flex;
    justify-content: space-between;
  }
  // .register {
  //   // text-align: right;
  //   // padding-right: 48px;
  //   // padding-top: 12px;
  // }

  // .login {
  //   text-align: right;
  //   padding-right: 48px;
  //   padding-top: 12px;
  // }
  .welcome {
    font-size: 20px;
    font-family: outfit;
    padding: 150px;
  }
  .copyright {
    text-align: center;
    top: 0px;
  }
  .review {
    font-size: 20px;
    font-family: outfit;
    background-color: #d9d9d9;
    color: black;
    padding: 150px;
    text-align: left;
  }
</style>
