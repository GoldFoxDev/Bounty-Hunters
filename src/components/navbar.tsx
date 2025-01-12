import Link from 'next/link'
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { isSignedIn } = useUser()

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Memorial
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {isSignedIn && (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/add-memorial" className="hover:underline">
                Add Memorial
              </Link>
            </>
          )}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


