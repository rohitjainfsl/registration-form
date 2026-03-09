import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GalleryImageProps {
    src: string;
    className: string;
}

const galleryImages: { src: string; className: string }[] = [
    {
        src: "/images/galImg1.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:w-[25vw] lg:h-[36vh]",
    },
    {
        src: "/images/galImg2.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:w-[26vw] lg:h-[36vh]",
    },
    {
        src: "/images/galImg7.jpg",
        className: "w-full h-[55vw] bg-black rounded-md overflow-hidden lg:w-[23vw] lg:h-[74.6vh]",
    },
    {
        src: "/images/galImg4.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:absolute lg:top-[20rem] lg:left-0 lg:w-[25vw] lg:h-[36vh]",
    },
    {
        src: "/images/galImg5.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:absolute lg:top-[20rem] lg:left-[24.7rem] lg:w-[26vw] lg:h-[36vh]",
    },
    {
        src: "/images/galImg6.png",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:absolute lg:-bottom-[27rem] lg:left-0 lg:w-full lg:h-[50vh]",
    },
];

const GalleryImage = ({ src, className }: GalleryImageProps) => (
    <div className={className}>
        <img className="size-full object-cover rounded-md" src={src} alt="" loading="lazy" />
    </div>
);

const Gallery = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <section className="w-full h-auto pt-10 pb-12 flex justify-center overflow-hidden sm:pt-12 md:pt-16 lg:h-[200vh] lg:pt-36 lg:pb-0">
                    <div className="w-full px-3 sm:px-4 md:px-6 lg:w-fit lg:px-4">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-center">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-sm font-semibold mb-4">
                                    About FSL
                                </span>
                            </h1>
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                                    The people behind <span className="text-gradient-brand">Full Stack Learning</span>
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    A small, focused team building features, supporting students, and ensuring platform reliability.
                                </p>
                            </div>
                        </div>
                        <div className="pt-5 sm:pt-6 md:pt-8 lg:pt-[7rem]">
                            {/* Decreased image grid gap here (gap-3 → gap-1, sm:gap-4 → sm:gap-2, lg:gap-6 → lg:gap-3) */}
                            <div className="flex flex-col gap-1 sm:gap-2 lg:relative lg:flex-row lg:gap-3">
                                {galleryImages.map((img, idx) => (
                                    <GalleryImage key={`gallery-image-${idx}`} {...img} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Gallery;
