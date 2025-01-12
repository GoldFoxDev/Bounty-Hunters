import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// This is a mock data structure. In a real application, you'd fetch this from a database.
const userMemorials = [
  { id: 1, name: 'John Doe', dateOfPassing: '2023-05-15' },
  { id: 2, name: 'Jane Smith', dateOfPassing: '2023-05-10' },
]

export default function Dashboard() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Memorials</h1>
      <Link href="/add-memorial">
        <Button>Add New Memorial</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userMemorials.map((memorial) => (
          <Card key={memorial.id}>
            <CardHeader>
              <CardTitle>{memorial.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date of Passing: {memorial.dateOfPassing}</p>
              <div className="mt-4 space-x-2">
                <Link href={`/memorial/${memorial.id}`}>
                  <Button variant="outline">View</Button>
                </Link>
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


