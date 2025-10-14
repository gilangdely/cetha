import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

const jobs = [
    {
        company: "Google",
        position: "Software Engineer",
        location: "Jakarta, Indonesia",
        description: "Bangun sistem AI dan cloud-scale apps bersama tim global.",
        img: "https://cdn.iconscout.com/icon/free/png-512/free-google-icon-svg-download-png-189824.png?f=webp&w=512",
    },
    {
        company: "Tokopedia",
        position: "Frontend Developer",
        location: "Yogyakarta, Indonesia",
        description: "Kembangkan UI interaktif untuk jutaan pengguna marketplace.",
        img: "https://logo.clearbit.com/tokopedia.com",
    },
    {
        company: "Shopee",
        position: "Data Analyst",
        location: "Jakarta, Indonesia",
        description: "Analisis data transaksi dan bantu keputusan bisnis strategis.",
        img: "https://logo.clearbit.com/shopee.co.id",
    },
    {
        company: "Gojek",
        position: "Backend Engineer",
        location: "Bandung, Indonesia",
        description: "Rancang microservices untuk layanan transportasi & pembayaran.",
        img: "https://logo.clearbit.com/gojek.com",
    },
    {
        company: "Telkom Indonesia",
        position: "Network Engineer",
        location: "Surabaya, Indonesia",
        description: "Optimalkan infrastruktur jaringan nasional berkecepatan tinggi.",
        img: "https://logo.clearbit.com/telkom.co.id",
    },
    {
        company: "Bukalapak",
        position: "UI/UX Designer",
        location: "Jakarta, Indonesia",
        description: "Desain pengalaman pengguna yang modern dan inklusif.",
        img: "https://logo.clearbit.com/bukalapak.com",
    },
    {
        company: "Traveloka",
        position: "Product Manager",
        location: "Jakarta, Indonesia",
        description: "Pimpin pengembangan fitur baru untuk jutaan traveler.",
        img: "https://logo.clearbit.com/traveloka.com",
    },
    {
        company: "Indosat Ooredoo",
        position: "Cyber Security Specialist",
        location: "Jakarta, Indonesia",
        description: "Amankan sistem dan data pelanggan dari ancaman siber.",
        img: "https://logo.clearbit.com/indosatooredoo.com",
    },
    {
        company: "Dana Indonesia",
        position: "Mobile Developer",
        location: "Jakarta, Indonesia",
        description: "Bangun aplikasi fintech dengan performa tinggi dan UI mulus.",
        img: "https://logo.clearbit.com/dana.id",
    },
    {
        company: "Astra International",
        position: "Project Coordinator",
        location: "Tangerang, Indonesia",
        description: "Koordinasikan proyek digitalisasi internal berskala nasional.",
        img: "https://logo.clearbit.com/astra.co.id",
    },
];


const firstRow = jobs.slice(0, jobs.length / 2)
const secondRow = jobs.slice(jobs.length / 2)
const thirdRow = jobs.slice(0, jobs.length / 2)
const fourthRow = jobs.slice(jobs.length / 2)

const JobCard = ({
    img,
    company,
    position,
    location,
    description,
}: {
    img: string
    company: string
    position: string
    location: string
    description: string
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-48",
                "border-gray-950/[.1] bg-gray-50 hover:bg-gray-100",
                "dark:border-gray-50/[.1] dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-md" width="28" height="28" alt={company} src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-semibold dark:text-white">
                        {company}
                    </figcaption>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-300">
                        {location}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm font-medium text-primaryBlue">
                {position}
            </blockquote>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-300 line-clamp-3">
                {description}
            </p>
        </figure>
    );
};

export function InfiniteMovingJobs() {
    return (
        <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
            <div
                className="flex flex-row items-center gap-4"
                style={{
                    transform:
                        "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
                }}
            >
                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {firstRow.map((job, i) => (
                        <JobCard key={i} {...job} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
                    {secondRow.map((job, i) => (
                        <JobCard key={i} {...job} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
                    {thirdRow.map((job, i) => (
                        <JobCard key={i} {...job} />
                    ))}
                </Marquee>
                <Marquee pauseOnHover className="[--duration:20s]" vertical>
                    {fourthRow.map((job, i) => (
                        <JobCard key={i} {...job} />
                    ))}
                </Marquee>
            </div>

            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    )
}
