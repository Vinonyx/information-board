import React, { useState, useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import BG from "../../Images/BG.jpg";
import BG2 from "../../Images/BG2.jpg";
import Barcode from "../../Images/Barcode.png";

export default function Dashboard({ kegiatan, jadwal, keuangan, sholat }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLayout1, setIsLayout1] = useState(true);

    const nodeRef1 = useRef(null);
    const nodeRef2 = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const layoutSwitchTimer = setInterval(() => {
            setIsLayout1((prevIsLayout1) => !prevIsLayout1);
        }, 2000);

        return () => clearInterval(layoutSwitchTimer);
    }, []);

    const getFormattedTime = (date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours} : ${minutes} : ${seconds}`;
    };

    const formatTime = (time) => {
        if (!time) return "-";
        return time.substring(0, 5);
    };

    const getFormattedDay = (date) => {
        const options = { weekday: "long" };
        return date.toLocaleDateString("id-ID", options);
    };

    const getFormattedFullDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("id-ID", options);
    };

    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    function gregorianToHijri(date) {
        const gregorianYear = date.getFullYear();
        const gregorianMonth = date.getMonth();
        const gregorianDate = date.getDate();

        let hijriYear, hijriMonth, hijriDate;

        // Conversion algorithm
        const d =
            Math.floor((gregorianYear - 1) * 365.25) +
            Math.floor(30.6 * (gregorianMonth + 1)) +
            gregorianDate -
            428;
        hijriYear = Math.floor((30 * d + 10646) / 10631);
        const m = Math.floor(
            (d - 29 - Math.floor(((hijriYear - 1) * 10631) / 30)) / 29.5
        );
        hijriMonth = Math.min(m, 11);
        hijriDate = Math.min(d - Math.floor(29.5 * m) - 29, 30);

        // Array of Hijri month names
        const hijriMonths = [
            "Muharram",
            "Safar",
            "Rabi' al-Awwal",
            "Rabi' al-Thani",
            "Jumada al-Ula",
            "Jumada al-Thani",
            "Rajab",
            "Sha'ban",
            "Ramadan",
            "Shawwal",
            "Dhu al-Qi'dah",
            "Dhu al-Hijjah",
        ];

        return `${hijriDate} ${hijriMonths[hijriMonth]} ${hijriYear}H`;
    }

    const Layout1 = () => {
        const hijriDate = gregorianToHijri(currentTime);
        const todayActivities = kegiatan.data.filter((activity) =>
            isToday(new Date(activity.tanggal))
        );

        return (
            <div
                className="flex flex-col items-center bg-gray-100 min-h-screen"
                style={{
                    backgroundImage: `url(${BG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="w-full flex flex-col sm:flex-row justify-between p-5 border-b border-gray-300">
                    <div className="text-lg mb-4 sm:mb-0">
                        <p className="border-b-4 border-black poly-regular">
                            {getFormattedDay(currentTime)},
                            <br />
                            {getFormattedFullDate(currentTime)}
                        </p>
                        <p className="poly-regular">{hijriDate}</p>
                    </div>
                    <div className="text-center mb-4 sm:mb-0">
                        <h1 className="text-4xl font-bold mt-8 mea-culpa-regular">
                            Masjid Rahmatullah
                        </h1>
                        <p className="poly-regular">
                            Jl. Flamboyan, Umban Sari, Kec. Rumbai, Kota
                            Pekanbaru
                        </p>
                    </div>
                    <div className="text-lg border-solid border-4 border-black px-7 flex items-center poly-regular">
                        <p>{getFormattedTime(currentTime)}</p>
                    </div>
                </div>
                <div className="w-11/12 grid grid-cols-5 py-5 my-5">
                    {Object.entries(sholat).map(([key, value]) => (
                        <div
                            key={key}
                            className="text-center halant-regular bg-stone-400 p-4"
                        >
                            <p className="font-semibold">{key}</p>
                            <p>
                                {value && isToday(value.tanggal)
                                    ? formatTime(value.jam)
                                    : "-"}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="w-6/12 h-full flex flex-col sm:flex-row justify-around bg-gray-300 py-10 mt-10 poly-regular">
                    <div className="mb-4 sm:mb-0">
                        <p className="font-semibold">
                            Jadwal Kegiatan Hari Ini
                        </p>
                        {todayActivities.length > 0 ? (
                            todayActivities.map((activity) => (
                                <p key={activity.id}>
                                    {activity.nama} :{" "}
                                    {formatTime(activity.waktu)}
                                </p>
                            ))
                        ) : (
                            <p>Tidak ada kegiatan hari ini</p>
                        )}
                    </div>

                    <div className="text-right">
                        <p>Khatib : {jadwal ? jadwal.khatib : "-"}</p>
                        <p>Imam : {jadwal ? jadwal.imam : "-"}</p>
                        <p>Muadzin : {jadwal ? jadwal.muadzin : "-"}</p>
                        <p>Bilal : {jadwal ? jadwal.bilal : "-"}</p>
                    </div>
                </div>
                <div className="w-full bg-gray-300 py-2 text-center mt-auto overflow-hidden">
                    <div className="marquee">
                        <p className="marquee-content poly-regular text-xl">
                            Dan dirikanlah shalat, tunaikanlah zakat dan
                            ruku'lah beserta orang orang yang ruku'. (Al Baqarah
                            :43)
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const Layout2 = () => {
        const hijriDate = gregorianToHijri(currentTime);
        let saldo = 0;

        return (
            <div className="flex font-sans">
                <div className="w-4/12 relative">
                    <div
                        className="flex flex-col items-center bg-gray-100 min-h-screen"
                        style={{
                            backgroundImage: `url(${BG2})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <div className="absolute top-2 right-2 bg-white bg-opacity-70 p-2 text-right">
                        <p className="text-gray-700">
                            {getFormattedDay(currentTime)},
                        </p>
                        <p className="text-gray-700">
                            {getFormattedFullDate(currentTime)}
                        </p>
                        <p className="text-gray-700">{hijriDate}</p>
                    </div>
                    <div className="absolute bottom-4 p-2 ml-5">
                        <p className="mb-2 text-2xl font-bold mb-5">
                            Bagi yang ingin berdonasi dapat melalui rekening di
                            bawah ini
                        </p>
                        <img
                            src={Barcode}
                            alt="Barcode"
                            className="w-32 mb-5"
                        />
                        <p className="text-2xl font-bold">No. Rek:</p>
                    </div>
                </div>
                <div className="w-8/12 p-4">
                    <h2 className="text-2xl font-bold mb-2">
                        Laporan Keuangan Masjid Rahmatullah
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">NO</th>
                                <th className="border px-4 py-2">TRANSAKSI</th>
                                <th className="border px-4 py-2">TANGGAL</th>
                                <th className="border px-4 py-2">PENERIMAAN</th>
                                <th className="border px-4 py-2">
                                    PENGELUARAN
                                </th>
                                <th className="border px-4 py-2">SALDO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keuangan.data.map((keuangan, index) => {
                                saldo +=
                                    keuangan.penerimaan - keuangan.pengeluaran;
                                return (
                                    <tr key={keuangan.id}>
                                        <td className="border px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {keuangan.transaksi}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {keuangan.create_at}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {keuangan.penerimaan.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {keuangan.pengeluaran.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {saldo.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <>
            <Head title="Dashboard" />
            <div
                className="relative"
                style={{ width: "100vw", height: "100vh" }}
            >
                <TransitionGroup component={null}>
                    <CSSTransition
                        key={isLayout1 ? "layout1" : "layout2"}
                        timeout={500}
                        classNames="slide"
                        nodeRef={isLayout1 ? nodeRef1 : nodeRef2}
                    >
                        <div
                            ref={isLayout1 ? nodeRef1 : nodeRef2}
                            className="fixed-width-container"
                        >
                            {isLayout1 ? <Layout1 /> : <Layout2 />}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </>
    );
}
