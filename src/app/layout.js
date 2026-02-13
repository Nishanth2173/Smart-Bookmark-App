import './globals.css'

export const metadata ={
  title : 'Smart Bookmark App',
  description : 'Google OAuth + Supabase Realtime'
};


export default function RootLayout({children}){
  return(
    <html lang='en'>
      <body className='animated-bg min-h-screen flex items-center justify-center'>
        {children}
      </body>
    </html>
  )
}