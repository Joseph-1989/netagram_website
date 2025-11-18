'use client';

import { useEffect, useMemo } from 'react';
import styles from './page.module.css';

type PageProps = {
  params: {
    friendId: string;
  };
};

const APP_STORE_URL = 'https://apps.apple.com/kr/app/netagram/id6753970208';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.jejecomms.netagram';
const WEB_FALLBACK_URL = 'https://www.netagram.net';

export default function AddFriendFallback({ params }: PageProps) {
  const userAgent =
    typeof navigator === 'undefined' ? '' : navigator.userAgent.toLowerCase();

  const platform = useMemo(() => {
    if (!userAgent) return 'unknown';
    if (/iphone|ipad|ipod|macintosh/.test(userAgent)) return 'ios';
    if (/android/.test(userAgent)) return 'android';
    return 'unknown';
  }, [userAgent]);

  useEffect(() => {
    if (platform === 'ios') {
      window.location.replace(APP_STORE_URL);
    } else if (platform === 'android') {
      window.location.replace(PLAY_STORE_URL);
    }
  }, [platform]);

  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <h1 className={styles.title}>Add friend via Netagram</h1>
        <p className={styles.description}>
          You are trying to add friend ID <span>{params.friendId}</span>.
        </p>
        <p className={styles.description}>
          Install the Netagram mobile app to continue. If you already have the
          app, open it directly and search for the ID above.
        </p>
        <div className={styles.actions}>
          <a className={styles.buttonPrimary} href={APP_STORE_URL}>
            Open in App Store
          </a>
          <a className={styles.buttonSecondary} href={PLAY_STORE_URL}>
            Open in Play Store
          </a>
        </div>
        <a className={styles.backLink} href={WEB_FALLBACK_URL}>
          Continue on netagram.net
        </a>
      </section>
    </main>
  );
}
