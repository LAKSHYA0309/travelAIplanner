import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { LogoutButton } from '@/components/logout-button'

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  const user = session.user

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Travel AI Planner</h1>
          <LogoutButton />
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome, {user.name || 'Traveler'}!
              </h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              {user.image && (
                <img 
                  src={user.image} 
                  alt={user.name || 'User'} 
                  className="w-16 h-16 rounded-full"
                />
              )}
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Account Status</p>
              <p className="text-lg font-semibold text-blue-600">
                {user.emailVerified ? '✓ Verified' : 'Unverified'}
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">✈️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan Trips</h3>
            <p className="text-gray-600">Create and customize your travel itineraries with AI assistance.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore</h3>
            <p className="text-gray-600">Discover destinations and get personalized recommendations.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Favorites</h3>
            <p className="text-gray-600">Bookmark places and keep all your travel plans organized.</p>
          </div>
        </div>

        {/* User Info Debug */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Information</h3>
          <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-auto text-gray-700">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
