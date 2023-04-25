<script lang="ts">
  export let type: string;
  export let name: string;
  export let placeholder: string;
</script>

<div class="input-container">
  <input required {type} {name} id={name} class="input-field" />
  <label for={name} class="input-label">{placeholder}</label>
</div>

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  .input-container {
    position: relative;
    width: 298px;
    height: 60px;
    margin-top: 20px;
  }

  .input-label,
  .input-field {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .input-field {
    z-index: 1;
    outline: none;
    border: none;
    border-bottom: 2px solid colours.$text;
    font-size: 32px;
    background: none;
    color: colours.$text;
    width: 100%;
    height: 100%;
  }

  .input-label {
    z-index: 2;
    font-size: 32px;
    text-align: left;
    text-transform: uppercase;
    color: colours.$text;
    opacity: 0.5;
    top: 10px;

    user-select: none;
    cursor: text;

    transition: transform 0.3s, font-size 0.3s;
  }

  .input-field:focus ~ .input-label,
  .input-field:valid ~ .input-label {
    transform: translate(0px, -20px);
    font-size: 24px;
  }
</style>
