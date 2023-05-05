<script lang="ts">
  import { pb, autheduser } from '../lib/PocketBase';
  import {
    ThreeDotsVertical,
    TrashFill,
    Clipboard2Fill,
    FlagFill,
    ReplyFill,
    PencilFill,
  } from 'svelte-bootstrap-icons';
  import { clickOutside } from '../lib/clickOutside';

  export let username: string;
  export let creationDate: Date;
  export let record: any;
  export let messageId: string;

  let optionsModalShown = false;

  const resolveProfile = (rcd: any): string => {
    if (rcd?.avatar) {
      const url = pb.files.getUrl(rcd, rcd.avatar);
      return url;
    }

    return '/profile.svg';
  };

  const resolveBadge = (badge: string): string => {
    switch (badge) {
      case 'developer':
        return '/developer-badge.svg';
      case 'verified':
        return '/verified-badge.svg';
      case 'admin':
        return '/admin-badge.svg';
      case 'george':
        return '/george-badge.svg';
      default:
        return '';
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (date.toDateString() === today.toDateString()) {
      return `• today at ${timeString}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `• yesterday at ${timeString}`;
    } else {
      return `• ${dateString} at ${timeString}`;
    }
  };

  const deleteMessage = () => {
    pb.collection('messages').delete(messageId);
    optionsModalShown = false;
  };
</script>

<div class="container" class:clicked={optionsModalShown === true}>
  <div style="flex: 0 1 50px; padding: 5px;">
    <img alt="profile" src={resolveProfile(record)} class="profile" />
  </div>
  <div style="flex: 1 1 auto; position: relative;">
    <div class="messagetitle">
      <div class="user">{username}</div>
      <div class="badges">
        {#each record.badges as badge}
          <div class="badge">
            <img alt={badge} src={resolveBadge(badge)} width="20" height="20" />
            <div class="tooltip">
              {badge.charAt(0).toUpperCase() + badge.slice(1)}
            </div>
          </div>
        {/each}
      </div>
      <div class="whenrecieved">{formatDate(creationDate)}</div>
    </div>
    <div class="message"><slot /></div>
    <button
      on:click={(event) => {
        optionsModalShown = !optionsModalShown;
        event.stopPropagation();
      }}
      class="options"
      ><ThreeDotsVertical
        style="scale: 1.5; fill: rgba(255, 255, 255, 0.5);"
      /></button
    >
    <button class="reply"
      ><ReplyFill style="scale: 1.5; fill: rgba(255, 255, 255, 0.5);" /></button
    >
    {#if optionsModalShown}
      <div
        class="options-modal"
        use:clickOutside={() => {
          optionsModalShown = false;
        }}
      >
        <button>Reply <ReplyFill /></button>
        {#if username === $autheduser.username}
          <button>Edit <PencilFill /></button>
          <button class="danger" on:click={deleteMessage}
            >Delete message <TrashFill /></button
          >
        {:else}
          <button class="danger">Report message <FlagFill /></button>
        {/if}
        <button
          on:click={() => {
            navigator.clipboard.writeText(messageId);
            optionsModalShown = false;
          }}>Copy ID <Clipboard2Fill /></button
        >
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  .options {
    visibility: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .reply {
    visibility: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .options-modal {
    position: absolute;
    bottom: 0;
    right: 40px;
    width: 150px;
    background-color: colours.$dark-grey;
    padding: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 500;

    button {
      background: none;
      border: none;
      outline: none;
      color: colours.$text;
      cursor: pointer;
      width: 100%;
      height: 30px;
      text-align: left;

      margin: 1px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;

      &:hover {
        background-color: colours.$primary;
      }

      &.danger {
        color: colours.$error;

        &:hover {
          background-color: colours.$error;
          color: colours.$text;
        }
      }
    }
  }

  .container {
    width: 100%;
    display: flex;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-top: 1px;
    margin-bottom: 1px;
    &:hover,
    &.clicked {
      background-color: rgba(0, 0, 0, 0.15);
      .options {
        visibility: visible;
      }

      .reply {
        visibility: visible;
      }
    }
  }

  .badges {
    display: flex;
    background: none;
    justify-content: center;
    flex-direction: row;
  }

  .badge {
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    img {
      aspect-ratio: 1/1;
      width: 20px;
      height: 20px;
    }

    &:hover .tooltip {
      visibility: visible;
    }

    .tooltip {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 150%;
      left: 50%;
      margin-left: -60px;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }
    }
  }

  .whenrecieved {
    color: rgba(255, 255, 255, 0.5);
    padding-left: 5px;
  }
  .message {
    color: colours.$text;
    display: flex;
    margin: 0px;
    padding: 0px;
    text-align: left;
    word-break: break-word;
  }
  .messagetitle {
    display: flex;
    align-items: center;
    margin: 0px;
    padding: 0px;
    flex-direction: row;
  }
  .user {
    font-weight: bold;
  }

  .profile {
    text-align: center;
    border-radius: 75%;
    display: block;
    height: 45px;
    width: 45px;
    display: flex;
    object-fit: cover;
  }
</style>
