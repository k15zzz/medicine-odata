import "~/styles/globals.css";

import {GeistSans} from "geist/font/sans";
import {type Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Медицина 1С",
    description: "Крутой сайт медицины 1С",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} h-full`}>
        <body className={'h-full'}>
        <div className={'flex flex-col h-full'}>
            <div className={'flex-[1_0_auto]'}>
                <header className={'overflow-x-auto'}>
                    <nav>
                        <Link href="/patients">Пациенты</Link>
                        <Link href="/rooms">Палаты</Link>
                        <Link href="/statuses">Общий статус</Link>
                        <Link href="/diagnoses">Диагнозы</Link>
                        <Link href="/positions">Должности</Link>
                    </nav>
                </header>

                <main className="container mx-auto p-4 h-full w-full">{children}</main>
            </div>

            <footer className={'flex-[0_0_auto]'}>
                <p>&copy; {new Date().getFullYear()} Медицина 1С. Все права защищены.</p>
            </footer>
        </div>
        </body>
        </html>
    );
}
