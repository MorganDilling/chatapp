<script lang=ts>
	import {Link} from 'svelte-routing';
</script>
<main class=center>
	<h1>ChatApp</h1>
	<input type="text" id="username" name="username" placeholder="USERNAME" >
	<input type="password" id="password"  name="password" placeholder="PASSWORD">
	<button>REGISTER</button>
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

	#username {
		display: block;
		width: 298px;
		border-left: none;
		border-top: none;
		border-right: none;
		border-width:3px;
		border-color: white;
		position: relative;
		display:block;
		margin : 0 auto;
		font-size: 36px;
		padding: 0px;
		margin-top: 16px;
		margin-bottom: 39px;
		outline: none;
		background-color: colours.$primary;
		color: white;

	}

	#password {
		display: block;
		width: 298px;
		border-left: none;
		border-top: none;
		border-right: none;
		border-width:3px;
		border-color: white;
		position: relative;
		display:block;
		margin : 0 auto;
		font-size: 36px;
		padding: 0px;
		margin-bottom: 39px;
		outline: none;
		background-color: colours.$primary;
		color: white;

		
	}
	button{
		width: 298px;
		height: 70px;
		font-size: 36px;
		padding: 0px;
		margin-top: 15px;
		border:none;
		color: colours.$primary;
		font-weight: bold;
	}

	p{
		width: 298px;
		position: relative;
		display: block;
		margin :0 auto;
		font-size: 24px;
		color: white;
		
	}

	h1{
		font-size: 96px;
		margin: 0px;
		color: white
	}


	


</style>