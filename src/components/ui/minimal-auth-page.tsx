import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { Particles } from '@/components/ui/particles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function MinimalAuthPage() {
    const navigate = useNavigate();
    const { login, user } = useAuth();

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        try {
            await login();
        } finally {
            setIsLoggingIn(false);
        }
    };

	return (
		<div className="relative md:h-screen md:overflow-hidden w-full bg-black text-white">
			<Particles
				color="#ffffff"
				quantity={120}
				ease={20}
				className="absolute inset-0 z-0"
			/>
			<div
				aria-hidden
				className="absolute inset-0 isolate z-0 contain-strict"
			>
				<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,hsla(0,0%,55%,0.02)_50%,rgba(255,255,255,0.01)_80%)] absolute top-0 left-0 h-[320px] w-[140px] -translate-y-[87.5px] -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-[320px] w-[60px] translate-x-[5%] -translate-y-1/2 -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-[320px] w-[60px] -translate-y-[87.5px] -rotate-45 rounded-full" />
			</div>
			<div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4">
				<Button variant="ghost" className="absolute top-8 left-8 text-white hover:bg-white/20 transition-all duration-300" asChild>
					<Link to="/" className="flex items-center gap-1.5">
						<ChevronLeftIcon className="size-4" />
						<span className="font-medium tracking-wide">Home</span>
					</Link>
				</Button>

				<div className="mx-auto space-y-4 sm:w-[350px] z-10">
					<div className="flex items-center gap-2 mb-4 justify-center">
                        <img 
                            src="/cypherlogo 1.svg" 
                            alt="CypherConnect Logo" 
                            className="w-32 h-32 object-contain grayscale brightness-[5] contrast-[2] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
                        />
					</div>
					<div className="flex flex-col space-y-2 text-center pb-4">
						<h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">
							Enter the Cypher
						</h1>
						<p className="text-gray-400 text-base">
							Sign in with Google to access your dashboard.
						</p>
					</div>
					<div className="space-y-4 pt-4 text-center">
						<Button 
                            disabled={isLoggingIn}
                            type="button" 
                            size="lg" 
                            onClick={handleLogin} 
                            className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg font-semibold rounded-[1.4rem] transition-all duration-300 tracking-wide disabled:opacity-50"
                        >
							{isLoggingIn ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    Connecting...
                                </span>
                            ) : (
                                <>
                                    <GoogleIcon className="mr-3 size-5" />
                                    Continue with Google
                                </>
                            )}
						</Button>
					</div>
					<p className="text-gray-500 mt-8 text-sm text-center pt-6">
						By clicking continue, you agree to our{' '}
						<a
							href="#"
							className="hover:text-white underline underline-offset-4 transition-colors"
						>
							Terms of Service
						</a>{' '}
						and{' '}
						<a
							href="#"
							className="hover:text-white underline underline-offset-4 transition-colors"
						>
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);
