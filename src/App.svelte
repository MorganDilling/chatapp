<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import app from './components/app.svelte';
  import register from './components/register.svelte';
  import login from './components/login.svelte';
  import pocketbase from 'pocketbase';
  const client = pocketbase({
    apiKey: 'API_KEY',
    databaseUrl: 'DATABASE_URL',
  });
</script>

<Router>
  <Route path="app" component={app} />
  <Route path="register" component={register} />
  <Route path="login" component={login} />
</Router>
