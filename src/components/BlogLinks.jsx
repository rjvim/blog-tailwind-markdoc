import Link from 'next/link'

import { Icon } from '@/components/Icon'

export function BlogLinks({ children }) {
  return (
    <div>
      <div className="not-prose my-8 grid grid-cols-1 gap-6">{children}</div>
    </div>
  )
}

export function BlogLink({ title, date, href }) {
  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative flex items-center justify-between overflow-hidden rounded-xl py-5 px-4">
        <h2 className="truncate text-sm font-medium text-slate-900 dark:text-white">
          <Link href={href}>
            <span className="absolute -inset-px rounded-xl" />
            {title}
          </Link>
        </h2>

        <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
          <span>{date}</span>
        </time>
      </div>
    </div>
  )
}
