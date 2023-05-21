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

      <div class="warning">
        Please note that after the 23rd of May 2023, this application will no
        longer operate due to the shutdown of the back-end server.
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
      <div class="examples">
        <h3>
          As this application no longer works, here are some screenshots of it
          in action.
        </h3>

        <br />

        <img src="SCR-20230521-hqa.png" alt="ChatApp screenshot" />

        <img src="SCR-20230521-i62.png" alt="ChatApp screenshot" />

        <img src="SCR-20230521-ih2.png" alt="ChatApp screenshot" />

        <img
          style="width: 50%"
          src="SCR-20230521-iih.png"
          alt="ChatApp screenshot"
        />

        <img
          style="width: 50%"
          src="SCR-20230521-ikb.png"
          alt="ChatApp screenshot"
        />
      </div>

      <div class="copyright">
        <h6>
          <a
            style="font-size: 20px; color: black; font-weight: 300; cursor: pointer;"
            href="https://github.com/MorganDilling/chatapp"
            >https://github.com/MorganDilling/chatapp</a
          >
        </h6>
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
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }

  .warning {
    background-color: #ff9f3f;
    color: colours.$text;
    padding: 12px;
    text-align: center;
  }

  .welcome {
    padding: 150px;
  }

  .examples {
    padding: 100px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      height: auto;
      margin-bottom: 20px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    }
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
  @media only screen and (max-width: 600px) {
    .options-container {
      flex-direction: column;
    }

    .button {
      width: 100%;
    }

    .welcome {
      padding: 50px;
    }

    .examples {
      padding: 50px;

      img {
        width: 100% !important;
      }
    }

    .review {
      padding: 50px;
    }
  }
</style>
