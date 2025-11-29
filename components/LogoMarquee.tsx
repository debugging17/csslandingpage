import { Marquee } from '@/components/ui/marquee';

const logos = [
    {
        name: 'React',
        img: 'https://cdn.simpleicons.org/react/1e1b4b',
    },
    {
        name: 'Next.js',
        img: 'https://cdn.simpleicons.org/nextdotjs/1e1b4b',
    },
    {
        name: 'Tailwind CSS',
        img: 'https://cdn.simpleicons.org/tailwindcss/1e1b4b',
    },
    {
        name: 'TypeScript',
        img: 'https://cdn.simpleicons.org/typescript/1e1b4b',
    },
    {
        name: 'Node.js',
        img: 'https://cdn.simpleicons.org/nodedotjs/1e1b4b',
    },
    {
        name: 'Docker',
        img: 'https://cdn.simpleicons.org/docker/1e1b4b',
    },
    {
        name: 'Framer',
        img: 'https://cdn.simpleicons.org/framer/1e1b4b',
    },
    {
        name: 'AWS',
        img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    },
    {
        name: 'Supabase',
        img: 'https://cdn.simpleicons.org/supabase/1e1b4b',
    },
    {
        name: 'Vercel',
        img: 'https://cdn.simpleicons.org/vercel/1e1b4b',
    },
];

const LogoMarquee = () => {
    return (
        <div className='relative flex h-24 w-full flex-col items-center justify-center overflow-hidden border-y border-gray-200 bg-white/60 backdrop-blur-md shadow-sm'>
            <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <Marquee reverse className='[--duration:40s]'>
                    {logos.map((logo) => (
                        <div key={logo.name} className="relative h-12 w-auto mx-4 flex items-center justify-center">
                            <img
                                src={logo.img}
                                alt={logo.name}
                                className="h-full w-auto object-contain opacity-0"
                            />
                            <div
                                className="absolute inset-0 bg-[#1e1b4b]"
                                style={{
                                    maskImage: `url(${logo.img})`,
                                    WebkitMaskImage: `url(${logo.img})`,
                                    maskSize: 'contain',
                                    WebkitMaskSize: 'contain',
                                    maskPosition: 'center',
                                    WebkitMaskPosition: 'center',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskRepeat: 'no-repeat',
                                }}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default LogoMarquee;
