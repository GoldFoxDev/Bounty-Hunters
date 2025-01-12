import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// This is a mock data structure. In a real application, you'd fetch this from a database.
const memorials = [
  { id: 1, name: 'John Doe', dateOfPassing: '2023-05-15', bio: 'John was a loving father and husband...' },
  { id: 2, name: 'Jane Smith', dateOfPassing: '2023-05-10', bio: 'Jane was a brilliant scientist and a caring friend...' },
  { id: 3, name: 'Robert Johnson', dateOfPassing: '2023-05-05', bio: 'Robert was a talented musician and a kind soul...' },
]

export default function MemorialPage({ params }: { params: { id: string } }) {
  const memorial = memorials.find(m => m.id === parseInt(params.id))

  if (!memorial) {
    notFound()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{memorial.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Date of Passing: {memorial.dateOfPassing}</p>
        <p>{memorial.bio}</p>
      </CardContent>
    </Card>
  )
}


