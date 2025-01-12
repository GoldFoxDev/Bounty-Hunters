import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// This is a mock data structure. In a real application, you'd fetch this from a database.
const recentMemorials = [
  { id: 1, name: 'John Doe', dateOfPassing: '2023-05-15' },
  { id: 2, name: 'Jane Smith', dateOfPassing: '2023-05-10' },
  { id: 3, name: 'Robert Johnson', dateOfPassing: '2023-05-05' },
]

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recent Memorials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentMemorials.map((memorial) => (
          <Link href={`/memorial/${memorial.id}`} key={memorial.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{memorial.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date of Passing: {memorial.dateOfPassing}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


