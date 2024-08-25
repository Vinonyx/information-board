import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        transaksi: "",
        penerimaan: "",
        pengeluaran: "",
        keterangan: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("keuangan.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tambah keuangan
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Keuangan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="keuangan_transaksi"
                                    value="Transaksi"
                                />
                                <TextInput
                                    id="keuangan_transaksi"
                                    type="text"
                                    name="transaksi"
                                    value={data.transaksi}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("transaksi", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.transaksi}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="keuangan_penerimaan"
                                    value="Penerimaan"
                                />
                                <TextInput
                                    id="keuangan_penerimaan"
                                    type="number"
                                    name="penerimaan"
                                    value={data.penerimaan}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("penerimaan", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.penerimaan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="keuangan_pengeluaran"
                                    value="Pengeluaran"
                                />
                                <TextInput
                                    id="keuangan_pengeluaran"
                                    type="number"
                                    name="pengeluaran"
                                    value={data.pengeluaran}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("pengeluaran", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.pengeluaran}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="keuangan_keterangan"
                                    value="Keterangan"
                                />
                                <TextAreaInput
                                    id="keuangan_keterangan"
                                    type="text"
                                    name="keterangan"
                                    value={data.shketeranganolat}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("keterangan", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.keterangan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route("keuangan.index")}>
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
