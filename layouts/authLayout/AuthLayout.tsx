import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import styles from './AuthLayout.module.scss';

import { Topbar } from '@/shared';

const AuthLayout = function ({
  children,
  id,
  withBanner,
  bannerText,
  withSubText,
  subText,
  bannerLink,
  withLogo,
}: any) {
  return (
    <div id={styles[id]} className={styles.authPage}>
      {/* <Topbar withLogo={withLogo} /> */}

      <div className={styles.mainWrapper}>
        {withBanner && (
          <div className={styles.banner}>
            {withLogo && (
              <Link href="/">
                <a className={styles.logo}>
                  <Image src="/svg/kwek-logo-white.svg" width="150" height="25" />
                </a>
              </Link>
            )}
            <h1 className={styles.banner_text}>
              {bannerText.lineOne} <br /> {bannerText.lineTwo} <br /> {bannerText.lineThree}
            </h1>
            {withSubText && <h2 className={styles.subText}>{subText}</h2>}
            {bannerLink && (
              <div className={styles.banner_link}>
                <Link href="#0">
                  <a className={styles.banner_link}>
                    <button className={`btn ${styles.btn}`}>
                      <div className={styles.btn_text}>Shop with Kwek</div>
                      <Image className={styles.btn_icon} src="/svg/arrow-right-red.svg" width="24" height="11.6" />
                    </button>
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}

        <div className={withBanner ? styles.formContainer : styles.formContainer__full}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
