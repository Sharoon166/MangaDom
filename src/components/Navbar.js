"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen, Search, Menu, Home,
  BookMarked, ChevronDown,
  Info
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search/${(searchQuery).replace(/ /g, "-")}`;
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background/70"
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                <img src="/favicon.ico" alt="MangaDom" className="object-cover" />
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">MangaDom</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center ml-8 space-x-1">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                  <Home size={18} />
                  <span>Home</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <BookOpen size={18} />
                    <span>Genres</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 grid grid-cols-2 gap-1 p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/genres/action">Action</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/genres/romance">Romance</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/genres/fantasy">Fantasy</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/genres/horror">Horror</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="col-span-2 mt-1 justify-center text-primary">
                    <Link href="/genres">View All Genres</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/about">
                <Button variant="ghost" size="sm">About</Button>
              </Link>
            </nav>
          </div>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search manga..."
                className="w-[200px] lg:w-[300px] pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>



            <Link href="https://animadom.vercel.app" target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5">
                <BookMarked size={16} />
                <span>AnimaDom</span>
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">New</Badge>
              </Button>
            </Link>


          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[140px] sm:w-[180px] h-9 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b">
                    <Link href="/" className="flex items-center space-x-2">
                      <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                        <img src="/favicon.ico" alt="MangaDom" className="object-cover" />
                      </div>
                      <span className="font-bold text-xl">MangaDom</span>
                    </Link>

                  </div>

                  <nav className="flex flex-col space-y-1 mt-6">
                    <Link href="/">
                      <Button variant="ghost" className="w-full justify-start">
                        <Home size={18} className="mr-2" />
                        <span>Home</span>
                      </Button>
                    </Link>

                    <Link href="/genres">
                      <Button variant="ghost" className="w-full justify-start">
                        <BookOpen size={18} className="mr-2" />
                        <span>Genres</span>
                      </Button>
                    </Link>

                    <Link href="/about">
                      <Button variant="ghost" className="w-full justify-start">
                        <Info size={18} className="mr-2" />
                        <span>About</span>
                      </Button>
                    </Link>

                    <div className="pt-4 mt-4 border-t">
                      <Link href="https://animadom.vercel.app" target="_blank">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <BookMarked size={16} />
                          <span>Visit AnimaDom</span>
                          <Badge variant="secondary" className="ml-auto">New</Badge>
                        </Button>
                      </Link>
                    </div>
                  </nav>

                  <div className="mt-auto pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} MangaDom
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your Ultimate Manga Destination
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
