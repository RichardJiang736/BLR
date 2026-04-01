import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, MapPin, Bot, ArrowLeft, Library, User, Hash, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import './App.css'

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  index: string
  shelf: string
  floor: string
  section: string
  available: boolean
  cover: string
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    index: '511',
    shelf: 'A-12',
    floor: '2nd Floor',
    section: 'Classic Literature',
    available: true,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0446310789',
    index: '194',
    shelf: 'B-05',
    floor: '2nd Floor',
    section: 'Classic Literature',
    available: true,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    index: '367',
    shelf: 'C-18',
    floor: '3rd Floor',
    section: 'Science Fiction',
    available: false,
    cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=200&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0141439518',
    index: '465',
    shelf: 'A-08',
    floor: '2nd Floor',
    section: 'Romance Classics',
    available: true,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0316769488',
    index: '256',
    shelf: 'D-22',
    floor: '1st Floor',
    section: 'Young Adult',
    available: true,
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=300&fit=crop'
  }
]

// School library catalog URL - configure this to point to your school's search page
const SCHOOL_CATALOG_URL = 'https://library.school.edu/search'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [robotDeployed, setRobotDeployed] = useState(false)
  const [robotStatus, setRobotStatus] = useState<'idle' | 'moving' | 'arrived'>('idle')
  const [showCatalog, setShowCatalog] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    // Simulate search delay - now searching by index
    setTimeout(() => {
      const found = mockBooks.find(b => 
        b.index.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSelectedBook(found || null)
      setIsSearching(false)
    }, 600)
  }

  const handleDeployRobot = () => {
    setRobotDeployed(true)
    setRobotStatus('moving')
    // Simulate robot movement
    setTimeout(() => {
      setRobotStatus('arrived')
    }, 3000)
  }

  const handleBack = () => {
    setSelectedBook(null)
    setRobotDeployed(false)
    setRobotStatus('idle')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full py-4 px-6 bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Library Robot
            </h1>
            <p className="text-xs text-slate-500">Smart Book Finder</p>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedBook ? (
            /* Search Page */
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
                  <Library className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-slate-800 mb-3">
                  Find Your Book
                </h2>
                <p className="text-slate-500 text-lg max-w-md mx-auto">
                  Search by index to locate books in the library
                </p>
              </motion.div>

              {/* Main Search Form */}
              <motion.form
                onSubmit={handleSearch}
                className="w-full max-w-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="relative flex gap-3 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex-1 relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Enter Index (e.g., 511)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSearching || !searchQuery.trim()}
                      className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSearching ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Search className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <>
                          <Search className="w-5 h-5 mr-2" />
                          Search
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.form>

              {/* Quick Suggestions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <p className="text-sm text-slate-400 mb-4 text-center">Example Indices</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['511', '194', '465'].map((callNum, i) => (
                    <motion.button
                      key={callNum}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      onClick={() => {
                        setSearchQuery(callNum)
                      }}
                      className="px-4 py-2 bg-white/60 hover:bg-white text-slate-600 hover:text-blue-600 rounded-full text-sm font-medium border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md font-mono"
                    >
                      {callNum}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* School Catalog Search Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-4xl mt-12"
              >
                {/* Toggle Button */}
                <button
                  onClick={() => setShowCatalog(!showCatalog)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 rounded-2xl transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-amber-800 font-semibold">
                        Don't know the index?
                      </p>
                      <p className="text-amber-600 text-sm">
                        Search by book title in the school catalog
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-amber-700 font-medium">
                      {showCatalog ? 'Hide Catalog' : 'Open Catalog'}
                    </span>
                    {showCatalog ? (
                      <ChevronUp className="w-5 h-5 text-amber-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                </button>

                {/* Embedded Catalog Iframe */}
                <AnimatePresence>
                  {showCatalog && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                        {/* Iframe Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                          </div>
                          <p className="text-sm text-slate-500">School Library Catalog</p>
                          <a
                            href={SCHOOL_CATALOG_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <span>Open in new tab</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        {/* Iframe */}
                        <div className="relative w-full" style={{ height: '500px' }}>
                          <iframe
                            src={SCHOOL_CATALOG_URL}
                            title="School Library Catalog"
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                          {/* Fallback overlay if iframe fails to load */}
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 pointer-events-none" style={{ display: 'none' }} id="iframe-fallback">
                            <div className="text-center p-8">
                              <div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <ExternalLink className="w-8 h-8 text-slate-400" />
                              </div>
                              <p className="text-slate-600 font-medium mb-2">Unable to load catalog</p>
                              <a
                                href={SCHOOL_CATALOG_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <span>Open Catalog</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/* Instructions */}
                        <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
                          <p className="text-sm text-amber-700">
                            <strong>Tip:</strong> Search for your book above, find the index, then enter it in the search box at the top of this page.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* How It Works */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-16 max-w-2xl"
              >
                <p className="text-sm text-slate-400 mb-6 text-center">How it works</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Search, label: 'Find Index', desc: 'Search school catalog' },
                    { icon: Hash, label: 'Enter Code', desc: 'Type the index' },
                    { icon: Bot, label: 'Deploy Robot', desc: 'Robot guides you' },
                  ].map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md border border-slate-100">
                        <step.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">{step.label}</p>
                      <p className="text-xs text-slate-400">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Result Page */
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Search</span>
              </motion.button>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Book Information Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="absolute -bottom-16 left-6"
                      >
                        <div className="w-32 h-44 rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                          <img
                            src={selectedBook.cover}
                            alt={selectedBook.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    </div>
                    <CardContent className="pt-20 pb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            selectedBook.available 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {selectedBook.available ? 'Available' : 'Checked Out'}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-1">{selectedBook.title}</h2>
                        <p className="text-slate-500 flex items-center gap-2 mb-4">
                          <User className="w-4 h-4" />
                          {selectedBook.author}
                        </p>
                        
                        <div className="space-y-3 pt-4 border-t border-slate-100">
                          {/* index - Highlighted */}
                          <div className="flex items-center gap-3 text-sm bg-blue-50 p-3 rounded-xl border border-blue-100">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <Hash className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-blue-600 text-xs font-medium">index</p>
                              <p className="text-blue-800 font-bold font-mono text-base">{selectedBook.index}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                              <p className="text-slate-400 text-xs">Section</p>
                              <p className="text-slate-700 font-medium">{selectedBook.section}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Shelf Location & Robot Control */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Shelf Location Card */}
                  <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Book Location
                      </h3>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center border border-blue-100"
                        >
                          <p className="text-slate-400 text-xs mb-1">Floor</p>
                          <p className="text-2xl font-bold text-blue-700">{selectedBook.floor}</p>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 text-center border border-emerald-100"
                        >
                          <p className="text-slate-400 text-xs mb-1">Shelf</p>
                          <p className="text-2xl font-bold text-emerald-700">{selectedBook.shelf}</p>
                        </motion.div>
                      </div>

                      {/* Visual Shelf Map */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-slate-400">Shelf Map</span>
                          <span className="text-xs text-slate-400">Row {selectedBook.shelf.split('-')[1]}</span>
                        </div>
                        <div className="flex gap-2">
                          {Array.from({ length: 8 }).map((_, i) => {
                            const isTarget = i + 1 === parseInt(selectedBook.shelf.split('-')[1])
                            return (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.05 }}
                                className={`flex-1 h-12 rounded-lg flex items-center justify-center text-xs font-bold ${
                                  isTarget
                                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-slate-200 text-slate-400'
                                }`}
                              >
                                {isTarget ? <BookOpen className="w-4 h-4" /> : i + 1}
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>

                  {/* Deploy Robot Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {!robotDeployed ? (
                      <Button
                        onClick={handleDeployRobot}
                        disabled={!selectedBook.available}
                        className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                      >
                        <Bot className="w-6 h-6 mr-3" />
                        {selectedBook.available ? 'Deploy the Robot' : 'Book Not Available'}
                      </Button>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100"
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={robotStatus === 'moving' ? {
                              x: [0, 10, 0],
                            } : {}}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                              robotStatus === 'arrived'
                                ? 'bg-emerald-100'
                                : 'bg-blue-100'
                            }`}
                          >
                            <Bot className={`w-8 h-8 ${
                              robotStatus === 'arrived'
                                ? 'text-emerald-600'
                                : 'text-blue-600'
                            }`} />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800">
                              {robotStatus === 'arrived' ? 'Robot Arrived!' : 'Robot Deployed'}
                            </h4>
                            <p className="text-slate-500 text-sm">
                              {robotStatus === 'arrived'
                                ? 'Your guide is waiting at the shelf'
                                : 'Navigating to shelf ' + selectedBook.shelf}
                            </p>
                          </div>
                          {robotStatus === 'moving' && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                            />
                          )}
                          {robotStatus === 'arrived' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                            >
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: robotStatus === 'arrived' ? '100%' : '60%' }}
                              transition={{ duration: robotStatus === 'arrived' ? 0.5 : 2, ease: 'easeInOut' }}
                              className={`h-full rounded-full ${
                                robotStatus === 'arrived'
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                              }`}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-slate-400">
                            <span>Start</span>
                            <span>{robotStatus === 'arrived' ? 'Arrived' : 'In Transit'}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 py-4 text-center text-slate-400 text-sm"
      >
        <p>Library Robot System v1.0</p>
      </motion.footer>
    </div>
  )
}

export default App
