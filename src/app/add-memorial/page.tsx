'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'

export default function AddMemorial() {
  const [name, setName] = useState('')
  const [dateOfPassing, setDateOfPassing] = useState('')
  const [bio, setBio] = useState('')
  const router = useRouter()
  const { isSignedIn } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ name, dateOfPassing, bio })
    // Redirect to home page after submission
    router.push('/')
  }

  if (!isSignedIn) {
    return <p>Please sign in to add a memorial.</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Memorial</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dateOfPassing" className="block mb-2">Date of Passing</label>
            <Input
              id="dateOfPassing"
              type="date"
              value={dateOfPassing}
              onChange={(e) => setDateOfPassing(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-2">Biography</label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}


