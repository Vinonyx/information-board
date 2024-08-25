import React, { useEffect, useState } from "react";
import axios from "axios";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const [imams, setImams] = useState([]);
    const { data, setData, post, errors, reset } = useForm({
        tanggal: "",
        jam: "",
        sholat: "",
        imam: "",
        khatib: "",
        muadzin: "",
        bilal: "",
    });

    useEffect(() => {
        axios.get("/nama").then((response) => {
            setImams(response.data);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("jadwal.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tambah Jadwal Sholat
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Jadwal Sholat" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="jadwal_tanggal"
                                    value="Tanggal"
                                />
                                <TextInput
                                    id="jadwal_tanggal"
                                    type="date"
                                    name="tanggal"
                                    value={data.tanggal}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("tanggal", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.tanggal}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="jadwal_jam" value="Jam" />
                                <TextInput
                                    id="jadwal_jam"
                                    type="time"
                                    name="jam"
                                    value={data.jam}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("jam", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.jam}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="jadwal_sholat"
                                    value="Sholat"
                                />
                                <SelectInput
                                    id="jadwal_sholat"
                                    name="sholat"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("sholat", e.target.value)
                                    }
                                >
                                    <option value="">Pilih Sholat</option>
                                    <option value="subuh">Subuh</option>
                                    <option value="dzuhur">Dzuhur</option>
                                    <option value="ashar">Ashar</option>
                                    <option value="maghrib">Maghrib</option>
                                    <option value="isya">Isya</option>
                                </SelectInput>
                                <InputError
                                    message={errors.sholat}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="jadwal_imam"
                                    value="Imam"
                                />
                                <SelectInput
                                    id="jadwal_imam"
                                    name="imam"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("imam", e.target.value)
                                    }
                                >
                                    <option value="">Pilih Orang</option>
                                    {imams.map((imam) => (
                                        <option key={imam.id} value={imam.nama}>
                                            {imam.nama}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.imam}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="jadwal_khatib"
                                    value="Khatib"
                                />
                                <SelectInput
                                    id="jadwal_khatib"
                                    name="khatib"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("khatib", e.target.value)
                                    }
                                >
                                    <option value="">Pilih Orang</option>
                                    {imams.map((imam) => (
                                        <option key={imam.id} value={imam.nama}>
                                            {imam.nama}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.khatib}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="jadwal_muadzin"
                                    value="Muadzin"
                                />
                                <SelectInput
                                    id="jadwal_muadzin"
                                    name="muadzin"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("muadzin", e.target.value)
                                    }
                                >
                                    <option value="">Pilih Orang</option>
                                    {imams.map((imam) => (
                                        <option key={imam.id} value={imam.nama}>
                                            {imam.nama}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.muadzin}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="jadwal_bilal"
                                    value="Bilal"
                                />
                                <SelectInput
                                    id="jadwal_bilal"
                                    name="bilal"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("bilal", e.target.value)
                                    }
                                >
                                    <option value="">Pilih Orang</option>
                                    {imams.map((imam) => (
                                        <option key={imam.id} value={imam.nama}>
                                            {imam.nama}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.bilal}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route("jadwal.index")}>
                                    <button className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                        Cancel
                                    </button>
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
