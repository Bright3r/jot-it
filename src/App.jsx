import styles from './styles/App.module.css'
import Canvas from './Canvas'

function App() {
  return (
    <div className={styles.container}>
      <Canvas width="1200" height="800"/>
    </div>
  )
}

export default App