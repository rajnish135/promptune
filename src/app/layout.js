import '@/styles/globals.css'
import Nav from '@/components/Nav.jsx'
import Provider from '@/components/Provider'

export const metadata = {
  title: "Promptune",
  description: "Fine-tune Your Imagination"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
       <body>
        
          <Provider>
            
              <div className='main'>
                  <div className='gradient'/>
              </div>
    
              <main className='app'>
                 <Nav/>
                 {children}    {/* ✅ Passed from the page into RootLayout */}
              </main>

          </Provider>     

       </body>
    </html>
  )
}

export default RootLayout;