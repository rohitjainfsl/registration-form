import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GalleryImageProps {
    src: string;
    className: string;
}

const galleryImages: { src: string; className: string }[] = [
    {
        src: "/images/galImg1.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:col-start-1 lg:row-start-1 lg:w-full lg:h-full",
    },
    {
        src: "/images/galImg2.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:col-start-2 lg:row-start-1 lg:w-full lg:h-full",
    },
    {
        src: "/images/galImg7.jpg",
        className: "w-full h-[55vw] bg-black rounded-md overflow-hidden lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:w-full lg:h-full",
    },
    {
        src: "/images/galImg9.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:col-start-1 lg:row-start-2 lg:w-full lg:h-full",
    },
    {
        src: "/images/galImg5.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:col-start-2 lg:row-start-2 lg:w-full lg:h-full",
    },
    {
        src: "/images/galImg8.jpg",
        className: "w-full h-[45vw] bg-black rounded-md overflow-hidden lg:col-span-3 lg:row-start-3 lg:w-full lg:h-full",
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
                <section className="w-full h-auto pt-4 pb-12 flex justify-center overflow-hidden sm:pt-6 md:pt-8 lg:pt-12 lg:pb-16 xl:pt-16 xl:pb-20">
                    <div className="w-full px-3 sm:px-4 md:px-6 lg:max-w-5xl lg:px-4 xl:max-w-7xl">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-center">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-sm font-semibold mb-4">
                                    Life at FSL
                                </span>
                            </h1>
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                                    All work & no play,
                                    <span className="text-gradient-brand">makes Jack a dull boy.</span>
                                </h2>
                                <p className="text-muted-foreground text-2xl max-w-2xl mx-auto pt-2 font-bold">
                                    Here at FSL, there is no dull moment
                                </p>
                            </div>
                        </div>
                        <div className="pt-5 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12">
                            {/* Decreased image grid gap here (gap-3 → gap-1, sm:gap-4 → sm:gap-2, lg:gap-6 → lg:gap-3) */}
                            <div className="flex flex-col gap-1 sm:gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:grid-rows-[18rem_18rem_22rem] lg:gap-3 xl:grid-rows-[20rem_20rem_26rem] xl:gap-4">
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