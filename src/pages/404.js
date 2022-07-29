/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import { XCircleIcon } from '@heroicons/react/solid'

export default function Example() {
  return (
    <>
      <div className="min-h-full w-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="flex-col sm:flex">
            <div className="sm:flex">
              <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
                404
              </p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Page not found
                  </h1>
                  <p className="mt-1 text-base text-gray-500">
                    Please check the URL in the address bar and try again.
                  </p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <Link href="/">
                    <a className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Go back home
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    Automating Planetscale Deploy Requests into our CI/CD Has
                    been moved to{' '}
                    <Link href="/blog/automating-planetscale-deploy-requests-into-our-ci-cd">
                      <a className="text-blue-500">Here</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
