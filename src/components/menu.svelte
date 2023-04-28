<script lang="ts">
    import { fly } from 'svelte/transition';
</script>
<main transition:fly="{{ x: 200, duration: 750 }}">
    <button>CHANGE USERNAME</button>
    <button>CHANGE PASSWORD</button>
    <button>CHANGE PROFILE PIC</button>
    <button class="small redbutton">LOG OUT</button>
    <button class="redbutton bigspace">DELETE ACCOUNT</button>
    <button class="small" >CLOSE</button>
</main>

<style lang="scss">
    @use '../lib/styles/colours.scss' as colours;
    main {
        float: right;
        background-color: white;
        width: 315.01px;
        height: 100vh;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    button {
        display: block;
        text-align: center;  
        width: 75%;
        height: 82.5px;
        font-size: 26.25px;
        font-weight: 700;  
        color: white;   
        background-color: colours.$primary; 
        border: none;
        outline: none;
        margin-bottom: 23px;
    }
    .small{
        height: 54px;
        display: block;
        text-align: center;
    }
    .redbutton {
        background-color: colours.$error;
   
    }
    .bigspace{
        margin-bottom: 154.6875px;
    }
</style>