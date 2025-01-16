import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// This is a mock data structure. In a real application, you'd fetch this from a database.
const data = [
  { id: 1, name: 'Alternative to Nested Subscriptions', posted: '2023-05-15', type: 'Article', tags: [{
    name: 'Angular',
    version: '18.x',
  }, {
    name: 'RxJS',
    version: '7.8.x'
  }] },
  { id: 2, name: 'How to Make a Custom Hook?', posted: '2023-05-10', type: 'Question', tags: [{
    name: 'React',
    version: '16.x'
  }] },
  { id: 3, name: 'SQL Safe-Mode Update by Non-PK', posted: '2023-05-05', type: 'Recipe' },
]

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trending</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((entity) => (
          <Link href={`/entity/${entity.id}`} key={entity.id}>
            <Card className="hover:border-border-hover">
              <CardHeader>
                <CardTitle>{entity.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{entity.posted}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


