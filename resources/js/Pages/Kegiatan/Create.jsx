import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        nama: "",
        tempat: "",
        tanggal: "",
        waktu: "",
        deskripsi: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("kegiatan.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tambah Kegiatan
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Kegiatan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="kegiatan_nama"
                                    value="Nama"
                                />
                                <TextInput
                                    id="kegiatan_nama"
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.nama}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="kegiatan_tanggal"
                                    value="Tanggal"
                                />
                                <TextInput
                                    id="kegiatan_tanggal"
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
                                <InputLabel
                                    htmlFor="kegiatan_waktu"
                                    value="Jam"
                                />
                                <TextInput
                                    id="kegiatan_waktu"
                                    type="time"
                                    name="waktu"
                                    value={data.waktu}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("waktu", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.waktu}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="kegiatan_deskripsi"
                                    value="Deskripsi"
                                />
                                <TextAreaInput
                                    id="kegiatan_deskripsi"
                                    type="text"
                                    name="deskripsi"
                                    value={data.sholat}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("deskripsi", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.deskripsi}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route("kegiatan.index")}>
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
