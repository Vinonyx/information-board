import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
// import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({
    auth,
    keuangans,
    queryParams = null,
    success,
}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("keuangan.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("keuangan.index"), queryParams);
    };

    const deletekeuangan = (keuangan) => {
        if (!window.confirm("Are you sure you want to delete the keuangan?")) {
            return;
        }
        router.delete(route("keuangan.destroy", keuangan.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading tight">
                        Keuangan
                    </h2>
                    <Link
                        href={route("keuangan.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Keuangan" />

            <div className="py-12">
                <div className="max-w-7-xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                No
                                            </TableHeading>
                                            <TableHeading
                                                name="transaksi"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Transaksi
                                            </TableHeading>
                                            <TableHeading
                                                name="transaksi"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Penerimaan
                                            </TableHeading>
                                            <TableHeading
                                                name="jumlah"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Pengeluaran
                                            </TableHeading>
                                            <TableHeading
                                                name="keterangan"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Keterangan
                                            </TableHeading>
                                            <th className="px-3 py-2 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.tanggal
                                                    }
                                                    type="text"
                                                    placeholder="Transaksi"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "transaksi",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "transaksi",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keuangans.data.map((keuangan) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={keuangan.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {keuangan.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {keuangan.transaksi}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {keuangan.penerimaan}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {keuangan.pengeluaran}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {keuangan.keterangan}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <Link
                                                        href={route(
                                                            "keuangan.edit",
                                                            keuangan.id
                                                        )}
                                                    >
                                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deletekeuangan(
                                                                keuangan
                                                            )
                                                        }
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination links={keuangans.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
