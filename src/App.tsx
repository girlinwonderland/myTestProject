import styles from './App.module.scss';

// 1. if we use scss
// import './styles.scss'; => <div className="title" />

// 2. if we use styles.modules.scss
// import styles from './styles.module.scss'; => <div className="title" />

console.log(styles)

const App = () => {
  return <h1 className={styles.title}>Hello</h1>
}

export default App;