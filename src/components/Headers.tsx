import { Link } from "react-router-dom"
import styles from './headers.module.css';

const Headers = () => {
  const linkUrl = [{
    idx: 0,
    label: 'ref예제',
    url: 'refexample'
}]
  return (
  <header className={styles.header}>
    <div className={styles.inner}>
      <h1 className={styles.logo}><Link to="/">Example</Link></h1>
      <nav className={styles.gnv}>
          <ul>
              {linkUrl.map((item) => {
                  return <li key={item.idx}><Link to={item.url}>{item.label}</Link></li>
              })}
          </ul>
      </nav>
    </div>
  </header>
  )
}

export default Headers;