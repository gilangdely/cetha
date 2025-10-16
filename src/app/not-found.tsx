import Image from "next/image";
import Link from "next/link";
import image404 from "../assets/img/404.png";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-center">
            <Image
                src={image404}
                alt="404 Not Found"
                width={400}
                height={300}
                className="mb-6"
            />
            <h2 className="text-2xl font-bold text-TextPrimary mb-2">
                Error 404: Halaman Tidak Ditemukan!
            </h2>
            <p className="text-TextSecondary mb-6 max-w-md">
                Kami sudah mencari ke mana pun, tapi tidak menemukan halaman yang kamu maksud.
            </p>
            <Link
                href="/"
                className="px-6 py-2 text-lg text-primaryBlue font-semibold rounded-full underline-offset-3 hover:text-blue-500 underline transition"
            >
                Kembali ke Halaman Utama
            </Link>
        </section>
    );
}
