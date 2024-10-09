import { NextRequest, NextResponse } from 'next/server';

const TRUTHY_STRINGS = ['true', 'True', 'TRUE', '1'];

function extractUsernamePasswordFromHeader(
    basicAuthHeader: string | null,
): { user: string; password: string } | null {
    if (!basicAuthHeader) {
        return null;
    }

    const authValue = basicAuthHeader.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    return { user: user, password: pwd };
}

function checkAuthenticationHeader(
    basicAuthHeader: string | null,
    matchesUsername: string | undefined,
    matchesPassword: string | undefined,
): boolean {
    if (basicAuthHeader) {
        const auth = extractUsernamePasswordFromHeader(basicAuthHeader);
        if (
            auth?.user === matchesUsername &&
            auth?.password === matchesPassword
        ) {
            return true;
        }
    }
    return false;
}

function checkAuthenticationNextHeader(
    headers: Headers,
    matchesUsername: string | undefined,
    matchesPassword: string | undefined,
): boolean {
    const basicAuthHeader = headers.get('authorization');

    return checkAuthenticationHeader(
        basicAuthHeader,
        matchesUsername,
        matchesPassword,
    );
}

function isTruthy(environmentVar: string | undefined): boolean {
    return TRUTHY_STRINGS.includes(environmentVar || '0');
}

export function middleware(req: NextRequest): NextResponse {
    const { nextUrl } = req;
    const useAuth = process.env.USE_AUTH ?? true;
    const env = process.env.NODE_ENV
    
    const useAuthentication = (env == "development") ? false :
        useAuth && !nextUrl.pathname.startsWith('/api');

    
    if(env == "development"){
        // do something
    }
    else if (env == "production"){
        // do something
    }

    if (
        useAuthentication &&
        !checkAuthenticationNextHeader(
            req.headers,
            process.env.AUTH_USERNAME ?? "ivendi",
            process.env.AUTH_PASSWORD ?? "jdm-test@2024",
        )
    ) {
        const url = nextUrl.clone();
        url.pathname = '/api/auth';
        return NextResponse.rewrite(url);
    }
    return NextResponse.next();
}
