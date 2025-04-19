const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">About Mangadom</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-foreground leading-relaxed">
            Mangadom was born from a passion for manga and a desire to create something meaningful while mastering Next.js. 
            Inspired by designs from <a href="https://dribbble.com/shots/16894791-Manga-Web-Concept" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors underline">Dribble</a>, 
            and powered by the comprehensive <a href="https://kitsu.docs.apiary.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors underline">Kitsu API</a>, 
            we've built a platform that connects manga enthusiasts with their favorite series and helps them discover new ones.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Meet Our Team</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Sharoon's Card */}
        <div className="bg-card rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02] hover:shadow-2xl">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 relative mb-4 ring-4 ring-primary rounded-full overflow-hidden">
                <img 
                  src="https://github.com/Sharoon166.png" 
                  alt="Sharoon" 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Sharoon</h3>
              <p className="text-primary text-sm">Co-Creator & Developer</p>
            </div>
            
            <p className="text-card-foreground mb-6 leading-relaxed">
              I'm a Computer Science student with a passion for astronomy, manga, and web development. 
              My love for mathematics fuels my problem-solving skills in coding. When I'm not creating 
              websites or diving into complex algorithms, you can find me stargazing or immersed in the 
              latest manga series.
            </p>
            
            <div className="flex justify-center space-x-4">
              <a 
                href="https://github.com/Sharoon166" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted hover:bg-muted/80 text-muted-foreground p-3 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://sharoon.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/80 text-primary-foreground p-3 rounded-full transition-colors"
                aria-label="Personal Website"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Haider's Card */}
        <div className="bg-card rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02] hover:shadow-2xl">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 relative mb-4 ring-4 ring-secondary rounded-full overflow-hidden">
                <img 
                  src="https://github.com/haider-9.png" 
                  alt="Haider" 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Haider</h3>
              <p className="text-secondary text-sm">Co-Creator & Developer</p>
            </div>
            
            <p className="text-card-foreground mb-6 leading-relaxed">
              I'm a Computer Science student with a passion for software development and problem-solving. 
              My interests span across various areas of technology, from web development to artificial intelligence. 
              When I'm not coding, you can find me exploring new programming languages or contributing to 
              open-source projects.
            </p>
            
            <div className="flex justify-center space-x-4">
              <a 
                href="https://github.com/haider-9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted hover:bg-muted/80 text-muted-foreground p-3 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://haiderahmad.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground p-3 rounded-full transition-colors"
                aria-label="Personal Website"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          At Mangadom, we're dedicated to creating a vibrant community where manga enthusiasts can discover, 
          explore, and celebrate their favorite series. We strive to provide a seamless, visually appealing 
          platform that makes finding your next manga adventure both easy and enjoyable.
        </p>
      </div>

      <div className="mt-12 p-6 bg-accent rounded-lg max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-3 text-accent-foreground">Join Our Community</h2>
        <p className="text-accent-foreground">
          Whether you're a seasoned manga reader or just starting your journey, Mangadom is the perfect place to explore 
          new series, track your favorites, and connect with fellow enthusiasts. Start your manga adventure today!
        </p>
      </div>
    </div>
  )
}

export default About
