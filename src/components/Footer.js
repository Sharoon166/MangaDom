import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-900 mt-20 py-4 border-t">
        <div className="text-center text-gray-200 text-sm">
          <p> &copy; {new Date().getFullYear()}, All rights reserved.</p>
        </div>
    </footer>
  );
}

export default Footer
