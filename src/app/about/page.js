
import Image from 'next/image'

const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">About Us</h1>
      <p className="text-sm sm:text-md mb-6 sm:mb-8">
        I created this website because of my love for manga and my desire to build something that I enjoy. This project serves as a fantastic practice for honing my skills in Next.js, providing a hands-on experience that combines my passion with learning. The inspiration for the design and layout was taken from the creative and visually appealing works on <a href="https://dribbble.com/shots/16894791-Manga-Web-Concept" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Dribble</a>, which motivated me to bring this vision to life. Special thanks to the <a href="https://kitsu.docs.apiary.io/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Kitsu API</a> for providing the rich and comprehensive manga data that powers this site, making it possible to offer detailed information on various manga series, characters, and more. By integrating these elements, I aimed to create a platform that not only reflects my interests but also helps others discover and appreciate manga.
      </p>
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gradient-to-br from-[#333] to-[#555] shadow-md rounded-lg p-4 sm:p-6 text-white">
          <div className="mb-4 w-20 h-20 sm:w-24 sm:h-24 mx-auto relative">
            <Image src="/sharoon.png" alt="Sharoon" layout="fill" objectFit="cover" className="rounded-full" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Sharoon</h2>
          <p className="text-sm sm:text-base mb-3 sm:mb-4">I'm a Computer Science student with a passion for astronomy, manga, and web development. My love for math fuels my problem-solving skills in coding. When I'm not creating websites or diving into complex algorithms, you can find me stargazing or immersed in the latest manga series. This diverse blend of interests not only makes me a well-rounded developer but also inspires unique and creative solutions in my projects.</p>
        
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/Sharoon-Shaleem" target="_blank" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sharoon-shaleem-0a7a85226/" target="_blank" className="text-[#0a66c2] hover:text-[#00a0dc]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#333] to-[#555] shadow-md rounded-lg p-4 sm:p-6 text-white">
          <div className="mb-4 w-20 h-20 sm:w-24 sm:h-24 mx-auto relative">
            <Image src="/haider.jpg" alt="Haider" layout="fill" objectFit="cover" className="rounded-full" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Haider</h2>
          <p className="text-sm sm:text-base mb-3 sm:mb-4">I'm a Computer Science student with a passion for software development and problem-solving. My interests span across various areas of technology, from web development to artificial intelligence. When I'm not coding, you can find me exploring new programming languages or contributing to open-source projects. I believe in the power of technology to make a positive impact on the world.</p>
         
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/haider-9" target="_blank" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/haider-ahmad-439317164/" target="_blank" className="text-[#0a66c2] hover:text-[#00a0dc]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About