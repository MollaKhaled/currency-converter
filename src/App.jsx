import MoneyConverter from "./components/MoneyConverter"


function App() {
  return (
    <div className='font-bold min-h-screen flex flex-col  items-center justify-center'
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}
    >
     <div className="currency-converter ">
    <MoneyConverter></MoneyConverter>
  </div>
  </div>
  )
}

export default App
