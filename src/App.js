import React from 'react';
import styles from './App.module.css';
import PurchasesProvider from './components/PurchasesProvider/PurchasesProvider';
import PurchasesList from './components/PurchasesList/PurchasesList';



function App() {
  return (
    <div className={styles.App}>
      <PurchasesProvider>
        <PurchasesList />
      </PurchasesProvider>
    </div>
  );
}

export default App;
