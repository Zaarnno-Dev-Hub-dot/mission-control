import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// HTTP Basic Auth middleware
export function middleware(request: NextRequest) {
  // Skip auth for local development and health checks
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  
  // Allow local development
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')
  
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Mission Control"',
      },
    })
  }

  // Decode base64 credentials
  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')

  // Check credentials (username: dragon, password: RaxorPass321!!)
  if (username !== 'dragon' || password !== 'RaxorPass321!!') {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Mission Control"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
}
