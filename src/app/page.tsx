import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Newspaper, HelpCircle, ChefHat } from 'lucide-react'
import { Suspense } from 'react';

const IconClasses = 'w-4 h-4';

const typeIconMap = [
  {
    type: 'Article',
    icon: <Newspaper className={IconClasses} />,
  },
  {
    type: 'Question',
    icon: <HelpCircle className={IconClasses} />,
  },
  {
    type: 'Recipe',
    icon: <ChefHat className={IconClasses} />,
  }
]

type PostType = 'Article' | 'Question' | 'Recipe';
type TagType = 'Angular' | 'RxJS' | 'React';

type Tag = { name: TagType; version: string; }

type Post = { id: number; name: string; posted: string; type: PostType; tags: Tag[] };

function fetchData(): Promise<Post[]> {
  return [
    {
      id: 1,
      name: 'Alternative to Nested Subscriptions',
      posted: '2023-05-15',
      type: 'Article',
      tags: [
        {
          name: 'Angular',
          version: '18.x',
        },
        {
          name: 'RxJS',
          version: '7.8.x'
        }
      ]
    },
    {
      id: 2,
      name: 'How to Make a Custom Hook?',
      posted: '2023-05-10',
      type: 'Question',
      tags: [{
        name: 'React',
        version: '16.x'
      }]
    },
    {
      id: 3,
      name: 'SQL Safe-Mode Update by Non-PK',
      posted: '2023-05-05',
      type: 'Recipe',
      tags: []
    },
  ];
}

export default function Home() {
  const data = fetchData();
  if (!data) return <div>Loading Data</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trending</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {data.map((entity) => (
            <Link href={`/entity/${entity.id}`} key={entity.id}>
              <Card className="hover:border-border-hover">
                <CardHeader>
                  <CardTitle className="flex gap-2 items-center">{typeIconMap.find((assoc) => assoc.type === entity.type)?.icon}{entity.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{entity.posted}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Suspense>
      </div>
    </div>
  )
}


