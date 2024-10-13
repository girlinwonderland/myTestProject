import styles from './App.scss';

// 1. if we use scss
// import './styles.scss'; => <div className="title" />

// 2. if we use styles.modules.scss
// import styles from './styles.module.scss'; => <div className={styles.title} />

// 3. Но если указать options для css-loader то второй варинат будет работать из без модуля

const App = () => {
  return <h1 className={styles.title}>Hello</h1>
}

export default App;