import { FC, PropsWithChildren } from 'react'
import Link from 'next/link';
import styles from './Button.module.scss';

interface Props {
  path?: string;
}

const Button: FC<Props> = (props: PropsWithChildren<Props>) => {
  return (
    <Link href={props.path}>
      <a href="/" className={styles.btn}>
        <svg width="277" height="62">
          <defs>
            <linearGradient id="grad1">
              {/* <stop offset="0%" stop-color="#FF8282"/>
                <stop offset="100%" stop-color="#E178ED" /> */}
              <stop offset="0%" stopColor="#0398c3"/>
              <stop offset="25%" stopColor="#0398c3"/>
              <stop offset="25%" stopColor="#ff0202"/>
              <stop offset="50%" stopColor="#ff0202"/>
              <stop offset="75%" stopColor="#ff0202"/>
              <stop offset="75%" stopColor="#03ae65"/>
              <stop offset="100%" stopColor="#03ae65"/>
            </linearGradient>
          </defs>
          <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="266" height="50"/>
        </svg>
        <span>{props.children}</span>
      </a>
    </Link>
  )
}

export default Button
