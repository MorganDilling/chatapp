<script lang="ts">
  import { pb, autheduser } from '../lib/PocketBase';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { Upload } from 'svelte-bootstrap-icons';

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  let file: File | undefined;

  const getFileData = (
    event: Event
  ): Promise<{ content: string; file: File }> => {
    return new Promise((resolve, reject) => {
      const fileInput = event.target as HTMLInputElement;

      if (!fileInput.files || fileInput.files.length === 0) {
        reject('No file selected');
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result as string;
        resolve({ content, file });
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsDataURL(file);
    });
  };

  export let visible = false;
  export let sharedVisible = false;

  let profile: string;

  const ChangeProfileHandler = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);

    await pb.collection('users').update($autheduser.id, formData);
    visible = false;
    sharedVisible = false;
  };
</script>

{#if visible}
  <div class="background">
    <main class="main">
      <div class="center">
        <h1>UPLOAD PROFILE PICTURE</h1>
        <img
          alt="profile"
          src={!!profile ? profile : '/profile.svg'}
          class="profile"
          width="150"
          height="150"
        />
        {#if file}
          <p style="display:flex;justify-content:center;align-items:center;">
            {file?.name}
          </p>
        {/if}
        <form
          on:submit|preventDefault={ChangeProfileHandler}
          style="display: flex; align-items: center; flex-direction: column;"
        >
          <div style="margin: 20px;">
            <button
              style="display:flex;justify-content:center;align-items:center;"
              type="button"
              on:click={() => {
                const fileInput = document.getElementById('file_upload');
                fileInput?.click();
              }}><Upload style="margin-right:5px" />Upload picture</button
            >
            <input
              style="display:none;"
              id="file_upload"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="avatar"
              on:change={async (e) => {
                const content = await getFileData(e);

                if (content) {
                  file = content.file;
                  profile = content.content;
                }
              }}
            />
          </div>
          <div class="options">
            <button
              on:click={() => {
                visible = false;
                sharedVisible = false;
              }}
              class="cancel">CANCEL</button
            >
            <button type="submit" class="confirm">CHANGE!</button>
          </div>
        </form>
      </div>
    </main>
  </div>
{/if}

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  .profile {
    border-radius: 50%;
    margin: 20px;
  }

  button {
    outline: none;
    border: none;
    font-weight: 700;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .cancel {
    background-color: colours.$error;
    color: white;
  }
  .confirm {
    color: white;
    background: colours.$primary;
  }
  h1 {
    text-align: center;
    margin: 0;
  }

  .main {
    background-color: colours.$text;
    // width: 450px;
    // height: 250px;
    padding: 20px;
  }

  .options {
    display: flex;
    justify-content: space-evenly;
    width: 129%;
  }
</style>
