<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import app from './components/app.svelte';
  import register from './components/register.svelte';
  import login from './components/login.svelte';
</script>

<Router>
  <Route path="/">
    <Link to="/register">register</Link>  
  </Route>

  <Route path="app" component={app} />
  <Route path="register" component={register} />
  <Route path="login" component={login} />
</Router>
