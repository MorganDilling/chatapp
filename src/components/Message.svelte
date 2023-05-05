<script lang="ts">
  import { pb } from '../lib/PocketBase';

  export let username: string;
  export let creationDate: Date;
  export let record: any;

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
</script>

<div class="container">
  <div style="flex: 0 1 50px; padding: 5px;">
    <img alt="profile" src={resolveProfile(record)} class="profile" />
  </div>
  <div style="flex: 1 1 auto;">
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
  </div>
</div>

<style lang="scss">
  @use '../lib/styles/colours.scss' as colours;

  .container {
    width: 500px;
    display: flex;
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
